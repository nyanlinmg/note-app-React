import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router"
import { LoginCredentials, loginUserApi } from "../../services/userService";
import { useApp } from "../../src/AppProvider";


export const useLoginUser =  () => {
    const navigate  = useNavigate();
    const queryClient = useQueryClient();
    const {auth, setAuth} = useApp();
    
    const mutation = useMutation({
        mutationFn: ({email, password}: LoginCredentials) => loginUserApi({email, password}),
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
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