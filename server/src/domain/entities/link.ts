import type { LinkDTO } from '@/dtos/link/link.dto'

import { AggregateRoot } from '../core/aggregate-root'

export class Link extends AggregateRoot<LinkDTO> {
  constructor(props: LinkDTO) {
    super({
      ...props,
      createdAt: props.createdAt ?? new Date().toISOString(),
      updatedAt: props.updatedAt ?? new Date().toISOString(),
    })
  }
}
