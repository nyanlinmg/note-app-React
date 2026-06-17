import { Alert, Box, Button, ButtonGroup, Container, FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import React, { useId, useState } from "react";

import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    AddPhotoAlternate as AddPhotoIcon
} from "@mui/icons-material"
import { useApp } from "../AppProvider";
import { useNavigate } from "react-router";
import { useLoginUser, useRegisterUser } from "../../hooks/useUser/userhook";

export default function RegisterForm() {
     const outlinedPasswordId = useId();
    const [showPassword, setShowPassword] = useState(false);
    const { mode, setMode } = useApp();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {mutate, isPending, isError, error, isSuccess, data} = useRegisterUser();
    const [preview, setPreview] = useState(null);
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    }
    
    const handleMouseUpPassword = (e) => {
        e.preventDefault();
    }
    
    const navigate = useNavigate();
    
    const handleReset = () => {
        setEmail("");
        setPassword("");
        setName("");
        setImage("");
        setPreview("");
        setPhone("");
    }
    
    const handleRegister = (e) => {
        e.preventDefault();
        mutate({name, email, password, phone, image});
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    }

    return (
        <div className="max-w-120 m-auto">
            <div className="rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                <div className={`${mode === "dark" ? "bg-gray-500" : "bg-blue-500"}`}>
                    <h1 className="text-center font-bold text-2xl py-3 text-white">Register Form</h1>
                </div>
                <form className="m-7" onSubmit={handleRegister}>
                    {isError && <Alert sx={{mb:2}} variant={mode === "dark" ? "outlined" : "standard"} severity="error">{error?.message}</Alert>}

                    {isSuccess && <Alert sx={{mb: 2}} variant={mode === "dark" ? "outlined" : "standard"} severity="success">{data?.success}</Alert>}

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

                    <TextField
                        fullWidth
                        id="outlined-basic"
                        type="text"
                        label="Name"
                        required
                        variant="outlined"
                        placeholder="enter your name"
                        sx={{mb: 2}}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />

                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Email"
                        required
                        variant="outlined"
                        placeholder="enter your email"
                        sx={{mb: 2}}
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                        value={email}
                    />

                    <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor={`${outlinedPasswordId}-input`}>Password</InputLabel>
                            <OutlinedInput
                                required
                                id={`${outlinedPasswordId}-input`}
                                type={showPassword ? "text" : "password"}
                                placeholder="enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                        label="Phone"
                        variant="outlined"
                        placeholder="enter your phone"
                        sx={{mb: 3}}
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                    />

                    <div className="max-w-80 m-auto">
                        <ButtonGroup fullWidth sx={{mt: 3}}>
                            <Button type="submit" disabled={isPending} color="primary" variant="outlined">
                                <Typography>Register</Typography>
                            </Button>
                            <Button type="button" color="error" variant="outlined" onClick={handleReset}>
                                <Typography>Reset</Typography>
                            </Button>
                        </ButtonGroup>
                    </div>

                    <div className="text-center mt-2">
                        <small className="text-mauve-500">Do you already have an account ? <a className="text-blue-400 cursor-pointer underline" onClick={() => navigate('/login')}>login</a></small>
                    </div>
                </form>
            </div>
        </div>
    )
}