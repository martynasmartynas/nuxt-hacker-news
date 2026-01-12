<script setup lang="ts">
  const { id } = useRoute().params

  const {
    data: newsItem,
    error,
    status
  } = await useAsyncData(`news-item-${id}`, async () => {
    const article = await $fetch<HackerNewsItem>(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    )
    const author = await $fetch<HackerNewsUser>(
      `https://hacker-news.firebaseio.com/v0/user/${article.by}.json`
    )
    return { ...article, author: author }
  })
  useSeoMeta({
    title: newsItem?.value?.title || 'News Item'
  })
</script>

<template>
  <div>
    <NuxtLink :to="'/'"
      ><span class="back-button"><Icon name="lucide:arrow-left" />Back</span></NuxtLink
    >
    <div v-if="status === 'pending'">Loading news item...</div>
    <div v-else-if="error">Error loading news item: {{ error.message }}</div>
    <div v-else-if="newsItem">
      <img src="/hacker.webp" alt="Hacker news" />
      <a :href="newsItem.url"
        ><h1>{{ newsItem.title }}</h1></a
      >
      <div class="news-item-meta">
        <span>Score -> {{ newsItem.score }}</span>
        <span>By -> {{ newsItem.author?.id }} with {{ newsItem.author?.karma }} karma points</span>
        <span>At -> {{ formatDate(newsItem.time) }}</span>
      </div>
    </div>
    <div v-else>
      <p>No news item found.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .back-button {
    display: flex;
    align-items: center;
    padding: 0.5rem;
  }
  .news-item-meta {
    font-size: 0.9rem;
    color: #666;
    font-family: $font-family-monospace;
    span {
      display: block;
    }
  }
  img {
    width: 100px;
    height: 100px;
    vertical-align: middle;
    margin-right: 0.5rem;
  }
</style>
