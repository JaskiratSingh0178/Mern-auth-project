import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Container, MenuItem, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState({ type: '', text: '' });
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            // Sends data to your Node.js backend
            await axios.post('http://localhost:5000/api/auth/register', data);
            setMessage({ type: 'success', text: 'Registration Successful! Redirecting to login...' });
            
            // Move to login page after 2 seconds
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.error || 'Registration failed' });
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, p: 4, border: '1px solid #ddd', borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="h4" align="center" gutterBottom>Register</Typography>
                
                {message.text && <Alert severity={message.type} sx={{ mb: 2 }}>{message.text}</Alert>}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        label="Username"
                        margin="normal"
                        {...register("username", { required: "Username is required" })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                    <TextField
                        fullWidth
                        label="Email Address"
                        margin="normal"
                        {...register("email", { required: "Email is required" })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        {...register("password", { 
                            required: "Password is required", 
                            minLength: { value: 6, message: "Must be at least 6 characters" } 
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    {/* IMPORTANT: Role selection for Experiment 3 (RBAC) */}
                    <TextField
                        select
                        fullWidth
                        label="Select Role"
                        margin="normal"
                        defaultValue="user"
                        {...register("role")}
                    >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </TextField>

                    <Button 
                        type="submit" 
                        fullWidth 
                        variant="contained" 
                        color="primary" 
                        sx={{ mt: 3 }}
                    >
                        Create Account
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Register;