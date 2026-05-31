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