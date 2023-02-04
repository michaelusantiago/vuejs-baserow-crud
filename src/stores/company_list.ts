import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCompanyListStore = defineStore('company', () => {
    const companyList = ref([
        {
            name: "Microsoft",
            website: "https://microsoft.com"
        },
        {
            name: "Apple",
            website: "https://apple.com"
        }
    ])

    const addCompany = async () => { }
    const deleteCompany = async () => { }
    const findCompany = async(id: string) => { }

    return { companyList, addCompany, deleteCompany, findCompany }
})
