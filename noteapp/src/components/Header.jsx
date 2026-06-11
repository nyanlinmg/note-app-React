import { AppBar, Container, Icon, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Box, Menu, MenuItem } from "@mui/material";
import { useApp } from "../AppProvider";
import { useLocation, useNavigate } from "react-router";

import {
    Menu as MenuIcon,
    EventNote as EventNoteIcon,
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon,
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon
} from "@mui/icons-material";
import { getTags} from "../../hooks/useTags/getTags";
import { useState } from "react";

export default function Header() {
    const {mode, setMode, drawer, setDrawer, auth, setAuth} = useApp();
    const { pathname } = useLocation();
    const {tags, isLoading, error,  fetchTags} = getTags();
    const [anchorEl, setAnchorEl] = useState(null);

    const navigate = useNavigate();

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

                        <IconButton 
                            color="inherit" sx={{display: {xs: 'flex',md: 'none', alignItems: 'center', marginLeft: 4 }}}
                            onClick={() => setDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
            </Toolbar>
        </AppBar>
    )
}