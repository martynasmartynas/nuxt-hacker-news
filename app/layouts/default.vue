<template>
  <div id="layout-default">
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
  #layout-default {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    @media (min-width: 768px) {
      max-width: 700px;
      margin: 0 auto;
    }
  }
  main {
    padding: 1rem;
  }
</style>
