<script setup lang="ts">
  useSeoMeta({
    title: 'Random top hacker news',
    description: 'A Nuxt 3 example app fetching random top news from Hacker News API'
  })
  const {
    data: news,
    error,
    status
  } = await useFetch('/api/news', {
    lazy: true
  })
  const sortingKey = ref<'score' | 'author.karma'>('score')
  const sortedNews = computed(() => {
    return sortData(news?.value ?? [], sortingKey.value)
  })
</script>

<template>
  <div>
    <h1>Random top hacker news</h1>
    <div v-if="status === 'pending'">Loading news...</div>
    <div v-else-if="error">Error loading news: {{ error.message }}</div>
    <div v-else>
      <div class="sorting-buttons">
        <button @click="sortingKey = 'score'">Sort by Score</button>
        <button @click="sortingKey = 'author.karma'">Sort by Author Karma</button>
      </div>
      <article v-for="item in sortedNews" :key="item.id">
        <img src="/hacker.webp" alt="Hacker news" />
        <div>
          <h2>{{ item.title }}</h2>
          <div class="news-item-meta">
            <span>Score -> {{ item.score }}</span>
            <span>By -> {{ item.author?.id }} with {{ item.author?.karma }} karma points</span>
            <span>At -> {{ formatDate(item.time) }}</span>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped lang="scss">
  h1 {
    margin-bottom: 2rem;
  }
  h2 {
    margin-top: 0;
    font-size: 1.2rem;
  }
  img {
    width: 40px;
    height: 40px;
    vertical-align: middle;
    margin-right: 0.5rem;
  }
  article {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ccc;
    display: flex;
  }
  .news-item-meta {
    font-size: 0.9rem;
    color: #666;
    font-family: $font-family-monospace;
    span {
      display: block;
    }
  }
  .sorting-buttons {
    margin-bottom: 1rem;
    button {
      margin-right: 0.5rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }
  }
</style>
