<script setup lang="ts">
    import type { ICompany } from "@/stores/company"
    import DeleteCompanyMessageBoxVue from "./DeleteCompanyMessageBox.vue";
    import { ref } from "vue";

    let company_logo = "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"

    const emit = defineEmits(['refresh', 'onEditCompany'])

    let show_delete_company_message_box = ref(false)
    let selected_company_id = ref(0)

    const props = defineProps<{ company: ICompany }>()

    const onClickEdit = async (e: Event) => {
        const button = e.target as HTMLElement
        selected_company_id.value = parseInt(button.closest('.action-btn-wrapper')?.id!)
        emit('onEditCompany', selected_company_id.value)
    }

    const onClickDelete = async (e: Event) => {
        show_delete_company_message_box.value = true
        const button = e.target as HTMLElement
        selected_company_id.value = parseInt(button.closest('.action-btn-wrapper')?.id!)
    }
</script>

<template>
    <DeleteCompanyMessageBoxVue
        v-if="show_delete_company_message_box"
        :company_id="selected_company_id"
        @close="show_delete_company_message_box = false"
        @refresh="emit('refresh')"
    />
    <main>
        <div :id="company.id?.toString()" class="action-btn-wrapper">
            <button @click="onClickEdit"><i class="ri-pencil-line"></i></button>
            <button @click="onClickDelete"><i class="ri-delete-bin-6-line"></i></button>
        </div>
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

        .action-btn-wrapper {
            display: flex;
            gap: 2px;
            justify-content: flex-end;
            button {
                display: flex;
                border: none;
                background-color: transparent;
                border-radius: 50px;
                padding: 8px;
                i {
                    margin: auto;
                    font-size: 1.1rem;
                }
                transition: background-color 0.3s;
            }
            button:hover {
                background-color: darkgray;
            }
        }

        .grid-col3 {
            display: grid;
            grid-template-columns: 200px repeat(2, minmax(0, 1fr));
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