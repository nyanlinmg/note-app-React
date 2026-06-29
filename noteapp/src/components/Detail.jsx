import { Button, Container, IconButton, Typography, Dialog, DialogTitle, DialogActions, DialogContent, Box, TextField, TextareaAutosize, FormControl, InputLabel, Select, Menu, MenuItem, Alert} from "@mui/material";
import { useRemoveNote, useNote, usePinNote, useEditNote } from "../../hooks/useNotes/notehook";
import { formatRelative, formatDistance, parseISO } from "date-fns";

import {
    PushPinOutlined as PinOutlinedIcon,
    PushPin as PinIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useState } from "react";
import { getTags } from "../../hooks/useTags/tagshook";

export default function Detail({id}) {
    const {noteDetail, noteDetailError, refetchNoteDetail, isLoadingNoteDetail} = useNote(id);
    const { mutate: removeNote, isPending: isDeleting } = useRemoveNote();
    const {mutate: editNote, isPending: isEditing, isError, error} = useEditNote();
    const navigate = useNavigate();
    const { mutate: pinNote} = usePinNote();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tagId, setTagId] = useState("");
    const {tags, isLoading, fetchTags} = getTags();

    const handleEdit = (id) => {
        editNote({id, title, content, tag: tagId}, {
            onSuccess: setOpen(false)
        })
    }

    const handleDelete = (id) => {
        if(window.confirm("Do you really want to remove this note ?")) {
            removeNote(id, {
                onSuccess: () => navigate('/profile')
            });
        }
    };

    const handlePin = (id) => {
        pinNote(id);
    }

    const handleClickOpen = () => {
        setTagId(noteDetail?.tag?.id);
        setTitle(noteDetail?.titles);
        setContent(noteDetail?.contents);
        setOpen(true);
    }

    const handleClose = () => {
        setTagId("");
        setTitle("");
        setContent("");
        setOpen(false);
    }

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
                        <IconButton color="warning" size="small" onClick={() => handlePin(id)}>
                            {noteDetail?.favorite ? <PinIcon/> : <PinOutlinedIcon/>}
                        </IconButton>
                    </div>

                    <div>
                        <Button sx={{textTransform: 'none'}} variant="outlined" onClick={handleClickOpen}>
                            <EditIcon sx={{fontSize: 18, mr: 1}} /> Edit note
                        </Button>
                        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                                    <DialogTitle sx={{fontSize: 18}}>Edit Note</DialogTitle>
                                    <DialogContent>

                                        {isError && <Alert severity="warning" className="mb-3" variant="outlined">{error.message}</Alert>}

                                        <TextField 
                                            fullWidth
                                            id="outlined-basic"
                                            type="text"
                                            label="Title"
                                            variant="outlined"
                                            placeholder="enter the title"
                                            sx={{mb: 2, mt:1}}
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />

                                        <TextareaAutosize
                                            style={{width: "100%", border: '1px solid gray', borderRadius: 4, padding: 10, marginTop: 15, marginBottom: 12}}
                                            id="outlined-basic"
                                            type="text"
                                            label="Content"
                                            variant="outlined"
                                            placeholder="enter the content"
                                            sx={{mb: 2, mt:1}}
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                        />

                                        <FormControl fullWidth>
                                                 <InputLabel id="select_tag">Tag</InputLabel>
                                                 <Select
                                                     labelId="select_tag"
                                                     id="select"
                                                     value={tagId}
                                                     label="Tag"
                                                     onChange={(e)  => setTagId(e.target.value)}
                                                 >
                                                     {tags?.map(t => (
                                                         <MenuItem key={t.id} value={t.id}>
                                                             {t.name}
                                                         </MenuItem>
                                                     ))}
                                                 </Select>
                                        </FormControl>                                   
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button onClick={() => {handleEdit(id)}}>Submit</Button>
                                    </DialogActions>
                                </Dialog>
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