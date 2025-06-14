import { PassThrough } from 'node:stream'
import { Link } from '../entities/link'

export interface LinkRepository {
  createShortenedLink(longUrl: string): Promise<Link>
  deleteShortenedLink(id: string): Promise<void>
  getAllShortenedLinks(): Promise<Link[]>
  exportShortenedLink(): Promise<PassThrough>
}
