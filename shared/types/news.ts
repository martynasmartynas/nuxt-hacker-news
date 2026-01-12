export type HackerNewsItem = {
  id: string
  deleted: boolean
  type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt'
  by: string
  time: number
  text: string
  dead: boolean
  parent: string
  poll: number
  kids: number[]
  url: string
  score: number
  title: string
  parts: number[]
  descendants: number
}
export type HackerNewsUser = {
  id: string
  created: number
  karma: number
  about: string
  submitted: number[]
}

export type newsItem = HackerNewsItem & { author: HackerNewsUser }
