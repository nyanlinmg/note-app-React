
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useState,  useMemo, useContext, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppRouter from "./AppRouter";
import { apiClient } from "../services/apiClient";

const queryClient = new QueryClient();
const AppContext = createContext();

export default function AppProvider(){
    const [mode, setMode] = useState("light");
    const [drawer, setDrawer] = useState(false);
    const [auth, setAuth] = useState(undefined);
    const [authLoading, setAuthLoading] = useState(true);

    const theme = useMemo(() => {
		return createTheme({
			palette: { mode },
		});
	}, [mode]);

    useEffect(() => {
        async function verifyUser() {
            const token = localStorage.getItem("token");

            if (!token) {
                setAuthLoading(false);
                return;
            }

            try {
                const user = await apiClient('/users/verify', {
                    method: 'GET',
                });

                if (user) {
                    setAuth(user);
                } else {
                    localStorage.removeItem("token");
                }
            } catch (error) {
                localStorage.removeItem("token");
            } finally {
                setAuthLoading(false);
            }
        }

        verifyUser();
    }, []);

    return (
        <AppContext.Provider value={{mode, setMode, drawer, setDrawer, auth, setAuth, authLoading, setAuthLoading}}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <AppRouter />
                    <CssBaseline />
                </ThemeProvider>
            </QueryClientProvider>
        </AppContext.Provider>
    )
}

export function useApp() {
    return useContext(AppContext);
}