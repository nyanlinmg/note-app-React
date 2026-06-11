import { Navigate } from "react-router";
import { useApp } from "../AppProvider";

export default function ProtectedRoute({children}){
    const {auth} = useApp();

    if(!auth){
        return <Navigate to="/login" replace />
    }

    return children;
}