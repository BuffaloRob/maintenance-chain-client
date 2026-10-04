import React from 'react';
import { Routes, Route } from 'react-router';
import Container from '@mui/material/Container';

import Home from './Home/Home';
import SignUp from './SignUp';
import Login from './Login';
import VerifyEmail from './VerifyEmail';
import VerifyEmailBanner from './VerifyEmailBanner';
import MaintenanceContainer from './MaintenanceContainer';
import HeaderContainer from './header/HeaderContainer';

const App = () => (
  // lg leaves room for the sidebar that pages add on wide screens
  <Container maxWidth='lg'>
    <HeaderContainer />
    <VerifyEmailBanner />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      {/* Everything else is handled (and auth-gated) by MaintenanceContainer */}
      <Route path="/*" element={<MaintenanceContainer />} />
    </Routes>
  </Container>
);

export default App;
