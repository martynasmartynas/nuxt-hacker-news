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

export default defineEventHandler(async (event) => {
  try {
    const news = await $fetch<number[]>('https://hacker-news.firebaseio.com/v0/topstories.json')
    // Select 10 random news IDs, please note that this function is not the best for shuffling as it does not guarantee perfect randomness
    const tenRandomNewsIds = news.sort(() => 0.5 - Math.random()).slice(0, 10)

    const alldata: newsItem[] = await Promise.all(
      tenRandomNewsIds.map(async (id) => {
        const item = await $fetch<HackerNewsItem>(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        )
        const user = await $fetch<HackerNewsUser>(
          `https://hacker-news.firebaseio.com/v0/user/${item.by}.json`
        )

        return { ...item, author: user }
      })
    )

    return alldata
  } catch (error) {
    console.error('Error fetching news articles:', error)
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: 'Error fetching news articles'
      })
    )
  }
})
