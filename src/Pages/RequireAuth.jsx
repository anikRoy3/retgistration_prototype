import React, { useContext } from 'react'
import { contextProvider } from '../Context/Provider'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';

const RequireAuth = ({ children }) => {
    const { email, loading } = useContext(contextProvider);

    const location = useLocation();
    if (location.pathname === '/checkout') location.cartUrl = '/cart'
    if (loading) return <Loading />

    if (!email) {
        return <Navigate to={'/login'} state={{ from: location }} replace />
    }
    return children;
}

export default RequireAuth;
