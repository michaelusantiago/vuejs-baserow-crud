<script setup lang="ts">
    import type { ICompany } from "@/stores/company"

    let company_logo = "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"

    defineProps<{ company: ICompany }>()
</script>

<template>
    <main>
        <div class="grid-col3">
            <div class="col1">
                <img :src="company.fld_logo || company_logo" alt="company logo"/>
            </div>
            <div class="col2">
                <div class="fld-wrapper">
                    <label>Company Name</label>
                    <p>{{ company.fld_company_name }}</p>
                </div>
                
                <div class="fld-wrapper">
                    <label>C.E.O</label>
                    <p>{{ company.fld_fullname }}</p>
                </div>

                <div class="fld-wrapper">
                    <label>Website</label>
                    <p>{{ company.fld_company_url }}</p>
                </div>
            </div>
            <div class="col3">
                <div class="fld-wrapper">
                    <label>Facebook Page</label>
                    <p>{{ company.fld_fb_page }}</p>
                </div>
                
                <div class="fld-wrapper">
                    <label>Email</label>
                    <p>{{ company.fld_email }}</p>
                </div>

                <div class="fld-wrapper">
                    <label>Phone Number</label>
                    <p>{{ company.fld_phone }}</p>
                </div>

            </div>
        </div>
    </main>
</template>

<style scoped lang="postcss">
    main {
        padding: 10px;
        border-top: solid 1px darkgray;
        border-bottom: solid 1px lightgrey;

        .grid-col3 {
            display: grid;
            grid-template-columns: 200px auto auto;
            grid-template-rows: auto; 
            gap: 18px;
            img { 
                width: 200px;
                height: 200px;
                object-fit: contain;
            }
        }
        .fld-wrapper {
            display: flex;
            flex-direction: column;
            padding: 5px;
            label {
                font-weight: bold;
            }
        }
    }
</style>