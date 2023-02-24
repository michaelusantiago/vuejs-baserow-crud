<script setup lang="ts">
  import { ref, watchEffect } from "vue"
  import { useCompanyStore, type ICompany } from "@/stores/company"
  import AddCompanyForm from "@/components/AddCompanyForm.vue"
  import EditCompanyForm from "@/components/EditCompanyForm.vue"
  import CompanyView from "@/components/CompanyView.vue"
  import SearchBar from '@/components/SearchBar.vue'
  import { AtomSpinner } from 'epic-spinners'

  const company = useCompanyStore()
  let show_add_form = ref(false)
  let show_edit_form = ref(false)
  let companies = ref<Array<ICompany>>()
  let loading = ref(false)
  let total_record = ref(0)
  let selected_company_id = ref(0)

  const refresh = async () => {
    loading.value = true
    companies.value = (await company.getCompanies()).results
    total_record.value = companies?.value?.length || 0
    loading.value = false 
  }

  const onEditCompany = async (id: number) => {
    selected_company_id.value = id
    show_edit_form.value = true
  }

  const onSearch = async (search: String) => {
    loading.value = true
    companies.value = (await company.getCompanies(search)).results
    total_record.value = companies?.value?.length || 0
    loading.value = false 
  }

  watchEffect(async () => await refresh())
</script>

<template>
  <AddCompanyForm
    v-if="show_add_form"
    @close="show_add_form = false"
    @refresh="refresh"
  />
  <EditCompanyForm
    v-if="show_edit_form"
    :company_id="selected_company_id"
    @close="show_edit_form = false"
    @refresh="refresh"
  />
  <main>
    <header>
      <div class="head-searchbar">
        <h2>Companies</h2>
        <SearchBar @search="onSearch" @clear-search="refresh"/>
      </div>
      <div class="action-btn-wrapper">
        <!-- <p v-if="loading">loading...</p> -->
        <p v-if="loading">
          <atom-spinner
            :animation-duration="1200"
            :size="25"
            color="#ff1d5e"
          />
          &nbsp; loading
        </p>
        <p v-else="!loading">{{ total_record }} record{{ total_record > 0 ? 's' : '' }} in total</p>
        <button @click="show_add_form = true"><i class="ri-add-line"></i>&nbsp;Add</button>
        <button @click="refresh"><i class="ri-refresh-line"></i>&nbsp;Refresh</button>
      </div>
    </header>
    <section>
      <CompanyView
        v-for="company in companies"
        :company="company"
        @refresh="refresh"
        @onEditCompany="onEditCompany"
      />
    </section>
    <footer>
      Crafted by Michael Santiago (c) 2023
    </footer>
  </main>
</template>

<style scoped lang="postcss">
  main {
    header {
      display: flex;
      flex-direction: column;
      margin: 20px 0;
      gap: 10px;
    }
    .head-searchbar {
      display: flex;
      align-items: center;
      width: 100%;
    }
    .action-btn-wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      button {
        display: flex;
        place-content: center;
        align-items: center;
        padding: 10px 20px;
        margin: 5px;
      }
      p {
        display: flex;
        align-items: center;
        padding: 0 10px;
        flex: 1;
        font-weight: bold;
        text-align: left;
        font-size: 0.8rem;
      }
    }
  }
/* @media (min-width: 1024px) {
  main {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>