import { TypeOfUser } from "../types";
import { api } from "./api"

export interface LoginCredentials {
    email: string,
    password: string
}

export const loginUserApi = async (credentials: LoginCredentials): Promise<{user: TypeOfUser; token: string}> => {
    const res = await fetch(`${api}/user/login`, {
        method: 'POST',
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            credentials
        })
    })

    if(!res.ok){
        const error = await res.json();
        throw new Error(error.msg);
    }

    return res.json();
}