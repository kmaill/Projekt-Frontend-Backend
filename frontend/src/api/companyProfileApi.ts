import type {InvoicePayload} from "../pages/ClientPanel.tsx";
import {apiInterceptor} from "./apiInterceptor.ts";


export const createCompanyProfile = async (invoice: InvoicePayload) => {
    const res = await apiInterceptor.post('/company_profiles', {
        companyName: invoice.companyName,
        nip: invoice.nip,
        address: invoice.address,
        contactEmail: invoice.contactEmail,
    });
    return res.data;
}

export const fetchCompanyProfile = async () => {
    const res = await apiInterceptor.get(`/company_profiles/my`);
    return res.data;
}