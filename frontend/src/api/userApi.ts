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