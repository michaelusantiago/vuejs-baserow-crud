import { ref } from 'vue'
import { defineStore } from 'pinia'

const API_URL = import.meta.env.VITE_API_URL
const BEARER_TOKEN = import.meta.env.VITE_BEARER_TOKEN
const UPLOAD_FILE_URL = import.meta.env.VITE_UPLOAD_FILE_URL

export interface ICompany {
    fld_company_name: String
    fld_company_url: String
    fld_email: String
    fld_fb_page: String
    fld_fullname: String
    fld_industry: String
    fld_logo: string
    fld_phone: String
    id: Number
}

export const useCompanyStore = defineStore('company', () => {
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

    const getCompanies = async (query?: string) => {
        let params = "?user_field_names=true"
        if (query) params = params + "&search=" + query
    
        const result = await fetch(API_URL + params,
        {
            method: "GET",
            headers: {
                Authorization: "Token " + BEARER_TOKEN
            }
        })
    
        const data = await result.json()
        return data
    }

    const addCompany = async () => { }
    const deleteCompany = async () => { }
    const findCompany = async(id: string) => { }

    return { companyList, getCompanies, addCompany, deleteCompany, findCompany }
})