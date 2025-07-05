import { Link } from '@/domain/entities/link'
import { LinkRepository } from '@/domain/repositories/link-repository.interface'
import { env } from '@/config/env'
import { BadRequest } from '@/error-handler/types/bad-request'
import { db } from '../drizzle'
import { linksTable } from '../drizzle/schema'
import { NotFoundError } from '@/error-handler/types/not-found-error'
import { eq } from 'drizzle-orm'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'node:crypto'

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
    try {
      await db.delete(linksTable).where(eq(linksTable.id, id))
    } catch (error) {
      throw new BadRequest(
        'An error occurred while deleting the shortened link. Please try again.',
      )
    }
  }
  async getAllShortenedLinks(): Promise<Link[]> {
    const links = await db.select().from(linksTable)

    if (links.length === 0) {
      throw new NotFoundError('No shortened links found.')
    }

    return links.map(
      (link) =>
        new Link({
          id: link.id,
          clicks: link.clicks,
          createdAt: link.created_at,
          updatedAt: link.updated_at,
          longUrl: link.long_url,
          shortenedLink: link.shortened_link,
        }),
    )
  }
  async createShortenedLink({
    longUrl,
    shortenedUrl,
  }: {
    longUrl: string
    shortenedUrl: string
  }): Promise<Link> {
    const data = {
      id: randomUUID(),
      shortened_link: shortenedUrl,
      long_url: longUrl,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      clicks: 0,
    }

    try {
      await db.insert(linksTable).values(data)
    } catch (error) {
      throw new BadRequest(
        'An error occurred while creating the shortened link. Please try again.',
      )
    }

    return new Link({
      id: data.id,
      clicks: data.clicks,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      longUrl: data.long_url,
      shortenedLink: data.shortened_link,
    })
  }
  async getShortenedLinkById(id: string): Promise<Link> {
    const link = await db
      .select()
      .from(linksTable)
      .where(eq(linksTable.id, id))
      .limit(1)
      .then((result) => result[0])

    if (!link) {
      throw new NotFoundError('Shortened link not found.')
    }

    return new Link({
      id: link.id,
      clicks: link.clicks,
      createdAt: link.created_at,
      updatedAt: link.updated_at,
      longUrl: link.long_url,
      shortenedLink: link.shortened_link,
    })
  }
  async updateClicks(id: string): Promise<void> {
    const link = await this.getShortenedLinkById(id)

    if (!link) {
      throw new NotFoundError('Shortened link not found.')
    }

    const totalClicks = link.getProps().clicks || 0

    try {
      await db
        .update(linksTable)
        .set({ clicks: totalClicks + 1, updated_at: new Date().toISOString() })
        .where(eq(linksTable.id, id))
    } catch (error) {
      throw new BadRequest(
        'An error occurred while updating the clicks. Please try again.',
      )
    }
  }
}
