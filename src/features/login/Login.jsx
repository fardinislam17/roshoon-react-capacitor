import React, { useState, useRef, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Divider,
} from '@mui/material';
import { LoginOptions } from 'src/app/constants';
import { useTranslation } from 'react-i18next';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
// import FacebookLogin from 'react-facebook-login';
import { useSignInWithEmailAndPasswordLazyQuery } from 'src/features/roshoon/roshoonApi';
import { useGoogleLogin } from '@react-oauth/google';
import { notifyError, notifySuccess } from '../snackbarProvider/useSnackbar';
import { useDispatch } from 'react-redux';
import { setUser } from 'src/features/session/sessionSlice';

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const facebookButtonRef = useRef(null);

  const [signIn] = useSignInWithEmailAndPasswordLazyQuery();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const { access_token } = tokenResponse;
    },
    onError: (error) => console.log(error),
  });

  const loginWithFacebook = (response) => {
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          console.log('Logged in:', response);
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      },
      { scope: 'public_profile,email' }
    );
  };

  // Handle opening and closing of the login dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setOpen(false);
  };

  // Handle email and password login
  const handleLoginWithEmailAndPassword = async () => {
    // Perform email and password login
    try {
      const response = await signIn({ email, password });
      if (response.data.user) {
        dispatch(setUser({ ...response.data.user, loggedIn: true }));
      }
      if (response.data.message) {
        notifySuccess(response.data.message);
      }
      handleClose();
    } catch (error) {
      notifyError(error.message);
    }
  };

  const handleRegistration = () => {
    console.log('register here');
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        {t('common.login')}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '420px',
            },
          },
        }}
      >
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleRegistration}
              sx={{ mb: 2 }}
            >
              {t('common.signUp')}
            </Button>
            {LoginOptions.includes('googleLogin') && (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<GoogleIcon />}
                fullWidth
                onClick={loginWithGoogle}
                sx={{ mb: 2, justifyContent: 'center' }}
              >
                Continue with Google
              </Button>
            )}
            {/* {LoginOptions.includes('facebookLogin') && (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<FacebookIcon />}
                  fullWidth
                  onClick={loginWithFacebook}
                  sx={{ mb: 2, justifyContent: 'center' }}
                >
                  Continue with Facebook
                </Button>
                <div
                  style={{
                    position: 'absolute',
                    opacity: 0,
                    pointerEvents: 'none',
                  }}
                >
                  <FacebookLogin
                    appId={import.meta.env.VITE_FACEBOOK_APP_ID}
                    callback={loginWithFacebook}
                    scope="public_profile"
                    ref={facebookButtonRef}
                  />
                </div>
              </>
            )} */}
            <Divider flexItem sx={{ width: '100%', marginTop: '20px' }} />
            <DialogTitle>{t('common.loginWithEmailAndPassword')}</DialogTitle>

            <TextField
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
          </Box>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleLoginWithEmailAndPassword}
              color="primary"
              variant="contained"
            >
              Login
            </Button>
          </DialogActions>
        </DialogContent>

        <Button color="secondary" onClick={() => setOpen(false)}>
          {t('common.continueAsGuest')}
        </Button>
      </Dialog>
    </div>
  );
};

export default Login;
