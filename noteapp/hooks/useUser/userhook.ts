import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router"
import { LoginCredentials, loginUserApi, RegisterCredentials, registerUserApi, totalFavoriteUserApi, totalRemovedTasksApi, totalTasksUserApi } from "../../services/userService";
import { useApp } from "../../src/AppProvider";

export const useRegisterUser = () => {
    const navigate  = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({name, email, password, phone, image}: RegisterCredentials) => registerUserApi({name, email, password, phone, image}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["tags"]});
            setTimeout(() => {
                navigate('/')
            }, 1000);
        },
        onError: (error: Error) => {
            console.log(error.message);
        }
    });

    return mutation;
}

export const useTotalRemovedTasksOfUser = () => {
    const {
        data: userRemovedTasks,
        isFetching: isLoadingRemovedTasks,
        error: removedTasksError,
        refetch: refetchRemovedTasks
    } = useQuery({
        queryKey: ['userRemovedTasks', 'me'],
        queryFn: () => totalRemovedTasksApi()
    });

    return {userRemovedTasks, removedTasksError, isLoadingRemovedTasks, refetchRemovedTasks}
}

export const useTotalTasksOfUser = () => {
     const {
        data: userTasks,
        isFetching: isLoadingTasks,
        error: tasksError,
        refetch: refetchTasks
     } = useQuery({
        queryKey: ['userTasks', 'me'],
        queryFn: () => totalTasksUserApi()
     })

     return {userTasks, isLoadingTasks, tasksError, refetchTasks}
}

export const useTotalFavoritesOfUser = () => {
    const {
        data: userFavorites,
        isFetching: isLoadingFavorites,
        error: favoritesError,
        refetch: refetchFavorites
    } = useQuery({
        queryKey: ['userFavorites', 'me'],
        queryFn: () => totalFavoriteUserApi()
    })

    return {userFavorites, isLoadingFavorites, favoritesError, refetchFavorites}
}

export const useLoginUser =  () => {
    const navigate  = useNavigate();
    const queryClient = useQueryClient();
    const {setAuth} = useApp();
    
    const mutation = useMutation({
        mutationFn: ({email, password}: LoginCredentials) => loginUserApi({email, password}),
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            setAuth(data.user);
            queryClient.invalidateQueries({queryKey: ["tags"]});
            queryClient.invalidateQueries({queryKey: ['userTasks', 'me']});
            queryClient.invalidateQueries({queryKey: ['userFavorites', 'me']})
            queryClient.invalidateQueries({queryKey: ['userRemovedTasks', 'me']})
            setTimeout(() => {
                navigate('/');
            }, 1000)

        },
        onError: (error: Error) => {
            console.log(error.message);
        }
    })

    return mutation;
}