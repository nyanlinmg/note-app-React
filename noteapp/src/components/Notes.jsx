import { Box, Button, Card, CardActions, CardContent, IconButton, Typography } from "@mui/material";
import { formatRelative, formatDistance, parseISO, formatDistanceToNow} from "date-fns";
import { useNavigate } from "react-router";

import {
    Delete as DeleteIcon,
    Label as LabelIcon,
    PushPinOutlined as PinOutlinedIcon,
    PushPin as PinIcon,
    Restore as RestoreIcon
} from "@mui/icons-material"
import { useDeleteNote, usePinNote, useRemoveNote, useRestoreNote } from "../../hooks/useNotes/notehook";

export default function Notes({note, deleteId = null}) {

    const navigate = useNavigate();
    const { mutate: removeNote, isPending: isRemoving } = useRemoveNote();
    const { mutate: deleteNote, isPending: isDeleting } = useDeleteNote();
    const { mutate: restoreNote, isPending: isRestoring } = useRestoreNote();
    const { mutate: pinNote} = usePinNote();

    const handleRemove = (id) => {
        if(window.confirm("Do you really want to remove this note ?")) {
            removeNote(id);
        }
    };

    const handleRestore = (id) => {
        restoreNote(id);
    }

    const handlePin = (id) => {
        pinNote(id);
    }

    const handleDelete = (id) => {
        if(window.confirm("Do you really want to delete permanently this note ?")) {
            deleteNote(id);
        }
    };

    return (
        <Box>
            <Card variant="outlined" sx={{ border: '2px solid gray'}}>
                <CardContent>
                    <Box component="div" className="flex justify-between items-center">
                        <Typography variant="h2" sx={{fontSize: 18, color: 'text.dark', fontWeight: 'bold'}}>
                            {note?.titles}
                        </Typography>
                        <IconButton onClick={() => handlePin(note?.id)} color="warning" size="large" title="favorite">
                            {
                                note?.favorite ?
                                <PinIcon/>:
                                <PinOutlinedIcon />
                            }
                        </IconButton>
                    </Box>
                    <Typography color="success">
                        <LabelIcon sx={{mr: 1}} />
                        {note?.tag?.name}
                    </Typography>
                    <Typography variant="p" sx={{fontSize: 14}}>
                        {formatRelative(parseISO(note?.createdAt), new Date())}
                    </Typography>
                    <Typography variant="body2" component="div" sx={{color: 'text.secondary', mt: 2}}>
                        {note?.contents?.slice(0,100) + "..."}
                    </Typography>
                </CardContent>

                <CardActions sx={{ml: 1, mb: 2}}>
                    {
                        deleteId ? 
                        (
                            <>
                                <Button 
                                onClick={() => handleDelete(note.id)} 
                                disabled={isDeleting} 
                                color="error" 
                                size="small" 
                                title="delete" variant="outlined">
                                    <DeleteIcon />
                                </Button>

                                <Button 
                                onClick={() => handleRestore(note.id)}
                                disabled={isRestoring}
                                color="warning" 
                                size="small" 
                                title="restore" variant="outlined">
                                    <RestoreIcon />
                                </Button>
                            </>
                        ) :
                        (
                            <>
                                <Button 
                                    onClick={() => navigate(`/detail/${note?.id}`)} 
                                    size="md" 
                                    variant="contained" title="view" 
                                    sx={{textTransform: 'none', mr: 'auto'}}
                                >
                                    View More
                                </Button>
                                
                                <Button
                                    onClick={() => handleRemove(note.id)} disabled={isRemoving} 
                                    color="error" 
                                    size="small" 
                                    title="delete" variant="outlined"
                                >
                                    <DeleteIcon />
                                </Button>
                            </>
                        )
                    }
                </CardActions>
            </Card>
        </Box>
    )
}