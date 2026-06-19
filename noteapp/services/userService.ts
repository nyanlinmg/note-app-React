import { TypeOfUser } from "../types";
import { api } from "./api"

export interface LoginCredentials {
    email: string,
    password: string
}

export const totalTasksUserApi = async (id: string): Promise<TypeOfUser[]> => {
    const res = await fetch(`${api}/users/${id}`, {
        method: 'GET',
    });

    if(!res.ok) {
        const error = await res.json();
        throw new Error(error);
    }

    return res.json();
}

export const loginUserApi = async ({email, password} : LoginCredentials): Promise<{user: TypeOfUser; token: string}> => {
    const res = await fetch(`${api}/users/login`, {
        method: 'POST',
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            email, password
        })
    })

    if(!res.ok){
        const error = await res.json();
        throw new Error(error);
    }

    return res.json();
}

export interface RegisterCredentials {
    name: string,
    email: string,
    password: string,
    phone?: string,
    image?: string
}

export const registerUserApi = async({name, email, password, phone, image}: RegisterCredentials): Promise<{success: string, data: RegisterCredentials}> => {
    const res = await fetch(`${api}/users/register`, {
        method: 'POST',
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            name, email, password, phone, image
        })
    })

    if(!res.ok){
        const error = await res.json();
        throw new Error(error);
    }

    return res.json();
}