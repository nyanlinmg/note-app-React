import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addNoteApi, NoteCredentials, deleteNoteApi, getNoteApi, getPinNotesApi, pinNoteApi, removeNoteApi, restoreNoteApi, editNoteApi, getNoteTagApi } from "../../services/noteService"
import { useNavigate } from "react-router";

export const useFavorite = () => {
    const {
        data: pinNotes,
        isLoading: isLoadingPinNotes,
        error: pinNotesError,
        refetch: refetchPinNotes
    } = useQuery({
        queryKey: ['favorite', 'me'],
        queryFn: () => getPinNotesApi()
    });

    return {pinNotes, isLoadingPinNotes, pinNotesError, refetchPinNotes}
}

export const useNoteTag = (id: string) => {
    const {
        data: noteTags,
        isLoading: isLoadingNoteTags,
        error: noteTagError,
        refetch: refetchNoteTags
    } = useQuery({
        queryKey: ['noteTag', `${id}`],
        queryFn: () => getNoteTagApi(id)
    });

    return {noteTags, isLoadingNoteTags, noteTagError, refetchNoteTags}
}

export const useNote = (id: string) => {
    const {
        data: noteDetail,
        isLoading: isLoadingNoteDetail,
        error: noteDetailError,
        refetch: refetchNoteDetail
    } = useQuery({
        queryKey: ['note', `${id}`],
        queryFn: () => getNoteApi(id)
    });

    return {noteDetail, isLoadingNoteDetail, noteDetailError, refetchNoteDetail}
}

export const handleSuccess = (queryClient: QueryClient) => {
    queryClient.invalidateQueries({queryKey: ['notes']});
    queryClient.invalidateQueries({queryKey: ['userTasks', 'me']});
    queryClient.invalidateQueries({queryKey: ['userFavorites', 'me']});
    queryClient.invalidateQueries({queryKey: ['userRemovedTasks', 'me']});
    queryClient.invalidateQueries({queryKey: ['favorite', 'me']});
    queryClient.invalidateQueries({queryKey: ['tags']});
    queryClient.invalidateQueries({queryKey: ['noteTag']});
}

export const useEditNote = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({id, title, content, tag}: NoteCredentials) => editNoteApi({id, title, content, tag}),
        onSuccess:(_data, {id}) => {
            handleSuccess(queryClient);
            queryClient.invalidateQueries({queryKey: ['note', id]})
        },
        onError: (error: Error) => {
            console.log(error.message);
        }
    });

    return mutation;
}

export const usePinNote = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: string) => pinNoteApi(id),
        onSuccess: (_data, id) => {
            handleSuccess(queryClient);
            queryClient.invalidateQueries({queryKey: ['note', id]})
        },
        onError: (error: Error) => {
            console.log(error.message);
        }
    });

    return mutation;
}

export const useDeleteNote = () => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: (id: string) => deleteNoteApi(id),
        onSuccess: () => {
            handleSuccess(queryClient);
        },
        onError: (error: Error) => {
            console.log(error.message);
        }
    });

    return mutation;
}

export const useRestoreNote = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: string) => restoreNoteApi(id),
        onSuccess: () => {
            handleSuccess(queryClient);
        },
        onError: (error: Error) => {
            console.log(error.message);
        }
    });

    return mutation;
}

export const useRemoveNote = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: string) => removeNoteApi(id),
        onSuccess: () => {
            handleSuccess(queryClient);
        },
        onError: (error: Error) => {
            console.log(error.message);
        }
    });

    return mutation;
}

export const useAddNote = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({title, content, tag} : NoteCredentials) => addNoteApi({title, content, tag}),
        onSuccess: () => {
            handleSuccess(queryClient);
        },
        onError: (error: Error) => {
            console.log(error.message);
        }
    });

    return mutation;
}