<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h2>Kumpanya, Inc.</h2>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/add_company">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
  .wrapper {
    display: flex;
    width: 100%;
  }

  a {
    font-weight: 900;
    padding: 10px;
    text-decoration: none;
  }

  nav { flex: 2; }
</style>
