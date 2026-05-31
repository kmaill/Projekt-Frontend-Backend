// do workspaces
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

export const createWorkspace = async (token: string, payload: any) => {
    const res = await fetch('http://localhost:8080/api/workspaces', {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create workspace");
    return await res.json();
};

export const updateWorkspace = async (token: string, id: number, payload: any) => {
    const res = await fetch(`http://localhost:8080/api/workspaces/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update workspace");
    return await res.json();
};

export const deleteWorkspace = async (token: string, id: number) => {
    const res = await fetch(`http://localhost:8080/api/workspaces/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to delete workspace");
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

export const createAddon = async (token: string, payload: any) => {
    const res = await fetch('http://localhost:8080/api/addons', {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create addon");
    return await res.json();
};

export const updateAddon = async (token: string, id: number, payload: any) => {
    const res = await fetch(`http://localhost:8080/api/addons/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update addon");
    return await res.json();
};

export const deleteAddon = async (token: string, id: number) => {
    const res = await fetch(`http://localhost:8080/api/addons/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to delete addon");
};