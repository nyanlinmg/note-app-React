import { Container } from "@mui/material";
import { useParams } from "react-router";

export default function TagPage() {
    const {id} = useParams();

    return (
        <Container maxWidth={false}>
            Tag {id}
        </Container>
    )
}