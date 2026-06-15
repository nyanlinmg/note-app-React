import { Alert, Box, Button, ButtonGroup, Container, FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import React, { useId, useState } from "react";

import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon
} from "@mui/icons-material"
import { useApp } from "../AppProvider";
import { useNavigate } from "react-router";
import { useLoginUser } from "../../hooks/useUser/userhook";

export default function Login(){
    const outlinedPasswordId = useId();
    const [showPassword, setShowPassword] = useState(false);
    const { mode, setMode } = useApp();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {mutate, isPending, isError, error} = useLoginUser();

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
    }

    const handleLogin = (e) => {
        e.preventDefault();
        mutate({email, password});
    }

    return (
        <div className="max-w-120 m-auto">
            <div className="rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                <div className={`${mode === "dark" ? "bg-gray-500" : "bg-blue-500"}`}>
                    <h1 className="text-center font-bold text-2xl py-3 text-white">Login</h1>
                </div>
                <form className="m-7">
                    {isError && <Alert sx={{mb:2}} variant={mode === "dark" ? "outlined" : "standard"} severity="error">{error?.message}</Alert>}
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        placeholder="enter your email"
                        sx={{mb: 3}}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor={`${outlinedPasswordId}-input`}>Password</InputLabel>
                            <OutlinedInput
                                id={`${outlinedPasswordId}-input`}
                                type={showPassword ? "text" : "password"}
                                placeholder="enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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

                    <div className="max-w-80 m-auto">
                        <ButtonGroup fullWidth sx={{mt: 3}}>
                            <Button type="submit" color="primary" variant="outlined" onClick={handleLogin}>
                                <Typography>login</Typography>
                            </Button>
                            <Button type="button" color="error" variant="outlined" onClick={handleReset}>
                                <Typography>Reset</Typography>
                            </Button>
                        </ButtonGroup>
                    </div>

                    <div className="text-center mt-2">
                        <small className="text-mauve-500">Don't you have an account ? <a className="text-blue-400 cursor-pointer underline" onClick={() => navigate('/register')}>register</a></small>
                    </div>
                </form>
            </div>
        </div>
    )
}