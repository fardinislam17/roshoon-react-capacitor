import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setAuthenticationType, login, loginFailed } from '../session';
import { Button, TextField, Container, Typography } from '@mui/material';
import { FaGoogle, FaFacebook } from 'react-icons/fa'; // Using react-icons
import { GoogleLogin } from '@react-oauth/google';




const Login = () => {
  const dispatch = useDispatch();
  // state
  const [loginType, setLoginType] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // function
  const handleLogin = async (e) => {
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
  };

  const loginUserToSession = (response) => {
    console.log(response);
    dispatch(setUser(response));
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <>
      <Container className="flex flex-col h-[100%] items-center justify-center ">
        <div className="w-100">
          {loginType === 'roshoonLogin' ? (
            <>
              <Typography variant="h4" component="h1">
                User Login
              </Typography>
              <form onSubmit={handleLogin}>
                <TextField
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Login
                </Button>
                {error && <Typography color="error">{error}</Typography>}
              </form>

              <Button onClick={() => setLoginType('')} fullWidth>
                Back
              </Button>
            </>
          ) : loginType === 'facebookLogin' ? (
            <>
              <Typography variant="h4">Login with Facebook</Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<FaFacebook />}
                onClick={() => alert('Facebook login')}
                fullWidth
                style={{
                  backgroundColor: '#4267B2',
                  color: 'white',
                  marginTop: '16px',
                }}
              >
                Login with Facebook
              </Button>
              <Button onClick={() => setLoginType('')} fullWidth>
                Back
              </Button>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center w-full max-w-md">
              <div style={{ width: '100%', marginBottom: '16px' }}>
                <GoogleLogin
                  onSuccess={loginUserToSession}
                  onError={errorMessage}
                  style={{
                    width: '100%', // Ensures Google button takes full width
                    padding: '12px', // Consistent padding
                  }}
                />
              </div>

              <Button
                variant="contained"
                startIcon={<FaFacebook />}
                fullWidth
                style={{
                  backgroundColor: '#4267B2',
                  color: 'white',
                  marginTop: '16px',
                  padding: '8px',
                }}
                onClick={() => setLoginType('facebookLogin')}
              >
                Login with Facebook
              </Button>

              <Button
                variant="contained"
                fullWidth
                style={{
                  marginTop: '16px',
                  padding: '8px',
                }}
                onClick={() => setLoginType('roshoonLogin')}
              >
                Roshoon Login
              </Button>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default Login;
