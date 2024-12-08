import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import {
  Button,
  Container,
  Divider,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import React, { useRef, useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPasswordLazyQuery } from 'src/apis/roshoonApi';
import {
  DEFAULT_ERROR_MESSAGE,
  LOGIN_FIELDS,
  LOGIN_METHODS,
} from 'src/app/constants';
import { CustomForm } from 'src/components/Forms';
import { homepage, register } from 'src/paths';
import { notifyError, notifySuccess } from '../snackbarProvider/useSnackbar';

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
      <Container component="main" maxWidth="xs" className="py-20 ">
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            className="py-5"
            variant="h5"
            component="h1"
            sx={{ mb: 2 }}
          >
            {t('Please Log In')}
          </Typography>

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
          <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
            {t('common.loginWithEmailAndPassword')}
          </Typography>
          <CustomForm
            fields={LOGIN_FIELDS}
            handleSubmit={handleLoginWithEmailAndPassword}
            handleCancel={handleClose}
          />
          <Button color="secondary" onClick={() => setOpen(false)}>
            {t('common.continueAsGuest')}
          </Button>
          {isFetching && <LinearProgress />}
        </Paper>
      </Container>
    </>
  );
};

export default Login;
