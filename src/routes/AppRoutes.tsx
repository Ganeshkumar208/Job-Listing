import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import JobDetail from '../pages/JobDetail';
import Login from '../pages/Login';

const AppRoutes = () => {
    const token = localStorage.getItem('token');
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={token ? <Home /> : <Navigate to="/" />} />
            <Route path="/job/:id" element={token ? <JobDetail /> : <Navigate to="/" />} />
        </Routes>
    )

};

export default AppRoutes;
