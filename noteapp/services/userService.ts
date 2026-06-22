import { TypeOfNote, TypeOfUser } from "../types";
import { apiClient } from "./apiClient"

export interface LoginCredentials {
    email: string,
    password: string
}

export const totalFavoriteUserApi = async (): Promise<TypeOfNote[]> => {
    return apiClient('/users/favorites');
}

export const totalRemovedTasksApi = async(): Promise<TypeOfNote[]> => {
    return apiClient('/users/removedTasks');
}

export const totalTasksUserApi = async (): Promise<TypeOfUser> => {
    return apiClient('/users/me');
}

export const loginUserApi = async ({email, password} : LoginCredentials): Promise<{user: TypeOfUser; token: string}> => {
    return apiClient('/users/login', {
        method: 'POST',
        body: {email, password}
    })
}

export interface RegisterCredentials {
    name: string,
    email: string,
    password: string,
    phone?: string,
    image?: string
}

export const registerUserApi = async({name, email, password, phone, image}: RegisterCredentials): Promise<{success: string, data: RegisterCredentials}> => {
    return apiClient('/users/register', {
        method: 'POST',
        body: {name,  email, password, phone, image}
    })
}