import { Alert, Box, Button, ButtonGroup, Container, FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField, Typography, Dialog, DialogTitle ,DialogContent, DialogActions, Pagination } from "@mui/material";
import { useApp } from "../AppProvider";
import { useEditUser, useTotalTasksOfUser } from "../../hooks/useUser/userhook";
import darkBgImage from "../assets/dark_bg.jpg";
import lightBgImage from "../assets/light_bg.jpg";
import Notes from "../components/Notes";
import { useId, useState } from "react";

import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    AddPhotoAlternate as AddPhotoIcon,
    ListAlt as ListAltIcon
} from "@mui/icons-material";
import { useRemoveNote } from "../../hooks/useNotes/notehook";

export default function Profile() {
    const {mode, setMode, auth, setAuth} = useApp();
    const {userTasks, isLoadingTasks, tasksError, refetchTasks} = useTotalTasksOfUser();
    const [open, setOpen] = useState(false);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail ] = useState("");
    const [editPhone, setEditPhone] = useState("");
    const [editPassword, setEditPassword] = useState("");
    const outlinedPasswordId = useId();
    const [showPassword, setShowPassword] = useState(false);
    const [preview, setPreview] = useState(null);
    const [editImage, setEditImage] = useState(null);
    const {mutate, isPending, isError, error, isSuccess, data} = useEditUser();
    const [page, setPage] = useState(1);
    
    const notesPerPage = 6;
    const userNotes = userTasks?.notes;
    const startIndex = (page - 1) * notesPerPage;
    const endIndex = startIndex + notesPerPage;
    const currentNotes = userNotes?.slice(startIndex, endIndex);
    const totalPages = Math.ceil(userNotes?.length / notesPerPage);

    const handleClickOpen = () => {
        setEditName(userTasks?.name);
        setEditEmail(userTasks?.email);
        setEditPhone(userTasks?.phone);
        setEditImage(userTasks?.image);
        setOpen(true);
    }

    const handleClose = () => {
        setEditName("");
        setEditEmail("");
        setEditPhone("");
        setEditPassword("");
        setOpen(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate({
            name: editName,
            email: editEmail,
            password: editPassword,
            phone: editPhone,
            image: editImage
        });
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    }
    
    const handleMouseUpPassword = (e) => {
        e.preventDefault();
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setEditImage(reader.result);
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    }

    return (
        <div>
            <Container 
            style={{backgroundImage: `${mode === "light" ? `url(${lightBgImage})` : `url(${darkBgImage})`}`}} 
            maxWidth="lg" 
            className={`p-4 flex flex-col justify-center bg-cover bg-center items-center ${mode === "dark" ? " border-mist-700 border-2": " border-slate-600 border-2"} rounded-lg shadow-lg`}>
                <div className="p-2 flex flex-col items-center w-full h-full">
                    {!isLoadingTasks ?
                        <>
                            <div className="w-40 h-40 mb-3 rounded-full overflow-hidden border-2 border-slate-700">
                                {auth?.image ? 
                                    <img src={userTasks?.image} alt="user_profile" className="w-full h-full object-cover" /> : 
                                    <div className="text-white bg-sky-800 text-6xl flex flex-col items-center justify-center w-full h-full">
                                        {auth?.name?.charAt(0).toUpperCase()}
                                    </div>
                                }
                            </div>
                            <div className="text-center gap-y-2 py-3 flex flex-col items-center">
                                <b className={`text-2xl ${mode === "light" ? "text-mist-800" : "text-sky-300"}`}>{auth?.name}</b>
                                <b className={`text-sm ${mode === "light" ? "text-mist-700" : "text-sky-800"}`}>{auth?.email}</b>
                                <b className={`text-sm ${mode === "light" ? "text-mist-700" : "text-sky-800"}`}>{auth?.phone}</b>

                                <Button sx={{textTransform: 'none'}} onClick={handleClickOpen} variant="outlined">
                                    Edit Profile
                                </Button>
                                <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                                    <DialogTitle sx={{fontSize: 18}}>Edit Profile</DialogTitle>
                                    <DialogContent>

                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                id="image-upload"
                                                style={{ display: 'none' }}
                                                onChange={handleImageChange}
                                            />
                                            <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
                                                {preview ? (
                                                    <Box
                                                        component="img"
                                                        src={preview}
                                                        alt="preview"
                                                        sx={{
                                                            width: 90,
                                                            height: 90,
                                                            borderRadius: '50%',
                                                            objectFit: 'cover',
                                                            border: '2px solid #1976d2'
                                                        }}
                                                    />
                                                ) : (
                                                    <Box sx={{
                                                        width: 90,
                                                        height: 90,
                                                        borderRadius: '50%',
                                                        border: '2px dashed #1976d2',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: '#1976d2'
                                                    }}>
                                                        <AddPhotoIcon />
                                                        <Typography variant="caption">Photo</Typography>
                                                    </Box>
                                                )}
                                            </label>
                                        </Box>

                                        {isError && <Alert severity="warning" className="mb-3" variant="outlined">{error.message}</Alert>}

                                        <TextField 
                                            fullWidth
                                            id="outlined-basic"
                                            type="text"
                                            label="Name"
                                            variant="outlined"
                                            placeholder="enter your name"
                                            sx={{mb: 2, mt:1}}
                                            onChange={(e) => setEditName(e.target.value)}
                                            value={editName}
                                        />

                                        <TextField 
                                            fullWidth
                                            id="outlined-basic"
                                            type="text"
                                            label="Email"
                                            variant="outlined"
                                            placeholder="enter your email"
                                            sx={{mb: 2, mt:1}}
                                            onChange={(e) => setEditEmail(e.target.value)}
                                            value={editEmail}
                                        />

                                        <FormControl fullWidth variant="outlined">
                                                <InputLabel htmlFor={`${outlinedPasswordId}-input`}>Password</InputLabel>
                                                    <OutlinedInput
                                                        required
                                                        id={`${outlinedPasswordId}-input`}
                                                        type={showPassword ? "text" : "password"}
                                                         placeholder="enter your password"
                                                        value={editPassword}
                                                        onChange={(e) => setEditPassword(e.target.value)}
                                                        sx={{mb: 2}}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                 <IconButton
                                                                    aria-label={
                                                                        showPassword ? 'hide the password' : 'display the password'
                                                                    }
                                                                    onClick={handleClickShowPassword}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                    onMouseUp={handleMouseUpPassword}
                                                                    edge="end"
                                                                >
                                                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                            label="Password"
                                                    />
                                        </FormControl>

                                        <TextField 
                                            fullWidth
                                            id="outlined-basic"
                                            type="text"
                                            label="Phone"
                                            variant="outlined"
                                            placeholder="enter your phone"
                                            sx={{mb: 2, mt:1}}
                                            onChange={(e) => setEditPhone(e.target.value)}
                                            value={editPhone}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button onClick={handleSubmit}>Submit</Button>
                                    </DialogActions>
                                </Dialog>

                            </div> 
                        </> : <p>Loading...</p>
                    }
                </div>
            </Container>

            <Container sx={{mt: 3}}>
                <Typography sx={{ fontSize: 23, fontWeight: 'bold', borderBottom: '1px solid', pb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                        All Notes
                        <ListAltIcon color="warning" sx={{ ml: 1, fontSize: 28 }} />
                    </Box>

                    <Box>
                        <Pagination
                            page={page}
                            count={totalPages}
                            shape="rounded"
                            variant="outlined"
                            onChange={(e, value) => setPage(value)}
                        />
                    </Box>
                </Typography>

                {currentNotes?.length > 0 ? 
                    <Container maxWidth={false} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 mb-10" component="div">
                        {currentNotes?.map(note => {
                            return <Notes key={note.id} note={note} />
                        })}
                    </Container> : 
                    <Container maxWidth="lg" component="div" className="mt-5">
                        <Alert severity="warning">No Notes yet...</Alert>
                    </Container>
                }
            </Container>
        </div>
    )
}