<script setup lang="ts">
  import { useCompanyListStore } from "@/stores/company_list"
  const company = useCompanyListStore()
</script>

<template>
  <main>
    <header>
      <h2>Companies</h2>
      <button>Add +</button>
    </header>
    <div v-for="_company in company.companyList ">
      <p>Name: {{ _company.name }}</p>
      <p>Website: {{ _company.website }}</p>
    </div>
  </main>
</template>

<style scoped>
  main header {
    display: flex;
    gap: 20px;
  }
  main header button {
    padding: 10px 25px;
  }
/* @media (min-width: 1024px) {
  main {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>