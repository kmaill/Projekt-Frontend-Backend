export const createReservationRequest = async (token: string, payload: { workspaceId: number; startTime: string; endTime: string; userId: number }) => {
    const res = await fetch('http://localhost:8080/api/reservations', {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload),
    });
    
    if (!res.ok) {
        const errorDetails = await res.text(); 
        console.error("Szczegóły błędu:", errorDetails);
        throw new Error(`Odmowa z backendu: ${errorDetails}`);
    }
    
    return await res.json();
};
export const addAddonToReservationRequest = async (token: string, payload: { reservationId: number; addonId: number; quantity: number }) => {
    const res = await fetch('http://localhost:8080/api/reservation_addons', {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Błąd dodawania dodatku");
    return await res.json();
};

export const createPaymentRequest = async (token: string, payload: { reservationId: number; amount: number; paymentMethod: 'ONLINE' | 'OFFLINE' }) => {
    const res = await fetch('http://localhost:8080/api/payments', {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload),
    });
    
    if (!res.ok) {
        const errDetails = await res.text();
        throw new Error(`Błąd zapisu płatności w bazie: ${errDetails}`);
    }
    return await res.json();
};

export const createStripeSession = async (token: string, payload: { reservationId: number; amount: number; paymentMethod: string }) => {
    const res = await fetch('http://localhost:8080/api/payments/stripe/create-session', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });
    
    if (!res.ok) {
        const errDetails = await res.text();
        console.error("Szczegóły błędu Stripe:", errDetails);
        throw new Error(`Odmowa Stripe: ${errDetails}`);
    }
    
    return await res.json();
};

export const approveOfflinePayment = async (token: string, paymentId: number, adminId: number) => {
    const res = await fetch(`http://localhost:8080/api/payments/${paymentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            status: "COMPLETED",
            approvedBy: adminId
        })
    });
    if (!res.ok) throw new Error("Błąd akceptacji płatności");
    return await res.json();
};