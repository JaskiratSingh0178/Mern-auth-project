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
            // UPDATED: Points to your live Render Backend
            await axios.post('https://mern-auth-project-hv8z.onrender.com/api/auth/register', data);
            
            setMessage({ type: 'success', text: 'Registration Successful! Redirecting to login...' });
            
            // Move to login page after 2 seconds
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            // Displays specific error from backend or a generic message
            setMessage({ 
                type: 'error', 
                text: err.response?.data?.message || err.response?.data?.error || 'Registration failed' 
            });
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

                    {/* Role selection for Experiment 3: Role-Based Access Control */}
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
