import { Navigate } from "react-router";
import { useApp } from "../AppProvider";

export default function ProtectedRoute({children}){
    const {auth, authLoading} = useApp();

    if (authLoading) return null;

    if (!auth) {
        return <Navigate to="/login" replace />
    }

    return children;
}