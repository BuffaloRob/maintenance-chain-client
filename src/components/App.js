import React from 'react';
import { Routes, Route } from 'react-router';
import Container from '@mui/material/Container';

import Home from './Home/Home';
import SignUp from './SignUp';
import Login from './Login';
import MaintenanceContainer from './MaintenanceContainer';
import HeaderContainer from './header/HeaderContainer';

const App = () => (
  <Container maxWidth='md'>
    <HeaderContainer />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      {/* Everything else is handled (and auth-gated) by MaintenanceContainer */}
      <Route path="/*" element={<MaintenanceContainer />} />
    </Routes>
  </Container>
);

export default App;
