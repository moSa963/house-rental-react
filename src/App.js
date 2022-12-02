import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from './screens/ProtectedRoute';
import AppLayout from './screens/AppLayout';
import CreateHouse from './screens/CreateHouse';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Register from './screens/Register';
import Reservation from './screens/Reservation';
import ShowContract from './screens/ShowContract';
import ShowHouse from './screens/ShowHouse';
import UpdateHouse from './screens/UpdateHouse';
import HousesListScreen from "./screens/HousesListScreen";
import { AuthStatus, useAuth } from './contexts/AuthContext';
import LoadingScreen from './screens/LoadingScreen';
import ErrorScreen from './screens/ErrorScreen';
import { useScroll } from './contexts/ScrollContext';

const App = () => {
    const { auth } = useAuth();
    const location = useLocation();
    const { scrollTo } = useScroll();

    React.useEffect(() => {
        scrollTo(0, 0);
    }, [location.pathname, scrollTo]);

    if (auth.status === AuthStatus.WAITING) return <LoadingScreen />

    return (
        <Routes>
            <Route element={<AppLayout src="back.jpg" />}>
                <Route index element={<Home />} />
                <Route path="profile" element={<ProtectedRoute Element={Profile} />} />
                <Route path="contract/:id" element={<ProtectedRoute Element={ShowContract} />}/>
                <Route path="login" element={<ProtectedRoute guest Element={Register} />} />
                <Route path="house">
                    <Route index element={<ProtectedRoute Element={CreateHouse}/>} />
                    <Route path=":id" element={<ShowHouse />} />
                    <Route path=":id/reservation" element={<ProtectedRoute Element={Reservation} />} />
                    <Route path=":id/update" element={ <ProtectedRoute  Element={UpdateHouse} /> }/>
                    <Route path="list" element={<HousesListScreen />} />
                </Route>
                <Route path='error' element={<ErrorScreen />}/>
            </Route>
        </Routes>
    );
}

export default App;
