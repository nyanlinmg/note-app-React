import { TypeOfNote } from "../types";
import { apiClient } from "./apiClient"

export const getNoteApi = async (id: string) : Promise<TypeOfNote> => {
    return apiClient(`/notes/${id}`);
}