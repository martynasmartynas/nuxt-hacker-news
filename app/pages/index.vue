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
</script>

<template>
  <div>
    <h1>Random top hacker news</h1>
    <div v-if="status === 'pending'">Loading news...</div>
    <div v-else-if="error">Error loading news: {{ error.message }}</div>
    <div v-else>
      <article v-for="item in news" :key="item.id">
        <img src="/hacker.webp" alt="Hacker news" />
        <div>
          <h2>{{ item.title }}</h2>
          <div class="news-item-meta">
            <span>By -> {{ item.author?.id }} with {{ item.score }} points</span>
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
    span {
      display: block;
    }
  }
</style>
