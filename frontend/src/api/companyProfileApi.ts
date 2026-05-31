import type {InvoicePayload} from "../pages/ClientPanel.tsx";


export const createCompanyProfile = async (token: string, invoice: InvoicePayload) => {
    const res = await fetch('http://localhost:8080/api/company_profiles', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            companyName: invoice.companyName,
            nip: invoice.nip,
            address: invoice.address,
            contactEmail: invoice.contactEmail,
        }),
    });
    if (!res.ok) {
        throw new Error("Failed to create profile");
    }
    console.log(invoice);
    return await res.json();
}

export const fetchCompanyProfile = async (token: string) => {
    const res = await fetch('http://localhost:8080/api/company_profiles/my', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        throw new Error("Failed to fetch company_profile");
    }

    return await res.json();
}