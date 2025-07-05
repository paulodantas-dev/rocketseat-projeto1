import { Link } from '../entities/link'

export interface LinkRepository {
  createShortenedLink({
    longUrl,
    shortenedUrl,
  }: {
    longUrl: string
    shortenedUrl: string
  }): Promise<Link>
  deleteShortenedLink(id: string): Promise<void>
  getAllShortenedLinks(): Promise<Link[]>
  exportShortenedLink(): Promise<string>
  getShortenedLinkById(id: string): Promise<Link>
  updateClicks(id: string): Promise<void>
}
