import { TypeOfNote } from "../types";
import { apiClient } from "./apiClient"

export const getNoteApi = async (id: string) : Promise<TypeOfNote> => {
    return apiClient(`/note_detail/${id}`);
}

export interface AddNoteCredentials {
    title: string,
    content: string,
    tag: number
}

export const removeNoteApi = async(id: string) : Promise<TypeOfNote>  => {
    return apiClient(`/remove_note/${id}`, {
        method: 'DELETE'
    });
}

export const deleteNoteApi = async(id: string) : Promise<TypeOfNote>  => {
    return apiClient(`/delete_note/${id}`, {
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