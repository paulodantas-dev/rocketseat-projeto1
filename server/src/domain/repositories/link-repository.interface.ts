import type { Link } from '../entities/link'

export interface LinkRepository {
  createShortenedLink({
    longUrl,
    shortenedUrl,
  }: {
    longUrl: string
    shortenedUrl: string
  }): Promise<Link>
  deleteShortenedLink(id: string): Promise<void>
  getAllShortenedLinks(): Promise<Link[] | null>
  exportShortenedLink(): Promise<string>
  getShortenedLinkById(id: string): Promise<Link | null>
  getLinkByShortenedUrl(shortenedUrl: string): Promise<Link | null>
  updateClicks(id: string): Promise<void>
}
