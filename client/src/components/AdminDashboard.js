import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const AdminDashboard = () => {
    return (
        <Container sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ p: 5, textAlign: 'center', bgcolor: '#e3f2fd' }}>
                <Typography variant="h3" color="primary" gutterBottom>
                    Admin Dashboard
                </Typography>
                <Typography variant="h6">
                    Experiment 3 Success: Restricted Access Granted.
                </Typography>
                <Box sx={{ mt: 3, p: 2, border: '1px dashed grey' }}>
                    <p>Only users with the <b>"admin"</b> role can see this page.</p>
                </Box>
            </Paper>
        </Container>
    );
};

export default AdminDashboard;