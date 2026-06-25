import { TypeOfNote } from "../types";
import { apiClient } from "./apiClient"

export const getNoteApi = async (id: string) : Promise<TypeOfNote> => {
    return apiClient(`/notes/${id}`);
}

export interface AddNoteCredentials {
    title: string,
    content: string,
    tag: number
}

export const deleteNoteApi = async(id: string) : Promise<TypeOfNote>  => {
    return apiClient(`/remove_note/${id}`, {
        method: 'DELETE'
    });
}

export const addNoteApi = async ({title, content, tag} : AddNoteCredentials ) : Promise<TypeOfNote> => {
    return apiClient('/add_note', {
        method: 'POST',
        body: {
            title, content, tag
        }
    });
}