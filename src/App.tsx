import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store/store';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Classes from './pages/Classes';
import Lectures from './pages/Lectures';
import Assignments from './pages/Assignments';
import Tests from './pages/Tests';
import Settings from './pages/Settings';
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from './store/slices/authSlice';

function AppRoutes() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      dispatch(setUser({ user: JSON.parse(user), token }));
    } else {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userData = {
            id: user.uid,
            role: 'student', // Default to student, you can fetch the actual role from Firestore
            email: user.email!,
          };
          const token = await user.getIdToken();
          dispatch(setUser({ user: userData, token }));
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          dispatch(setUser(null));
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      });

      return () => unsubscribe();
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Layout />}>
        <Route element={<PrivateRoute><Outlet /></PrivateRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/lectures" element={<Lectures />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;