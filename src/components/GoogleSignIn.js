import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { useGoogleLoginMutation } from '../store/api/maintenanceApi';
import { errorMessage } from '../store/api/errorMessage';

// The OAuth client ID of the app's Google Cloud project, the same as the API's
// GOOGLE_CLIENT_ID. Without it there's no Google button.
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Google Identity Services, loaded and initialized once, on first use. It
// hands the ID token of whoever signs in to the button that's showing.
let onCredential = () => {};
let loading;
const loadGoogle = () => {
  loading ??= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: response => onCredential(response.credential),
      });
      resolve(window.google.accounts.id);
    };
    script.onerror = () => {
      // Try again the next time a button shows
      script.remove();
      loading = undefined;
      reject(new Error("Couldn't load Google sign-in"));
    };
    document.head.appendChild(script);
  });
  return loading;
};

// Google's "Sign in with Google" button (`text` 'signup_with' makes it "Sign up
// with Google"). The API logs in, links or signs up the Google account's user.
const GoogleSignIn = ({ text = 'signin_with' }) => {
  const navigate = useNavigate();
  const [googleLogin] = useGoogleLoginMutation();
  const button = useRef(null);
  const pending = useRef(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!CLIENT_ID) return;
    let cancelled = false;
    loadGoogle().then(
      google => {
        if (!cancelled) google.renderButton(button.current, { theme: 'outline', size: 'large', text });
      },
      () => {
        if (!cancelled) setError("Couldn't load Google sign-in. Check your connection and reload the page.");
      }
    );
    return () => { cancelled = true; };
  }, [text]);

  useEffect(() => {
    const handle = async credential => {
      // Signing in again before the API answers would only send a second request
      if (pending.current) return;
      pending.current = true;
      setError(null);
      try {
        await googleLogin(credential).unwrap();
        navigate('/');
      } catch (err) {
        setError(errorMessage(err));
      } finally {
        pending.current = false;
      }
    };
    onCredential = handle;
    return () => {
      if (onCredential === handle) onCredential = () => {};
    };
  }, [googleLogin, navigate]);

  if (!CLIENT_ID) return null;
  // Full width, so it goes below the form rather than beside it
  return (
    <Box sx={{ width: '100%', mb: 5 }}>
      <Box sx={{ maxWidth: 400, mx: 'auto' }}>
        <Divider sx={{ mb: 3 }}>or</Divider>
        <Box ref={button} sx={{ display: 'flex', justifyContent: 'center', minHeight: 44 }} />
        {error && <Typography color="error" align="center" role="alert" sx={{ mt: 2 }}>{error}</Typography>}
      </Box>
    </Box>
  );
};

export default GoogleSignIn;
