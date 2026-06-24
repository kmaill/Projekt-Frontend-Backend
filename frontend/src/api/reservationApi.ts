import {apiInterceptor} from "./apiInterceptor.ts";

export const createReservationRequest = async (payload: { workspaceId: number; startTime: string; endTime: string; userId: number }) => {
    const res = await apiInterceptor.post('/reservations', payload);
    return res.data;
};
export const addAddonToReservationRequest = async (payload: { reservationId: number; addonId: number; quantity: number }) => {
    const res = await apiInterceptor.post('/reservation_addons', payload);
    return res.data;
};

export const createPaymentRequest = async (payload: { reservationId: number; amount: number; paymentMethod: 'ONLINE' | 'OFFLINE' }) => {
    const res = await apiInterceptor.post('/payments', payload);
    return res.data;
};

export const createStripeSession = async (payload: { reservationId: number; amount: number; paymentMethod: string }) => {
    const res = await apiInterceptor.post('/payments/stripe/create-session', payload);
    return res.data;
};

export const approveOfflinePayment = async (paymentId: number, adminId: number) => {
    const res = await apiInterceptor.put(`/payments/${paymentId}`, {status: 'COMPLETED',  approvedBy: adminId});
    return res.data;
};

export const getAllReservations = async () => {
    const res = await apiInterceptor.get('/reservations');
    return res.data;
};

export const deleteReservation = async (id: number) => {
    await apiInterceptor.delete(`/reservations/${id}`);
};