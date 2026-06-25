// do workspaces
import {apiInterceptor} from "./apiInterceptor.ts";

export const fetchWorkspaces = async () => {
    const res = await apiInterceptor.get('/workspaces');
    return res.data;
};

export const createWorkspace = async (payload: any) => {
    const res = await apiInterceptor.post(`/workspaces`, payload);
    return res.data;
};

export const updateWorkspace = async (id: number, payload: any) => {
    const res = await apiInterceptor.put(`/workspaces/${id}`, payload);
    return res.data;
};

export const deleteWorkspace = async (id: number) => {
    await apiInterceptor.delete(`/workspaces/${id}`);
};

// do dodatkow
export const fetchAddons = async () => {
    const res = await apiInterceptor.get('/addons');
    return res.data;
};

export const createAddon = async (payload: any) => {
    const res = await apiInterceptor.post(`/addons`, payload);
    return res.data;
};

export const updateAddon = async (id: number, payload: any) => {
    const res = await apiInterceptor.put(`/addons/${id}`, payload);
    return res.data;
};

export const deleteAddon = async (id: number) => {
    await apiInterceptor.delete(`/addons/${id}`);
};