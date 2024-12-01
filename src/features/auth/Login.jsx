import React, { useState, useRef } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Divider,
  LinearProgress,
} from '@mui/material';
import { LOGIN_METHODS } from 'src/app/constants';
import { useTranslation } from 'react-i18next';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import FacebookLogin from 'react-facebook-login';
import { useSignInWithEmailAndPasswordLazyQuery } from 'src/apis/roshoonApi';
import { useGoogleLogin } from '@react-oauth/google';
import { notifyError, notifySuccess } from '../snackbarProvider/useSnackbar';
import { useDispatch } from 'react-redux';
import { CustomForm } from 'src/components/Forms';
import { useNavigate } from 'react-router-dom';
import { register, homepage } from 'src/paths';
import { LOGIN_FIELDS } from 'src/app/constants';
import { DEFAULT_ERROR_MESSAGE } from 'src/app/constants';

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const facebookButtonRef = useRef(null);
  const [signIn, { isFetching }] = useSignInWithEmailAndPasswordLazyQuery();

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
      { scope: 'public_profile' }
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLoginWithEmailAndPassword = async ({ email, password }) => {
    try {
      const response = await signIn({ email, password });
      if (response.isSuccess) {
        notifySuccess(response.data.message);
        handleClose();
        navigate(homepage);
      } else {
        notifyError(
          response.error?.data?.message ||
            response.error?.error ||
            DEFAULT_ERROR_MESSAGE
        );
      }
    } catch (error) {
      notifyError(error.message || DEFAULT_ERROR_MESSAGE);
    }
  };

  const handleRegistration = () => {
    handleClose();
    navigate(register);
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          textTransform: 'none',
          border: 'none',
          '&:hover': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
      >
        {t('common.logIn')}
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
            {LOGIN_METHODS.includes('googleLogin') && (
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
            {LOGIN_METHODS.includes('facebookLogin') && (
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
            )}
            <Divider flexItem sx={{ width: '100%', marginTop: '20px' }} />
            <DialogTitle>{t('common.loginWithEmailAndPassword')}</DialogTitle>
          </Box>

          <CustomForm
            fields={LOGIN_FIELDS}
            handleSubmit={handleLoginWithEmailAndPassword}
            handleCancel={handleClose}
          />
        </DialogContent>

        <Button color="secondary" onClick={() => setOpen(false)}>
          {t('common.continueAsGuest')}
        </Button>
        {isFetching && <LinearProgress />}
      </Dialog>
    </>
  );
};

export default Login;
