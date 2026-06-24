import {apiInterceptor} from "./apiInterceptor.ts";

export const loginRequest = async (email: string, password: string) => {
    const res = await fetch('http://localhost:8080/api/users/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
    if (!res.ok) {
        throw new Error("Failed to login");
    }

    return await res.json();
};

export const refreshToken = async (token: string) => {
    const res = await fetch('http://localhost:8080/api/users/login/my', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        throw new Error("Failed to login");
    }

    return await res.json();
}

export const register = async (name: string, email: string, password: string) => {
    const res = await fetch('http://localhost:8080/api/users', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
        }),
    });
    if (!res.ok) {
        throw new Error("Failed to register");
    }

}

export const getAllUsers = async () => {
    const res = await apiInterceptor.get('/users');
    return res.data;
};

export const updateUserRole = async (id: number, role: string) => {
    const res = await apiInterceptor.put(`/users/${id}`, role);
    return res.data;
};

export const deleteUser = async (id: number) => {
    await apiInterceptor.delete(`/users/${id}`);
};