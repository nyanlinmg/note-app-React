import { Box, Container, duration } from "@mui/material";
import { useApp } from "../AppProvider";
import { Navigate, redirect, useNavigate } from "react-router";
import Count from "../components/Count";

export default function Home() {

    return (
        <Container>
                <Count />
        </Container>
    )
}