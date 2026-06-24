// do workspaces
import {apiInterceptor} from "./apiInterceptor.ts";

export const fetchWorkspaces = async () => {
    const res = await fetch('http://localhost:8080/api/workspaces', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error("Failed to fetch workspaces");
    }

    return await res.json();
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
    const res = await fetch('http://localhost:8080/api/addons', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error("Failed to fetch addons");
    }

    return await res.json();
};

export const createAddon = async (payload: any) => {
    const res = await apiInterceptor.post(`/addons/`, payload);
    return res.data;
};

export const updateAddon = async (id: number, payload: any) => {
    const res = await apiInterceptor.put(`/addons/${id}`, payload);
    return res.data;
};

export const deleteAddon = async (id: number) => {
    await apiInterceptor.delete(`/addons/${id}`);
};