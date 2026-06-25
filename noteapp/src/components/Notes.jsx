import { Box, Button, Card, CardActions, CardContent, IconButton, Typography } from "@mui/material";
import { formatRelative, formatDistance, parseISO, formatDistanceToNow} from "date-fns";
import { useNavigate } from "react-router";

import {
    Delete as DeleteIcon,
    Label as LabelIcon,
    PushPinOutlined as PinOutlinedIcon,
    PushPin as PinIcon
} from "@mui/icons-material"
import { useDeleteNote } from "../../hooks/useNotes/notehook";

export default function Notes({note}) {

    const navigate = useNavigate();
    const { mutate: deleteNote, isPending: isDeleting } = useDeleteNote();

    const handleDelete = (id) => {
        if(window.confirm("Do you really want to remove this note ?")) {
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
                        <IconButton color="warning" size="large" title="favorite">
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
                    <Button onClick={() => navigate(`/detail/${note?.id}`)} size="md" variant="contained" title="view" sx={{textTransform: 'none', mr: 'auto'}}>View More</Button>
                    <Button onClick={() => handleDelete(note.id)} disabled={isDeleting} color="error" size="small" title="delete" variant="outlined">
                        <DeleteIcon />
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}