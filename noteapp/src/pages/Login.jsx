import { Navigate } from "react-router";
import { useApp } from "../AppProvider";
import LoginForm from "../components/LoginForm";

export default function Login(){
    const {auth, authLoading} = useApp();

    if(authLoading) return null;

    if(auth){
        return <Navigate to="/" replace />
    }

    return <LoginForm />
}