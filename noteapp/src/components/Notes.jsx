import { Box, Button, Card, CardActions, CardContent, IconButton, Typography } from "@mui/material";
import { formatRelative, formatDistance} from "date-fns";

import {
    Delete as DeleteIcon,
    Label as LabelIcon,
    StarBorder as StarBorderIcon,
    Star as StarIcon
} from "@mui/icons-material"

export default function Notes({note}) {

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
                                <StarIcon/>:
                                <StarBorderIcon />
                            }
                        </IconButton>
                    </Box>
                    <Typography color="success">
                        <LabelIcon sx={{mr: 1}} />
                        {note?.tag?.name}
                    </Typography>
                    <Typography variant="p" sx={{fontSize: 14}}>
                        {formatRelative(note?.createdAt, new Date())}
                    </Typography>
                    <Typography variant="body2" component="div" sx={{color: 'text.secondary', mt: 2}}>
                        {note?.contents?.slice(0,100) + "..."}
                    </Typography>
                </CardContent>

                <CardActions sx={{ml: 1, mb: 2}}>
                    <Button size="md" variant="contained" title="view" sx={{textTransform: 'none', mr: 'auto'}}>View More</Button>
                    <Button color="error" size="small" title="delete" variant="outlined">
                        <DeleteIcon />
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}