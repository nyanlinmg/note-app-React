
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useState,  useMemo, useContext, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppRouter from "./AppRouter";

const queryClient = new QueryClient();
const AppContext = createContext();

export default function AppProvider(){
    const [mode, setMode] = useState("light");
    const [drawer, setDrawer] = useState(false);
    const [auth, setAuth] = useState(undefined);

    const theme = useMemo(() => {
		return createTheme({
			palette: { mode },
		});
	}, [mode]);

    return (
        <AppContext.Provider value={{mode, setMode, drawer, setDrawer, auth, setAuth}}>
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