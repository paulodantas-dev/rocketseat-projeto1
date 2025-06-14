import { Link } from '@/domain/entities/link'
import { LinkRepository } from '@/domain/repositories/link-repository.interface'
import { env } from '@/config/env'
import { BadRequest } from '@/error-handler/types/bad-request'
import { db } from '../drizzle'
import { linksTable } from '../drizzle/schema'
import { NotFoundError } from '@/error-handler/types/not-found-error'
import { eq } from 'drizzle-orm'
import { format } from '@fast-csv/format'
import { PassThrough } from 'node:stream'

export class LinkRepositoryDatabase implements LinkRepository {
  async exportShortenedLink(): Promise<PassThrough> {
    const links = await db.select().from(linksTable)

    const csvStream = format({ headers: true })
    const passthrough = new PassThrough()
    csvStream.pipe(passthrough)

    for (const link of links) {
      csvStream.write({
        ID: link.id,
        URL: link.long_url,
        Shortened: link.shortened_link,
        Clicks: link.clicks,
        CriadoEm: link.created_at,
      })
    }

    csvStream.end()

    return passthrough
  }
  async deleteShortenedLink(id: string): Promise<void> {
    const response = await fetch(`${env.API_URL!}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        apikey: env.API_TOKEN!,
      },
    })

    if (!response.ok) {
      throw new BadRequest('Failed to delete shortened link.')
    }

    await db.delete(linksTable).where(eq(linksTable.id, id))
  }
  async getAllShortenedLinks(): Promise<Link[]> {
    const links = await db.select().from(linksTable)

    if (links.length === 0) {
      throw new NotFoundError('No shortened links found.')
    }

    const updatedLinks: Link[] = []

    for (const link of links) {
      const response = await fetch(`${env.API_URL}/${link.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          apikey: env.API_TOKEN!,
        },
      })

      if (!response.ok) {
        throw new BadRequest(
          `Failed to fetch link data for ID: ${link.id}. Please try again later.`,
        )
      }

      const rebrandData = await response.json()

      await db
        .update(linksTable)
        .set({
          clicks: rebrandData.clicks,
          updated_at: rebrandData.updatedAt,
        })
        .where(eq(linksTable.id, link.id))

      updatedLinks.push(
        new Link({
          id: link.id,
          shortenedLink: link.shortened_link,
          longUrl: link.long_url,
          clicks: rebrandData.clicks,
          createdAt: link.created_at,
          updatedAt: rebrandData.updatedAt,
        }),
      )
    }

    return updatedLinks
  }

  async createShortenedLink(longUrl: string): Promise<Link> {
    const response = await fetch(`${env.API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: env.API_TOKEN!,
      },
      body: JSON.stringify({
        destination: longUrl,
        domain: { fullName: 'rebrand.ly' },
      }),
    })

    if (!response.ok) {
      throw new BadRequest(
        'Failed to create shortened link. Please check the long URL and try again.',
      )
    }

    const data: {
      id: string
      shortUrl: string
      destination: string
      clicks: number
      createdAt: string
      updatedAt: string
    } = await response.json()

    const newLink = {
      id: data.id,
      shortenedLink: data.shortUrl,
      longUrl: data.destination,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      clicks: data.clicks,
    }

    await db.insert(linksTable).values({
      id: newLink.id,
      shortened_link: newLink.shortenedLink,
      long_url: newLink.longUrl,
      created_at: newLink.createdAt,
      updated_at: newLink.updatedAt,
      clicks: newLink.clicks,
    })

    return new Link(newLink)
  }
}
