import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import loginImage from 'src/assets/images/login.png';
import roshoon from 'src/assets/images/roshoon.png';
import { Button, Divider, LinearProgress, Typography } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import React, { useRef } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import {
  useLoginWithGoogleMutation,
  useLoginWithFacebookMutation,
  useSignInWithEmailAndPasswordLazyQuery,
} from 'src/apis/roshoonApi';
import {
  DEFAULT_ERROR_MESSAGE,
  LOGIN_FIELDS,
  LOGIN_METHODS,
} from 'src/app/constants';
import { CustomForm } from 'src/components/Forms';
import { homepagePath, registerPath } from 'src/paths';
import {
  notifyError,
  notifySuccess,
} from 'src/components/SnackbarProvider/useSnackbar';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const facebookButtonRef = useRef(null);
  const [signIn, { isFetching }] = useSignInWithEmailAndPasswordLazyQuery();
  const [googleLogin] = useLoginWithGoogleMutation();
  const [facebookLogin] = useLoginWithFacebookMutation();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const access_token = tokenResponse.access_token;
        const response = await googleLogin({ access_token });
        notifySuccess(response.data.message);
        navigate(homepagePath);
      } catch (error) {
        notifyError(error.message || DEFAULT_ERROR_MESSAGE);
      }
    },
    onError: (error) => console.log(error),
  });

  const loginWithFacebook = (_) => {
    window.FB.login(
      function (loginresponse) {
        console.log({ loginresponse });
        facebookLogin({
          access_token: 'dummy#$$%^&*()ghtoken',
        }).then((res) => {
          notifySuccess(res.data?.message);
          navigate(homepagePath);
        });
        // if (response.authResponse) {
        //   console.log('Logged in:', response);
        // } else {
        //   console.log('User cancelled login or did not fully authorize.');
        // }
      },
      { scope: 'public_profile' }
    );
  };

  const handleLoginWithEmailAndPassword = async ({ email, password }) => {
    try {
      const response = await signIn({ email, password });
      if (response.isSuccess) {
        notifySuccess(response.data.message);

        navigate(homepagePath);
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

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full mb-10 lg:mb-0">
        <div className="h-full">
          <img
            className="lg:flex hidden h-full object-cover"
            src={loginImage}
            alt=""
          />
        </div>
        <img className="lg:hidden flex w-3/4 mx-auto" src={roshoon} alt="" />
        <div className="py-0  lg:py-24 mx-auto px-8 w-full lg:w-1/2  2xl:w-[35%]">
          <Typography
            fontSize={34}
            fontFamily={'lato'}
            fontWeight={700}
            align="center"
            sx={{ mb: 5 }}
          >
            {t('common.logIn')}
          </Typography>

          {LOGIN_METHODS.includes('googleLogin') && (
            <Button
              color="secondary"
              startIcon={<GoogleIcon />}
              fullWidth
              onClick={loginWithGoogle}
              sx={{
                mb: 3,
                p: 1.5,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 0,
                fontSize: 18,
                fontFamily: 'lato',
                textTransform: 'none',
                border: '1px solid #3C4242',
              }}
            >
              Login with Google
            </Button>
          )}
          {LOGIN_METHODS.includes('facebookLogin') && (
            <>
              <Button
                color="info"
                startIcon={<FacebookIcon />}
                fullWidth
                fontSize="18"
                onClick={loginWithFacebook}
                sx={{
                  mb: 2,
                  p: 1.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 0,
                  fontSize: 18,
                  fontFamily: 'lato',
                  textTransform: 'none',
                  border: '1px solid #3C4242',
                }}
              >
                Login with Facebook
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
          <Divider
            className="text-lg text-[#666666] font-sans"
            sx={{
              '&.MuiDivider-root': {
                '&::before': {
                  border: `1px solid #66666640`,
                },
                '&::after': {
                  border: `1px solid #66666640`,
                },
                marginBottom: 1,
              },
            }}
          >
            OR
          </Divider>
          <CustomForm
            fields={LOGIN_FIELDS}
            handleSubmit={handleLoginWithEmailAndPassword}
          />
          <h3 className="flex justify-center items-center gap-1 font-lato  text-[#3C4242]">
            {t('login.doNotHaveAnAccount')}?{' '}
            <Link to={registerPath} className="underline underline-offset-4">
              {t('common.signUp')}
            </Link>
          </h3>
        </div>
        {isFetching && <LinearProgress />}
      </div>
    </>
  );
};

export default Login;
