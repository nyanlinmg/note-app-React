import { Container } from "@mui/material";
import RemovedLists from "../components/RemovedLists";

export default function Trash() {
    return (
        <>
            <Container maxWidth={false}>
                <RemovedLists />
            </Container>
        </>
    )
}