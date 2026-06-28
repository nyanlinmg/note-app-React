
import {
    Delete as DeleteIcon,
    Sort as SortIcon,
    Favorite as FavoriteIcon
} from "@mui/icons-material";
import { Box, IconButton, Menu, Typography, MenuItem, Divider, Card, Container, Badge } from "@mui/material";
import { useState, useMemo } from "react";
import { useTotalRemovedTasksOfUser } from "../../hooks/useUser/userhook";
import Notes from "./Notes";
import { useFavorite, usePinNote } from "../../hooks/useNotes/notehook";

export default function FavoriteLists() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [sortType, setSortType] = useState("default");
    const {pinNotes, isLoadingPinNotes, pinNotesError, refetchPinNotes} = useFavorite();
    const [tagFilter, setTagFilter] = useState(null);

    console.log(pinNotes);

    const handleSort = (type) => {
        setSortType(type);
        setAnchorEl(null);
    };

     const handleTagSelect = (tagId) => {
        setTagFilter(tagId);
        setAnchorEl(null);
    };

    const availableTags = useMemo(() => {
        if(!pinNotes) return [];

        const tagsMap = new Map();
        pinNotes.forEach(note => {
            if(note.tag) {
                tagsMap.set(note.tag.id, note.tag);
            }
        });
        return [...tagsMap.values()];
    }, [pinNotes]);

    const sortedNotes = () => {
        let list = [...(pinNotes || [])];

        if(tagFilter) {
            list = list.filter(note => note.tag?.id === tagFilter);
        }

        if (sortType === "az") return list.sort((a, b) => a.titles.localeCompare(b.titles));
        if (sortType === "za") return list.sort((a, b) => b.titles.localeCompare(a.titles));
        if (sortType === "date") return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return list; // default
    };

    return (
        <>
            <Box component="header" className="flex items-center gap-3 border-b pb-3 border-b-gray-700">
                <Typography variant="h5">Favorites</Typography>
                
                <Badge color="primary" badgeContent={pinNotes?.length} sx={{ mr: 'auto'}}>
                    <FavoriteIcon color="error" sx={{fontSize: 28}} />
                </Badge>

                <IconButton color="primary" onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <SortIcon sx={{mr: 1}} />
                    <Typography sx={{fontSize: 13, fontWeight: 'bold'}}>Filter</Typography>
                </IconButton>

                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                    <MenuItem onClick={() => handleSort("default")}  selected={sortType === "default"}>Default</MenuItem>
                    <MenuItem onClick={() => handleSort("date")}      selected={sortType === "date"}>Sort by Date</MenuItem>
                    <MenuItem onClick={() => handleSort("az")}        selected={sortType === "az"}>A → Z</MenuItem>
                    <MenuItem onClick={() => handleSort("za")}        selected={sortType === "za"}>Z → A</MenuItem>

                    {availableTags.length > 0 && <Divider />}
                    {availableTags.length > 0 && (
                        <MenuItem disabled sx={{ opacity: 1, fontSize: 12, fontWeight: 'bold', color: 'text.secondary' }}>
                            Filter by tag
                        </MenuItem>
                    )}
                    {availableTags.map(tag => (
                        <MenuItem key={tag.id} onClick={() => handleTagSelect(tag.id)} selected={tagFilter === tag.id}>
                            {tag.name}
                        </MenuItem>
                    ))}
                    {tagFilter && (
                        <MenuItem onClick={() => handleTagSelect(null)} sx={{ color: 'error.main' }}>
                            Clear tag filter
                        </MenuItem>
                    )}
                </Menu>
            </Box>

            <Container maxWidth={false} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 mb-10" component="div">
                {
                    sortedNotes().length > 0 ?
                    sortedNotes().map(note => {
                        return <Notes key={note.id} note={note} />
                    }) : <Typography color="warning">No notes found</Typography>
                }
            </Container>
        </>
    )
}