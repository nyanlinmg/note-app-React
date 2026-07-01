import { useEffect, useState } from "react";
import { TypeOfTags } from "../../types";
import { api } from "../../services/apiClient";
import { useQuery} from "@tanstack/react-query";
import { fetchTagsApi } from "../../services/tagsService";

export function getTags() {
    const {
        data: tags,
        isFetching: isLoading,
        error,
        refetch: fetchTags
    } = useQuery({
        queryKey: ["tags"],
        queryFn: fetchTagsApi
    })

    return {tags, isLoading, error, fetchTags}
}
