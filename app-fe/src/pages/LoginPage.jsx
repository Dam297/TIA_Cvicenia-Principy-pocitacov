import HeaderBig from "../components/HeaderBig";
import { useNavigate } from "react-router-dom";
import { login } from '../services/authService';
import { useState } from "react";
import { Box, Paper, TextField, Button, Typography, Stack } from "@mui/material";

function LoginPage({ setAuthStatus, setError }) {
    const header = "Vitajte na cvičeniach z predmetu Princípy počítačov";
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const submit = (e) => {
        e.preventDefault();

        if (username === '' || password === '') {
            setError('Zadajte správny login a heslo');
            return;
        }

        login(username, password)
            .then(() => {
                setAuthStatus(true);
                setError('');
                navigate("/home");
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message || "Chyba pri prihlasovaní");
                return;
            });

        // reset error message if the form is valid
        setError('');
    }

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
            }}
        >
                       <Paper
                elevation={4}
                sx={{
                    padding: 4,
                    width: 360,
                    borderRadius: 3,
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    {header}
                </Typography>

                <form onSubmit={submit}>
                    <Stack spacing={2}>
                        <TextField
                            label="Login"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                        />

                        <TextField
                            label="Heslo"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                        >
                            Prihlásiť sa
                        </Button>
                        </Stack>
                        </form>
                </Paper> 
        </Box>
    )
    
}

export default LoginPage