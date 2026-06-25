import { Button, Container, IconButton, Typography } from "@mui/material";
import { useDeleteNote, useNote } from "../../hooks/useNotes/notehook";
import { formatRelative, formatDistance, parseISO} from "date-fns";

import {
    PushPinOutlined as PinOutlinedIcon,
    PushPin as PinIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router";

export default function Detail({id}) {
    const {noteDetail, noteDetailError, refetchNoteDetail, isLoadingNoteDetail} = useNote(id);
    const { mutate: deleteNote, isPending: isDeleting } = useDeleteNote();
    const navigate = useNavigate();

    const handleDelete = (id) => {
        if(window.confirm("Do you really want to remove this note ?")) {
            deleteNote(id, {
                onSuccess: () => navigate('/profile')
            });
        }
    };

    console.log(noteDetail);

    if (isLoadingNoteDetail) {
        return <Container maxWidth="lg"><Typography>Loading...</Typography></Container>;
    }

    if (noteDetailError) {
        return <Container maxWidth="lg"><Typography>Something went wrong.</Typography></Container>;
    }

    if (!noteDetail) {
        return <Container maxWidth="lg"><Typography>Note not found.</Typography></Container>;
    }

    return (
        <Container maxWidth="lg" component="div" className="shadow-lg rounded-lg border-2 border-gray-400">
            <header className="border-b border-b-mist-500 py-5">
                <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Typography component="h1" sx={{fontSize: 28, fontWeight: 'bold', fontFamily: 'fangsong'}}>
                            {noteDetail?.titles}
                        </Typography>
                        <IconButton color="warning" size="small">
                            {noteDetail?.favorite ? <PinIcon/> : <PinOutlinedIcon/>}
                        </IconButton>
                    </div>

                    <div>
                        <Button sx={{textTransform: 'none'}} variant="outlined">
                            <EditIcon sx={{fontSize: 18, mr: 1}} /> Edit note
                        </Button>
                    </div>
                </div>

                <div className="text-sm mt-3">
                    {formatRelative(parseISO(noteDetail.createdAt), new Date())}
                </div>

                <div className="flex gap-2">
                    <p className="font-bold">Category : </p>
                    <p className="text-sky-500">{noteDetail?.tag?.name}</p>
                </div>
            </header>

            <section className="mb-5 border-b border-b-mist-500 py-5">
                <div className="text-lg">
                    {noteDetail?.contents}
                </div>
            </section>

            <footer className="mb-5">
                <Button onClick={() => handleDelete(id)} disabled={isDeleting} variant="outlined" color="error">
                    <DeleteIcon sx={{mr: 1}} />
                    <p>Delete</p>
                </Button>
            </footer>
        </Container>
    )
}