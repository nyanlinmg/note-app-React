
import { Container } from "@mui/material";
import { Outlet } from "react-router";
import Header from "./components/Header";
import AppDrawer from "./components/AppDrawer";

export default function App(){
    return (
        <div>
            <Header />
            <AppDrawer />
            <Container sx={{mt: 4}} maxWidth={false}>
                <Outlet />
            </Container>
        </div>
    )
      
}