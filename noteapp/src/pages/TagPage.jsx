import { Container, Alert, Typography, Box } from "@mui/material";
import { useParams } from "react-router";
import { useNoteTag } from "../../hooks/useNotes/notehook";
import Notes from "../components/Notes";
import { getTags } from "../../hooks/useTags/tagshook";

export default function TagPage() {
    const {id} = useParams();
    const {isLoadingNoteTags, refetchNoteTags, noteTags, noteTagError} = useNoteTag(id);
    const {tags} = getTags();
    console.log(noteTags);

    const tagName = tags?.find(tag => tag?.id === Number(id))?.name;

    return (
        <Container maxWidth={false}>
                <Box component="header" className="flex items-center gap-3 border-b pb-3 border-b-gray-700"> 
                    <Typography variant="h5">
                        Category : <b>{tagName}</b>
                    </Typography>
                </Box>

                {!isLoadingNoteTags ? 
                    noteTags?.length > 0 ? 
                        <Container maxWidth={false} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 mb-10" component="div">
                            {noteTags?.map(note => {
                                return <Notes key={note.id} note={note} />
                            })}
                        </Container> : 
                        <Container maxWidth="lg" component="div" className="mt-5">
                            <Alert severity="warning">No Notes yet...</Alert>
                        </Container>
                     : <p>Loading...</p>      
                }   
        </Container>
    )
}