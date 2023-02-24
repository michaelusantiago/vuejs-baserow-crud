<script setup lang="ts">
    import { useCompanyStore, type ICompany, CCompany } from "@/stores/company"
    import { ref, onMounted, watchEffect } from 'vue';
    import ModalWindow from './ModalWindow.vue';
    import { LoopingRhombusesSpinner } from 'epic-spinners'

    const emit = defineEmits(['close', 'refresh'])
    const refCEO = ref<HTMLInputElement | null>(null)
    const refComLog = ref<HTMLInputElement | null>(null)
    let company_logo = ref<any>("https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png")
    const companyStore = useCompanyStore() 
    let formSubmitValue = ref<number | null>(null)
    const company: CCompany = new CCompany('', '', '', '', '', '', null, '')
    let isSaving = ref(false)
    type IError = {field: string, message: string}
    let error: (IError | null) = null
    
    const onClose = () => emit('close')

    onMounted(() => { if (refCEO.value) refCEO.value.focus() })

    const submitHandler = async (e: Event) => {
        switch(formSubmitValue.value) {
            // Saving/Adding the company
            case 1: {
                isSaving.value = true
                error = await companyStore.addCompany(company)
                isSaving.value = false

                if (!error) {
                    emit('close')
                    emit('refresh')
                } else {
                    // set the focus on the field that has the error
                    document.getElementById(error?.field)?.focus()
                }

            }
            break
            case 2: emit('close')
        }
    }

    const onClickLogo = () => refComLog.value?.click()

    const onFileSelected = (e: Event) => {
        const inputFile = e.target as HTMLInputElement
        if (inputFile.files?.length) {
            let reader = new FileReader()
            let image = inputFile.files[0]
            company.fld_logo = image
            reader.readAsDataURL(image)
            reader.onload = e => company_logo.value = e?.target?.result
        } else {
            company_logo.value = "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
            company.fld_logo = null
        } 
    }
</script>

<template>
    <ModalWindow width="1000px" height="530px" @close="onClose">
        <form @submit.prevent="submitHandler" >
            <h2>Add New Company</h2>
            <div class="grid-3-col">
                <!-- Column 1 -->
                <div class="col1">
                    <div class="input-wrapper">
                        <label htmlFor="ceo">C.E.O</label>
                        <input
                            id="fld_fullname"
                            ref="refCEO"
                            name="ceo"
                            type="text"
                            v-model="company.fld_fullname"
                        />
                    </div>

                    <div class="input-wrapper">
                        <label htmlFor="company_name">Company Name</label>
                        <input
                            id="fld_company_name"
                            name="company_name"
                            type="text"
                            v-model="company.fld_company_name"
                        />
                    </div>

                    <div class="input-wrapper">
                        <label htmlFor="industry">Industry</label>
                        <select
                            id="fld_industry"
                            name="industry"
                            v-model="company.fld_industry"
                        >
                            <option value="" selected disabled>Select Industry</option>
                            <option value="Software Engineering">Software Engineering</option>
                            <option value="Health Services">Health Services</option>
                            <option value="Insurance">Insurance</option>
                        </select>
                    </div>

                    <div class="input-wrapper">
                        <label htmlFor="fb_page">Facebook Page</label>
                        <input
                            id="fld_fb_page"
                            name="fb_page"
                            type="url"
                            v-model="company.fld_fb_page"
                        />
                    </div>
                </div>

                <!-- Column 2 -->
                <div class="col2">
                    <div class="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input
                            id="fld_email"
                            name="email"
                            type="email"
                            v-model="company.fld_email"
                        />
                    </div>

                    <div class="input-wrapper">
                        <label htmlFor="website">Company's Website</label>
                        <input
                            id="fld_company_url"
                            name="website"
                            type="url"
                            v-model="company.fld_company_url"
                        />
                    </div>

                    <div class="input-wrapper">
                        <label htmlFor="contact_number">Contact Number</label>
                        <input
                            id="fld_phone"
                            name="contact_number"
                            type="text"
                            v-model="company.fld_phone"
                        />
                    </div>
                </div>

                <!-- Column 3 -->
                <div class="col3">
                    <label>Company Logo</label>
                    <div class="logo-wrapper">
                        <input
                            v-show="false"
                            tabindex="-1"
                            ref="refComLog"
                            name="company-logo"
                            id="company-logo"
                            type="file"
                            accept="image/png, image/jpeg"
                            @change="onFileSelected"
                        />
                        <img
                            @click="onClickLogo"
                            :src="company_logo"
                            alt="company logo"
                            title="Change company logo"
                        />
                    </div>
                </div>
            </div>

            <div class="footer-wrapper">
                <!-- Error Notification -->
                <div
                    v-if="error"
                    class="error-notification-wrapper">
                    <div class="error-notification">
                        <i class="ri-error-warning-line"></i>
                        <span style="font-weight: bold">Error:</span>&nbsp; {{ error?.message }}
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="action-btn-wrapper">
                    <button
                        id="btn-save"
                        @click="formSubmitValue = 1">
                        <span v-if="!isSaving">Save</span>
                        <span v-else>Saving</span>
                        <span class="epic-spinner-wrapper" v-if="isSaving">
                            <looping-rhombuses-spinner
                                :animation-duration="2500"
                                :rhombus-size="10"
                                color="#ff1d5e"
                            />
                        </span>
                    </button>
                    <button id="btn-close" @click="formSubmitValue = 2">Close</button>
                </div>
            </div>
        </form>
    </ModalWindow>
</template>

<style scoped lang="postcss">
    form {
        --width: 300px;
        padding: 25px;
        .grid-3-col {
            display: grid;
            grid-template-columns: auto auto var(--width);
            grid-template-rows: 100%;
            .col3 {
                display: flex;
                flex-direction: column;
                gap: 10px;
                .logo-wrapper {
                    display: flex;
                    flex-direction: column;
                    place-content: center;
                    background-color: lightgrey;
                    img {
                        object-fit: contain;
                        width: var(--width);
                        height: 250px;
                    }
                    img:hover {
                        cursor: pointer;
                    }
                }
            }
        }
        .input-wrapper {
            display: flex;
            flex-direction: column;
            gap: 5px;
            padding: 10px;
            input, select { padding: 10px; }
        }

        .footer-wrapper {
            display: flex;

            .error-notification-wrapper {
                display: flex;
                align-items: center;
                flex: 2;
                margin: auto 0;
                margin-left: 10px;
                .error-notification {
                    display: flex;
                    padding: 10px;
                    background-color: red;
                    color: white;
                    align-items: center;
                    font-size: 0.87em;
                    i {
                        margin: 0 5px;
                        font-size: 1.1rem;
                    }
                }
            }

            .action-btn-wrapper {
                display: flex;
                justify-content: flex-end;
                margin: 10px 0;
                column-gap: 10px;
                justify-self: flex-end;
                flex: 2;
                button {
                    display: flex;
                    padding: 10px 20px;
                    align-items: center;
                    margin: auto 0;
                    .epic-spinner-wrapper {
                        display: flex;
                        align-items: center;
                        margin: auto 3px;
                    }
                }
            }
        }
    }
</style>