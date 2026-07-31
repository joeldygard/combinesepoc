import type { Author } from './types'

/*
 * POC bylines are discipline teams, not invented individuals. Attributing an
 * article to a named person who did not write it would be fabrication; swap in
 * real `person` entries (with URLs) when the actual authors are known.
 */
export const authors: Author[] = [
  {
    id: 'data-science',
    name: 'Combine Data Science',
    kind: 'team',
    discipline: 'Data Science & AI',
  },
  {
    id: 'control-systems',
    name: 'Combine Control Systems',
    kind: 'team',
    discipline: 'Control Systems',
  },
  {
    id: 'embedded',
    name: 'Combine Embedded Systems',
    kind: 'team',
    discipline: 'Embedded Systems',
  },
]

const byId = new Map(authors.map((a) => [a.id, a]))

export function getAuthor(id: string): Author {
  const author = byId.get(id)
  if (!author) throw new Error(`Unknown author id: ${id}`)
  return author
}
