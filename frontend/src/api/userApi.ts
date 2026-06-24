import {apiInterceptor} from "./apiInterceptor.ts";

export const loginRequest = async (email: string, password: string) => {
    const res = await apiInterceptor.post('/users/login', {
        email: email,
        password: password,
    });
    return res.data;
};

export const refreshToken = async (token: string) => {
    const res = await apiInterceptor.post('/users/login/my', {});
    return res.data;
}

export const register = async (name: string, email: string, password: string) => {
    const res = await apiInterceptor.post('/users', {
        name: name,
        email: email,
        password: password,
    });
    return res.data;
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