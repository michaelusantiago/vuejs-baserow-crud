<script setup lang="ts">
    import { ref, onMounted, watchEffect } from 'vue';
    import ModalWindow from './ModalWindow.vue';

    const emit = defineEmits(['close'])
    const refCEO = ref<HTMLInputElement | null>(null)
    const refComLog = ref<HTMLInputElement | null>(null)
    let company_logo = ref<any>("https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png")
    
    const onClose = () => emit('close')

    onMounted(() => { if (refCEO.value) refCEO.value.focus() })

    const submitHandler = () => emit('close')

    const onClickLogo = () => refComLog.value?.click()

    const onFileSelected = (e: Event) => {
        const inputFile = e.target as HTMLInputElement
        if (inputFile.files?.length) {
            let reader = new FileReader()
            let image = inputFile.files[0]
            reader.readAsDataURL(image)
            reader.onload = e => company_logo.value = e?.target?.result
        } else {
            company_logo.value = "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
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
                        <label htmlfor="ceo">C.E.O</label>
                        <input ref="refCEO" name="ceo" type="text"/>
                    </div>

                    <div class="input-wrapper">
                        <label htmlfor="company_name">Company Name</label>
                        <input name="company_name" type="text"/>
                    </div>

                    <div class="input-wrapper">
                        <label htmlfor="industry">Industry</label>
                        <select name="industry">
                            <option value="" selected disabled>Select Industry</option>
                            <option value="Software Engineering">Software Engineering</option>
                            <option value="Health Services">Health Services</option>
                            <option value="Insurance">Insurance</option>
                        </select>
                    </div>

                    <div class="input-wrapper">
                        <label htmlfor="fb_page">Facebook Page</label>
                        <input name="fb_page" type="url"/>
                    </div>
                </div>

                <!-- Column 2 -->
                <div class="col2">
                    <div class="input-wrapper">
                        <label htmlfor="email">Email</label>
                        <input name="email" type="email"/>
                    </div>

                    <div class="input-wrapper">
                        <label htmlfor="website">Company's Website</label>
                        <input name="website" type="url"/>
                    </div>

                    <div class="input-wrapper">
                        <label htmlfor="contact_number">Contact Number</label>
                        <input name="contact_number" type="text"/>
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

            <!-- Action Buttons -->
            <div class="action-btn-wrapper">
                <button id="btn-save">Save</button>
                <button id="btn-close">Close</button>
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

        .action-btn-wrapper {
            display: flex;
            justify-content: flex-end;
            margin: 10px 0;
            column-gap: 10px;
            button { padding: 7px 15px; }
        }
    }
</style>