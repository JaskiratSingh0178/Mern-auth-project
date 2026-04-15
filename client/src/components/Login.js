import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Container, Alert, CircularProgress } from '@mui/material';
import axios from 'axios'; // This was missing!

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false); // Defines setLoading
    const [message, setMessage] = useState({ type: '', text: '' }); // Defines setMessage

    const onSubmit = async (data) => {
        setLoading(true);
        setMessage({ type: '', text: '' });
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', data);
            
            // Experiment 2 & 3: Save data for the Guard to check
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user)); 

            setMessage({ type: 'success', text: 'Login Successful!' });
            // Refresh to update UI/Redirect
            setTimeout(() => { window.location.href = '/admin'; }, 1000);
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Login Failed' });
        }
        setLoading(false);
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, p: 4, border: '1px solid #ddd', borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>Login</Typography>
                {message.text && <Alert severity={message.type} sx={{ mb: 2 }}>{message.text}</Alert>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        label="Email"
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
                        {...register("password", { required: "Password is required" })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button 
                        type="submit" 
                        fullWidth 
                        variant="contained" 
                        sx={{ mt: 3 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Sign In"}
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;