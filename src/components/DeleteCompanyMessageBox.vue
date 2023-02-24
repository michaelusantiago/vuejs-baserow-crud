<script setup lang="ts">
    import ModalWindow from './ModalWindow.vue';
    import { useCompanyStore, type ICompany } from "@/stores/company"
    import { LoopingRhombusesSpinner } from 'epic-spinners'
    import { ref } from 'vue';
    const props = defineProps<{ company_id: number }>()

    let isDeleting = ref(false)

    const { deleteCompany } = useCompanyStore()

    const emit = defineEmits(['close', 'refresh'])

    const onClose = () => emit('close')

    const onYes = async () => {
        isDeleting.value = true
        const result = await deleteCompany(props.company_id)
        isDeleting.value = false 
        emit('refresh')
        emit('close')
    }
</script>

<template>
    <ModalWindow width="400px" height="250px" @close="onClose">
        <div class="message-box-wrapper">
            <div class="epic-spinner-wrapper">
                <p v-if="!isDeleting">Are you sure you want to delete selected record?</p>
                <span v-else="isDeleting">Deleting</span>
                <looping-rhombuses-spinner
                    v-if="isDeleting"
                    :animation-duration="2500"
                    :rhombus-size="10"
                    color="#ff1d5e"
                />
            </div>
            <div class="action-btn-wrapper">
                <button @click="onClose">Cancel</button>
                <button @click="onYes">Yes</button>
            </div>
        </div>
    </ModalWindow>
</template>

<style scoped lang="postcss">
    .message-box-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        height: 100%;
        .epic-spinner-wrapper {
            display: flex;
            align-items: center;
            p { text-align: center; }
        }
        .action-btn-wrapper {
            display: flex;
            margin: auto 3px;
            gap: 3px;
            button { padding: 10px 20px; }
        }
    }
</style>