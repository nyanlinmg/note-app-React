import { useEffect, useState } from "react";
import { TypeOfTags } from "../../types";
import { api } from "../../services/api";
import { useQuery } from "@tanstack/react-query";

async function fetchTagsQuery(): Promise<TypeOfTags[]> {
    const res = await fetch(`${api}/tags`, {
        method: 'GET'
    });

    if(!res.ok){
        const error = await res.json();
        throw new Error(error.msg);
    }

    return res.json();
}


export function getTags() {
    const {
        data: tags,
        isFetching: isLoading,
        error,
        refetch: fetchTags
    } = useQuery({
        queryKey: ["tags"],
        queryFn: fetchTagsQuery
    })

    return {tags, isLoading, error, fetchTags}
}