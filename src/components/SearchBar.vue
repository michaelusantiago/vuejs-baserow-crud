<script setup lang="ts">
   import { ref } from 'vue'; 
   const refSearchInput = ref<HTMLInputElement | null>(null)
   let searchInput = ref('')

   const onClickClearSearch = () => {
        refSearchInput.value?.focus()
        searchInput.value = ""
   }
</script>

<template>
    <main>
        <div class="search-input-wrapper">
            <i class="ri-search-line"></i>
            <input
                v-model="searchInput"
                ref="refSearchInput"
                class="search-input"
                type="text"
                placeholder="Search..."
            />
            <button @click="onClickClearSearch"><i class="ri-close-line"></i></button>
        </div>
    </main>
</template>


<style scoped lang="postcss">
    main {
        --search-bg-color: white;
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: flex-end;
        flex: 2;
        .search-input-wrapper {
            align-items: center;
            padding: 5px 15px;
            background-color: var(--search-bg-color);
            display: flex;
            justify-content: flex-end;
            border-radius: 8px;
            width: 80%;
            .search-input {
                background-color: var(--search-bg-color);
                border: none;
                outline: none;
                width: 100%;
                padding: 10px;
            }
            button {
                display: flex;
                align-items: center;
                border: none;
                outline: none;
                background: none;
                padding: 7px;
                border-radius: 50px;
                i {
                    margin: auto;
                    font-size: 1.2rem;
                }
            }
            button:hover, button:focus {
                background-color: lightgray;
            }
        }
    }
</style>