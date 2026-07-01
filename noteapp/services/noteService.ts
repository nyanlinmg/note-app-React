import { TypeOfNote } from "../types";
import { apiClient } from "./apiClient"

export const getNoteApi = async (id: string) : Promise<TypeOfNote> => {
    return apiClient(`/note_detail/${id}`);
}

export interface NoteCredentials {
    id?: string,
    title: string,
    content: string,
    tag: number
}

export const getNoteTagApi = async(id: string) : Promise<TypeOfNote[]> => {
    return apiClient(`/get_tag/${id}`);
}

export const getPinNotesApi = async() : Promise<TypeOfNote[]> => {
    return apiClient('/pin');
}

export const editNoteApi = async({id, title, content, tag} : NoteCredentials) : Promise<TypeOfNote> => {
    return apiClient(`/edit_note/${id}`, {
        method: 'PUT',
        body: {
            title, 
            content,
            tag_id: tag
        }
    })
}

export const removeNoteApi = async(id: string) : Promise<TypeOfNote>  => {
    return apiClient(`/remove_note/${id}`, {
        method: 'DELETE'
    });
}

export const pinNoteApi = async(id: string) : Promise<TypeOfNote> => {
    return apiClient(`/pin/${id}`, {
        method: 'PUT'
    });
}

export const restoreNoteApi = async(id: string) : Promise<TypeOfNote> => {
    return apiClient(`/restore_note/${id}`, {
        method: 'PUT'
    });
}

export const deleteNoteApi = async(id: string) : Promise<TypeOfNote>  => {
    return apiClient(`/delete_note/${id}`, {
        method: 'DELETE'
    });
}

export const addNoteApi = async ({title, content, tag} : NoteCredentials ) : Promise<TypeOfNote> => {
    return apiClient('/add_note', {
        method: 'POST',
        body: {
            title, content, tag
        }
    });
}