import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router"
import { LoginCredentials, loginUserApi } from "../../services/userService";


export const useLoginUser =  () => {
    const navigate  = useNavigate();
    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: (credentials: LoginCredentials) => loginUserApi(credentials),
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            queryClient.invalidateQueries({queryKey: ["tags"]});
            navigate('/home');
        },
        onError: (error: Error) => {
            console.log(error.message);
        }
    })

    return mutation;
}