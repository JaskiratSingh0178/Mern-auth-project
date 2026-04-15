import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roleRequired }) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    // 1. Check if logged in
    if (!token) {
        return <Navigate to="/" />;
    }

    // 2. Check if role matches (Experiment 3 RBAC)
    if (roleRequired && user?.role !== roleRequired) {
        return (
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <h1 style={{ fontSize: '3rem' }}>Access Denied</h1>
                <p>You do not have permission to view this page.</p>
                <a href="/" style={{ color: 'blue' }}>Back to Login</a>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;