import { useQuery } from "@tanstack/react-query"
import { getNoteApi } from "../../services/noteService"

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