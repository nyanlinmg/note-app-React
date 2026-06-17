import { AppBar, Container, Icon, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Box, Menu, MenuItem, Button } from "@mui/material";
import { useApp } from "../AppProvider";
import { useLocation, useNavigate } from "react-router";

import {
    Menu as MenuIcon,
    EventNote as EventNoteIcon,
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon,
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    Logout as LogoutIcon
} from "@mui/icons-material";
import { getTags} from "../../hooks/useTags/tagshook";
import { useState } from "react";

export default function Header() {
    const {mode, setMode, drawer, setDrawer, auth, setAuth} = useApp();
    const { pathname } = useLocation();
    const {tags, isLoading, error,  fetchTags} = getTags();
    const [anchorEl, setAnchorEl] = useState(null);

    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth(undefined);
        localStorage.removeItem('token');
    }

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
                        <ListItemButton>
                            <ListItemText>Home</ListItemText>
                        </ListItemButton>

                        <ListItemButton>
                            <ListItemText>Profile </ListItemText>
                        </ListItemButton>

                        <ListItemButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                            <ListItemText sx={{mr: 1}}>Tags</ListItemText>
                            {anchorEl ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </ListItemButton>

                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                            {tags?.map(tag => (
                                <MenuItem>
                                    {tag.name}
                                </MenuItem>
                            ))}
                        </Menu>

                        <ListItemButton>
                            <ListItemText>favorite</ListItemText>
                        </ListItemButton>

                        <ListItemButton>
                            <ListItemText>Trash</ListItemText>
                        </ListItemButton>
                    </List>

                    <Box sx={{ display: 'flex', alignItems: 'center'}}>
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
                                    className={`ms-4 flex justify-center gap-1 border px-3 py-1 ${mode === "dark" ? "text-red-500 border-2 border-red-500 rounded-lg hover:bg-red-600 hover:text-white bg-transparent transition duration-300 cursor-pointer" : "text-red-600 hover:bg-red-600 hover:text-white bg-transparent border-2 rounded-lg transition duration-300 cursor-pointer border-red-600"}`}
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