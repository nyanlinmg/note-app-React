import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addNoteApi, AddNoteCredentials, deleteNoteApi, getNoteApi, pinNoteApi, removeNoteApi, restoreNoteApi } from "../../services/noteService"
import { useNavigate } from "react-router";

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
        mutationFn: ({title, content, tag} : AddNoteCredentials) => addNoteApi({title, content, tag}),
        onSuccess: () => {
            handleSuccess(queryClient);
        },
        onError: (error: Error) => {
            console.log(error.message);
        }
    });

    return mutation;
}