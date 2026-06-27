import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router"
import { editUserApi, LoginCredentials, loginUserApi, RegisterCredentials, registerUserApi, totalFavoriteUserApi, totalRemovedTasksApi, totalTasksUserApi } from "../../services/userService";
import { useApp } from "../../src/AppProvider";
import { handleSuccess } from "../useNotes/notehook";

export const useEditUser = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {setAuth} = useApp();

    const mutation = useMutation({
        mutationFn: ({name, email, password, phone, image}: RegisterCredentials) => editUserApi({name, email, password, phone, image}),
        onSuccess: () => {
            handleSuccess(queryClient);
            
            localStorage.removeItem('token');
            setAuth(null);

            window.alert("please login again");
            navigate('/login');
        },
        onError: (error: Error) => {
            console.log(error.message);
        }
    });

    return mutation;
}

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
        isLoading: isLoadingRemovedTasks,
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
        isLoading: isLoadingTasks,
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
        isLoading: isLoadingFavorites,
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
            handleSuccess(queryClient);
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