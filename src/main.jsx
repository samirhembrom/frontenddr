import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, RouterProvider, createBrowserRouter, createRoutesFromElements, Routes, Route } from 'react-router-dom';

import './index.css';
import Home from './pages/Home.jsx';
import Doctors, { loader as doctorsLoader } from './pages/Doctors/Doctors.jsx';
import DoctorsDetail, { loader as doctorsDetailsLoader } from './pages/Doctors/DoctorsDetail.jsx';
import Layout from './components/Layout.jsx';
import Dashboard from './pages/Host/Dashboard.jsx';
import Consultations from './pages/Host/Consultations.jsx';
import HostLayout from './components/HostLayout.jsx';
import NotFound from './pages/NotFound.jsx';
import Error from './pages/Error.jsx';
import Login, { loader as loginLoader, action as loginAction } from './pages/Login.jsx';
import { requireAuth } from './utils.js';
import { AuthProvider } from './AuthContext.jsx';
import Register, { loader as registerLoader, action as registerAction } from './pages/Register.jsx';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path='doctors' element={<Doctors />} errorElement={<Error />} loader={doctorsLoader} />
    <Route
      path='doctors/:id'
      element={<DoctorsDetail />}
      loader={doctorsDetailsLoader} />
    <Route path='host' element={<HostLayout />} >
      <Route
        index
        element={<Dashboard />}
        loader={async ({ request }) => await requireAuth(request)} />
      <Route
        path='consultations'
        element={<Consultations />}
        loader={async ({ request }) => await requireAuth(request)} />
    </Route>
    <Route path='login' element={<Login />} loader={loginLoader} action={loginAction} />
    <Route path='register' element={<Register />} loader={registerLoader} action={registerAction} />

    <Route path='*' element={<NotFound />} />
  </Route>

))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
