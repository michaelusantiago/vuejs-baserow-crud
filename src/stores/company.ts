import { defineStore } from 'pinia'

const API_URL = import.meta.env.VITE_API_URL
const BEARER_TOKEN = import.meta.env.VITE_BEARER_TOKEN
const UPLOAD_FILE_URL = import.meta.env.VITE_UPLOAD_FILE_URL

export interface ICompany {
    fld_company_name: string;
    fld_company_url: string;
    fld_email: string;
    fld_fb_page: string;
    fld_fullname: string;
    fld_industry: string;
    fld_logo: any;
    fld_phone: string;
    id?: number;
}

export class CCompany {
    fld_company_name: string;
    fld_company_url: string;
    fld_email: string;
    fld_fb_page: string;
    fld_fullname: string;
    fld_industry: string;
    fld_logo: (File | null);
    fld_phone: string;

    constructor (
        company_name: string,
        company_url: string,
        email: string,
        fb_page: string,
        fullname: string,
        industry: string,
        logo: (File | null),
        phone: string
    ) {
        this.fld_company_name = company_name;
        this.fld_company_url = company_url;
        this.fld_email = email;
        this.fld_fb_page = fb_page;
        this.fld_fullname = fullname;
        this.fld_industry = industry;
        this.fld_logo = logo;
        this.fld_phone = phone;
    }
}

export const useCompanyStore = defineStore('company', () => {
    // Get the full list of companies
    const getCompanies = async (query?: String) => {
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

    // Add new company to the database
    const addCompany = async (company: ICompany): Promise<any> => {
        let tp_number_pattern = /^[\+]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
        let cp_number_pattern = /^[\+]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{3}?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/
        let email_pattern = /[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+/
        let url_pattern1 = /https?\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}/

        let tp = company.fld_phone.match(tp_number_pattern)
        let cp = company.fld_phone.match(cp_number_pattern)

        /** Validate here */
        // Company Name
        if (!company.fld_company_name)
            return ({
                field: 'fld_company_name',
                message: 'Company Name must not be empty.'
            })
        
        // Company Industry type
        if (!company.fld_industry)
            return ({
                field: 'fld_industry',
                message: 'Please select a type of industry.'
            })

            
        // Company FaceBook Page 
        if (!(company.fld_fb_page.match(url_pattern1) && company.fld_fb_page))
            return ({
                field: 'fld_fb_page',
                message: 'URL is invalid, please follow the correct pattern.'
            })

        // Company email address
        if (!(company.fld_email.match(email_pattern) && company.fld_email))
            return ({
                field: 'fld_email',
                message: 'Email is invalid.'
            })
            
        // Company URL
        if (!(company.fld_company_url.match(url_pattern1) && company.fld_company_url))
                return ({
                    field: 'fld_company_url',
                    message: 'URL is invalid, please follow the correct pattern.'
                })

        // Company Phone/CellPhone number
        if (!(tp || cp))
            return ({
                field: 'fld_phone',
                message: 'Phone number pattern is incorrect. Please follow correct pattern.'
            })

        if (company.fld_logo) {
            const formData = new FormData()
            formData.append("file", company.fld_logo)

            try {
                const upload_result = await fetch(UPLOAD_FILE_URL,
                {
                    method: "POST",
                    headers: {
                        Authorization: "Token " + BEARER_TOKEN,
                    },
                    body: formData
                })
    
                const data = await upload_result.json()
                company.fld_logo = data.url

            } catch (err: any) { console.log(err) }
        }
    
        // then save Client
        const result = await fetch(API_URL + "?user_field_names=true",
        {
            method: "POST",
            headers: {
                Authorization: "Token " + BEARER_TOKEN,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(company)
        })

        return null
    }

    const deleteCompany = async (client_id: number) => {
        const result = await fetch(API_URL + client_id + "/", {
            method: "DELETE",
            headers: {
                'Authorization': `Token ${BEARER_TOKEN}`
            }
        })
    
        if (!result.ok) {
            const _delete_result = await result.json()
            return _delete_result
        }
    }

    const getCompany = async (company_id: number) => {
        const result = await fetch(API_URL + company_id + "/?user_field_names=true", {
            method: "GET",
            headers: {
                'Authorization': `Token ${BEARER_TOKEN}`
            }
        })
    
        const data = await result.json()
        return data
    }

    const updateCompany = async (company: ICompany) => {
        let tp_number_pattern = /^[\+]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
        let cp_number_pattern = /^[\+]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{3}?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/
        let email_pattern = /[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+/
        let url_pattern1 = /https?\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}/

        let tp = company.fld_phone.match(tp_number_pattern)
        let cp = company.fld_phone.match(cp_number_pattern)

        /** Validate here */
        // Company Name
        if (!company.fld_company_name)
            return ({
                field: 'fld_company_name',
                message: 'Company Name must not be empty.'
            })
        
        // Company Industry type
        if (!company.fld_industry)
            return ({
                field: 'fld_industry',
                message: 'Please select a type of industry.'
            })

            
        // Company FaceBook Page 
        if (!(company.fld_fb_page.match(url_pattern1) && company.fld_fb_page))
            return ({
                field: 'fld_fb_page',
                message: 'URL is invalid, please follow the correct pattern.'
            })

        // Company email address
        if (!(company.fld_email.match(email_pattern) && company.fld_email))
            return ({
                field: 'fld_email',
                message: 'Email is invalid.'
            })
            
        // Company URL
        if (!(company.fld_company_url.match(url_pattern1) && company.fld_company_url))
                return ({
                    field: 'fld_company_url',
                    message: 'URL is invalid, please follow the correct pattern.'
                })

        // Company Phone/CellPhone number
        if (!(tp || cp))
            return ({
                field: 'fld_phone',
                message: 'Phone number pattern is incorrect. Please follow correct pattern.'
            })

        if (company.fld_logo) {
            const formData = new FormData()
            formData.append("file", company.fld_logo)

            try {
                const upload_result = await fetch(UPLOAD_FILE_URL,
                {
                    method: "POST",
                    headers: {
                        Authorization: "Token " + BEARER_TOKEN,
                    },
                    body: formData
                })
    
                const data = await upload_result.json()
                company.fld_logo = data.url

            } catch (err: any) { console.log(err) }
        }

        // Update client
        const result = await fetch(API_URL + company.id + "/?user_field_names=true",
        {
            method: "PATCH",
            headers: {
                Authorization: "Token " + BEARER_TOKEN,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(company)
        })

        return null
    }

    return { getCompanies, addCompany, updateCompany, deleteCompany, getCompany }
})