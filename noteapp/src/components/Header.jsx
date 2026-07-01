import { AppBar, Container, Icon, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Box, Menu, MenuItem, Button, Slide, Dialog, Card, CardHeader, CardContent, TextField, TextareaAutosize, FormControl, InputLabel, Select, ButtonGroup } from "@mui/material";
import { useApp } from "../AppProvider";
import { useLocation, useNavigate } from "react-router";

import {
    Menu as MenuIcon,
    EventNote as EventNoteIcon,
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon,
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    Logout as LogoutIcon,
    NoteAdd as NoteAddIcon,
    Close as CloseIcon
} from "@mui/icons-material";
import { getTags} from "../../hooks/useTags/tagshook";
import { forwardRef, useEffect, useState } from "react";
import { color } from "framer-motion";
import { useAddNote, useRemoveNote } from "../../hooks/useNotes/notehook";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

export default function Header() {
    const {mode, setMode, drawer, setDrawer, auth, setAuth} = useApp();
    const { pathname } = useLocation();
    const {tags, isLoading, error,  fetchTags} = getTags();
    const [anchorEl, setAnchorEl] = useState(null);
    const [open , setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tag, setTag] = useState("");
    const {mutate, isPending, isError, isSuccess, data} = useAddNote();

    console.log(tag);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth(undefined);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate({title,content,tag});
    }

    const handleReset = () => {
        setTitle("");
        setContent("");
        setTag("");
    }

    useEffect(() => {
        if(isSuccess) {
            window.alert("Added new note successfully");
            handleClose();
            handleReset();
        }
    }, [isSuccess])

    return (
        <AppBar position="static" color="primary">
            <Toolbar sx={{width: '100%',display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton
                        color="inherit"
                        onClick={() => navigate('/')}
                    >
                        <Typography sx={{fontSize: 25, marginRight: 1}}>NoTi</Typography>
                        <EventNoteIcon sx={{fontSize: 35}} />
                    </IconButton>

                    <List sx={{display: {md: 'flex', xs: 'none' }, gap: 2}}>
                        <ListItemButton onClick={() => navigate('/')}>
                            <ListItemText>Home</ListItemText>
                        </ListItemButton>

                        <ListItemButton onClick={() => navigate('/profile')}>
                            <ListItemText>Profile </ListItemText>
                        </ListItemButton>

                        <ListItemButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                            <ListItemText sx={{mr: 1}}>Tags</ListItemText>
                            {anchorEl ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </ListItemButton>

                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                            {tags?.map(tag => (
                                <ListItem disablePadding>
                                    <ListItemButton key={tag?.id} onClick={() => {
                                        navigate(`tagPage/${tag?.id}`);
                                    }}>
                                        {tag?.name}
                                    </ListItemButton>
                                </ListItem>
                            ))}                         
                        </Menu>

                        <ListItemButton onClick={() => navigate('/favorite')}>
                            <ListItemText>favorite</ListItemText>
                        </ListItemButton>

                        <ListItemButton onClick={() => navigate('/trash')}>
                            <ListItemText>Trash</ListItemText>
                        </ListItemButton>
                    </List>

                    <Box sx={{ display: 'flex', alignItems: 'center'}}>
                        <IconButton title="add note" color="inherit" onClick={handleClickOpen}>
                            <NoteAddIcon />
                        </IconButton>
                        <Dialog
                            fullScreen
                            open={open}
                            onClose={handleClose}
                            slots={{
                                transition: Transition
                            }}
                        >
                            <AppBar sx={{position: 'relative'}}>
                                <Toolbar>
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        onClick={handleClose}
                                        aria-label="close"
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                                        Add New Note
                                    </Typography>
                                </Toolbar>
                            </AppBar>

                            <Container maxWidth="sm" sx={{mt: 4, mb: 4}}>
                                <Card>
                                    <CardHeader title="New Note" color="inherit" className={`${mode === "dark" ? "text-gray-200 bg-mist-800" : "text-white bg-blue-400"} text-center`} />
                                </Card>
                                <CardContent className="shadow-lg">
                                    <form >
                                        <TextField
                                            value={title}
                                            required
                                            name="Title"
                                            onChange={(e) => setTitle(e.currentTarget.value)}
                                            fullWidth
                                            placeholder="enter title"
                                            id="outlined-basic"
                                            label="Title"
                                            variant="outlined"
                                        />

                                        <TextareaAutosize
                                            value={content}
                                            style={{width: "100%", border: '1px solid gray', borderRadius: 4, padding: 10, marginTop: 15, marginBottom: 12}}
                                            required
                                            name="Title"
                                            onChange={(e) => setContent(e.currentTarget.value)}
                                            placeholder="enter content"
                                        />

                                        <FormControl fullWidth>
                                            <InputLabel id="select_tag">Tag</InputLabel>
                                            <Select
                                                labelId="select_tag"
                                                id="select"
                                                value={tag}
                                                label="Tag"
                                                onChange={(e)  => setTag(e.target.value)}
                                            >
                                                {tags?.map(t => (
                                                    <MenuItem key={t.id} value={t.id}>
                                                        {t.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                        <div className="max-w-80 m-auto">
                                            <ButtonGroup fullWidth sx={{mt: 3}}>
                                                <Button onClick={handleSubmit} disabled={isLoading} color="primary" variant="outlined">
                                                    <Typography>Register</Typography>
                                                </Button>
                                                <Button type="button" color="error" variant="outlined" onClick={handleReset}>
                                                    <Typography>Reset</Typography>
                                                </Button>
                                            </ButtonGroup>
                                        </div>
                                    </form>
                                </CardContent>
                            </Container>
                        </Dialog>

                        {
                            mode === "light" ? 
                            <IconButton 
                                color="inherit"
                                onClick={() => setMode("dark")}
                            >
                                <DarkModeIcon />
                            </IconButton> :

                            <IconButton
                                color="inherit"
                                onClick={() => setMode("light")}
                            >
                                <LightModeIcon />
                            </IconButton>
                        } 

                        {auth &&
                            <>
                                <IconButton 
                                    color="inherit" sx={{display: {xs: 'flex',md: 'none', alignItems: 'center', ml: 4 }}}
                                    onClick={() => setDrawer(true)}
                                >
                                    <MenuIcon />
                                </IconButton>

                                <button 
                                    className={`ms-4 flex justify-center gap-1 border p-1 ${mode === "dark" ? "text-red-500 border-2 border-red-500 rounded-lg hover:bg-red-600 hover:text-white bg-transparent transition duration-300 cursor-pointer" : "text-red-600 hover:bg-red-600 hover:text-white bg-transparent border-2 rounded-lg transition duration-300 cursor-pointer border-red-600"}`}
                                    onClick={handleLogout}    
                                >
                                    <p>Logout</p>
                                    <LogoutIcon />
                                </button>
                            </>
                        }
                    </Box>
            </Toolbar>
        </AppBar>
    )
}