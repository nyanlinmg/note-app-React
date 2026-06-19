import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router"
import { LoginCredentials, loginUserApi, RegisterCredentials, registerUserApi, totalTasksUserApi } from "../../services/userService";
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

export const useTotalTasksOfUser = (id: string) => {
     const {
        data: userTasks,
        isFetching: isLoading,
        error,
        refetch
     } = useQuery({
        queryKey: ['users', id],
        queryFn: () => totalTasksUserApi(id)
     })

     return {userTasks, isLoading, error, refetch}
}

export const useLoginUser =  () => {
    const navigate  = useNavigate();
    const queryClient = useQueryClient();
    const {auth, setAuth} = useApp();
    
    const mutation = useMutation({
        mutationFn: ({email, password}: LoginCredentials) => loginUserApi({email, password}),
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.user.id.toString());
            setAuth(data.user);
            queryClient.invalidateQueries({queryKey: ["tags"]});
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