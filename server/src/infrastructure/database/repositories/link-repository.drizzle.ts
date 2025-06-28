import { Link } from '@/domain/entities/link'
import { LinkRepository } from '@/domain/repositories/link-repository.interface'
import { env } from '@/config/env'
import { BadRequest } from '@/error-handler/types/bad-request'
import { db } from '../drizzle'
import { linksTable } from '../drizzle/schema'
import { NotFoundError } from '@/error-handler/types/not-found-error'
import { eq } from 'drizzle-orm'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

export class LinkRepositoryDatabase implements LinkRepository {
  async exportShortenedLink(): Promise<string> {
    const links = await db.select().from(linksTable)

    const csvRows: string[] = []
    csvRows.push('ID,URL,Shortened,Clicks,CriadoEm')

    for (const link of links) {
      csvRows.push(
        `${link.id},${link.long_url},${link.shortened_link},${link.clicks},${link.created_at}`,
      )
    }

    const csvContent = csvRows.join('\n')
    const csvBuffer = Buffer.from(csvContent)

    const fileName = `shortened_links_${Date.now()}.csv`

    const s3 = new S3Client({
      region: 'us-east-1',
      endpoint: env.CLOUDFLARE_ENDPOINT,
      credentials: {
        accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
        secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
      },
    })

    const bucketName = env.CLOUDFLARE_BUCKET

    await s3.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: csvBuffer,
        ContentType: 'text/csv',
      }),
    )

    const publicUrl = `${env.CLOUDFLARE_PUBLIC_URL}/${fileName}`

    return publicUrl
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

    await db.insert(linksTable).values({
      id: data.id,
      shortened_link: data.shortUrl,
      long_url: data.destination,
      created_at: data.createdAt,
      updated_at: data.updatedAt,
      clicks: data.clicks,
    })

    return new Link({
      id: data.id,
      shortenedLink: data.shortUrl,
      longUrl: data.destination,
      clicks: data.clicks,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    })
  }
}
