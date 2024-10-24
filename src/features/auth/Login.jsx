import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setAuthenticationType, login, loginFailed } from '../session';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Divider,
} from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import FacebookLogin from 'react-facebook-login';
import { useSelector } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import { LoginOptions } from 'src/app/constants';
import { useTranslation } from 'react-i18next';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';


const Login = () => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  // state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const facebookButtonRef = useRef(null);

  // function
  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = { user: { name: username }, type: 'user' }; // Mock response
      dispatch(setUser(response.user));
      dispatch(setAuthenticationType(response.type));
      dispatch(login(response));
    } catch (err) {
      setError('Login failed. Please try again.');
      dispatch(loginFailed(err.message));
    }
  }

  function googleAuthenticationProcess(response) {
    const token = response.credential;
    const decoded = jwtDecode(token);
    authorizeUserLogin('google', decoded);
  }
  
  const handleFacebookCallback = (response) => {
    if (response?.status === 'unknown') {
      console.error('Sorry!', 'Something went wrong with facebook Login.');
      return;
    }
    console.log(response);
    
    
    if(response?.error){
      console.error('Sorry!', 'Something went wrong with facebook Login.');
      return;
    }
    
    
    authorizeUserLogin('facebook', response);
    
    // console will print following object for you.
    /* {
          "name": "Syed M Ahmad",
          "email": "ssgcommando90@yahoo.com",
          "picture": {
              "data": {
                  "height": 50,
                  "is_silhouette": false,
                  "url": "...jpg",
                  "width": 50
              }
          },
          "id": "7138203302951151",
          "userID": "7138203302951151",
          "expiresIn": 7142,
          "accessToken": "EAA....Q",
          "graphDomain": "facebook",
          "data_access_expiration_time": 1719914458
      } */
  };
  
  function errorMessage(error) {
    console.log(error);
  }

  async function authorizeUserLogin(type, data) {
    //TODO:take login data and checks if user is authorized within our db
    dispatch(setAuthenticationType(type));
    console.log(type, data);

    if (type === 'google') {
      dispatch(login(data));
    }else if(type === 'facebook'){
      data.picture = data.picture.data.url;
      dispatch(login(data));
    }
    

    try {
        const uid = type === 'google' ? data?.sub : data?.id;
      
      const response = await axios.get('/v1/auth/login', {
        params: {
          apiId: uid, 
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
    }
  }

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const { access_token } = tokenResponse;
      console.log({ access_token });
      // call backend with success token
    },
    onError: (error) => console.log(error),
  });

  const triggerFacebookLogin = () => {
    if (facebookButtonRef.current) {
      facebookButtonRef.current.click();
    }
  };

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
    setOpen(false);
  };


  const handleRegistration = () => {
    console.log('register here');
  };
  
  
  return (
    <>
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
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt={2}
            >
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
              {LoginOptions.includes('facebookLogin') && (
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
          </DialogContent>

          <Button color="secondary" onClick={() => setOpen(false)}>
            {t('common.continueAsGuest')}
          </Button>

          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleLogin} color="primary" variant="contained">
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Login;
