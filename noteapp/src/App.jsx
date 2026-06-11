
import { Container } from "@mui/material";
import { Outlet } from "react-router";
import Header from "./components/Header";
import AppDrawer from "./components/AppDrawer";

export default function App(){
    return (
        <div>
            <Header />
            <AppDrawer />
            <Container maxWidth="lg" sx={{mt: 4}}>
                <Outlet />
            </Container>
        </div>
    )
      
}