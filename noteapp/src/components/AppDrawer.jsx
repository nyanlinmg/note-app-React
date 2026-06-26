import { useApp } from "../AppProvider";
import { Box, Container, Divider, Drawer, IconButton, ListItem, Typography, List, ListItemButton, ListItemText, Collapse } from "@mui/material";
import {
    CloseRounded as CloseIcon,
    NoteAlt as NoteIcon,
    Home as HomeIcon,
    AccountCircle as AccountIcon,
    LocalOffer as TagIcon,
    Favorite as FavoriteIcon,
    Delete as TrashIcon,
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    Logout as LogoutIcon

} from "@mui/icons-material"
import { useState } from "react";
import { getTags} from "../../hooks/useTags/tagshook";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
export default function AppDrawer() {
    const {mode, setMode, drawer, setDrawer, auth, setAuth} = useApp();
    const [dropDownOpen, setDropdownOpen] = useState(false);
    const {tags, isLoading, error, fetchTags} = getTags();

    const handleDropdown = (e) => {
        e.stopPropagation();
        setDropdownOpen(prev => !prev)
    };

    const tagHover = {
        position: 'relative',
        cursor: 'pointer',
        
        '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '0%',  
            height: '2px',
            backgroundColor: 'skyBlue',
            transition: 'width 0.3s ease'
        },

        '&:hover::after': {
            width: '100%',
        },
        '&:hover': {
            color: 'skyBlue'
        }
    }

    const hoverStyle = {
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            width: '0%',
            height: '100%',
            backgroundColor: mode === 'dark' ? '#262626' : 'rgba(25, 118, 210, 0.7)',
            transition: 'width 0.5s ease',
            zIndex: 0
        },
        '&:hover::before': {
            width: '100%'
        },
        '& .MuiListItemText-root': {
            position: 'relative',
            zIndex: 1,
        },
        '& .MuiSvgIcon-root': {
            position: 'relative',
            zIndex: 1
        },
        '&:hover .MuiSvgIcon-root': {
            color: 'white'
        },
        '&:hover': {
            color: 'white',
        }
    };

    const handleLogout = () => {
        setAuth(undefined);
        setDrawer(false);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }

    const naviagte = useNavigate();

    return (
        <Drawer
            open={drawer}
            sx={{display: {md: 'none', xs: 'flex' }}}
            onClose={() => setDrawer(false)}
        >
            <Container sx={{width: 200, height: '100%'}} maxWidth={false} disableGutters>
                <Box component="div" className={`flex items-center justify-between p-3
                 ${mode === "dark" ? "bg-neutral-800" : "bg-blue-500"}`}>
                    <Typography component="h1" className="text-white">
                        NoTi
                        <Typography component="span" sx={{marginLeft: 1}}>
                            <NoteIcon />
                        </Typography>
                    </Typography>
                    <IconButton 
                        color="inherit"
                        onClick={() => setDrawer(false)}
                    >
                        <CloseIcon color="error" />
                    </IconButton>
                </Box>

                <List>
                    <ListItem disablePadding>
                        <ListItemButton sx={hoverStyle} onClick={() => {
                            naviagte('/');
                            setDrawer(false);
                        }}>
                            <HomeIcon sx={{color: mode === "dark" ? 'white' : 'blue', marginRight: 1}} />
                            <ListItemText primary="Home"></ListItemText>
                        </ListItemButton>
                    </ListItem>
                    
                            <ListItem disablePadding>
                                <ListItemButton sx={hoverStyle} onClick={() => {
                                    naviagte('/profile')
                                    setDrawer(false);
                                }}>
                                    <AccountIcon sx={{color: mode === "dark" ? 'white' : 'blue', marginRight: 1}} />
                                    <ListItemText primary="Profile"></ListItemText>
                                </ListItemButton>
                            </ListItem>

                            <Divider />

                            <ListItem disablePadding>
                                <ListItemButton sx={hoverStyle} onClick={handleDropdown}>
                                    <TagIcon sx={{color: mode === "dark" ? 'white' : 'blue', marginRight: 1, mr: 1}} />
                                    <ListItemText primary="tags"></ListItemText>
                                    {dropDownOpen ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
                                </ListItemButton>
                            </ListItem>

                            <Collapse in={dropDownOpen} timeout="auto" unmountOnExit>
                                <List disablePadding>
                                    {tags?.map(tag => (
                                        <ListItem disablePadding sx={tagHover}>
                                            <ListItemButton>
                                                {tag.name}
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>

                            <ListItem disablePadding>
                                <ListItemButton sx={hoverStyle}>
                                    <FavoriteIcon sx={{color: mode === "dark" ? 'white' : 'blue', marginRight: 1}} />
                                    <ListItemText primary="Favorite"></ListItemText>
                                </ListItemButton>
                            </ListItem>

                            <Divider />

                            <ListItem disablePadding>
                                <ListItemButton sx={hoverStyle} onClick={() => {
                                    naviagte('/trash');
                                    setDrawer(false);
                                }}>
                                    <TrashIcon sx={{color: mode === "dark" ? 'white' : 'blue', marginRight: 1}} />
                                    <ListItemText primary="Trash"></ListItemText>
                                </ListItemButton>
                            </ListItem>

                            <button onClick={handleLogout} className={`ms-4 w-43 mt-3 flex justify-center gap-2 text-center border px-3 py-1 ${mode === "dark" ? "text-red-500 border-2 border-red-500 rounded-lg hover:bg-red-600 hover:text-white bg-transparent transition duration-300 cursor-pointer" : "text-red-600 hover:bg-red-600 hover:text-white bg-transparent border-2 rounded-lg transition duration-300 cursor-pointer border-red-600"}`}>
                                <p>Logout</p>
                                <LogoutIcon sx={{ms: 2}} />
                            </button>
                </List>
            </Container>
        </Drawer>
    )
}