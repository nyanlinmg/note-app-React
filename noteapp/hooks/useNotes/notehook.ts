import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addNoteApi, AddNoteCredentials, deleteNoteApi, getNoteApi } from "../../services/noteService"
import { useNavigate } from "react-router";

export const useNote = (id: string) => {
    const {
        data: noteDetail,
        isFetching: isLoadingNoteDetail,
        error: noteDetailError,
        refetch: refetchNoteDetail
    } = useQuery({
        queryKey: ['note', `${id}`],
        queryFn: () => getNoteApi(id)
    });

    return {noteDetail, isLoadingNoteDetail, noteDetailError, refetchNoteDetail}
}

export const useDeleteNote = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (id: string) => deleteNoteApi(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['notes']});
            queryClient.invalidateQueries({queryKey: ['userTasks', 'me']});
            queryClient.invalidateQueries({queryKey: ['userFavorites', 'me']});
            queryClient.invalidateQueries({queryKey: ['userRemovedTasks', 'me']});
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
            queryClient.invalidateQueries({queryKey: ["tags"]});
            queryClient.invalidateQueries({queryKey: ['userTasks', 'me']});
            queryClient.invalidateQueries({queryKey: ['userFavorites', 'me']})
            queryClient.invalidateQueries({queryKey: ['userRemovedTasks', 'me']});
        },
        onError: (error: Error) => {
            console.log(error.message);
        }
    });

    return mutation;
}