import React, { useState } from 'react';
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

const Login = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle opening and closing of the login dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle email and password login
  const handleLogin = () => {
    // Perform email and password login
    console.log('Email:', email);
    console.log('Password:', password);
    handleClose();
  };

  const handleRegistration = () => {
    console.log('register here');
  };

  const handleGoogleLogin = () => {
    // Add Google login logic here
    console.log('Continue with Google');
  };

  const handleFacebookLogin = () => {
    // Add Facebook login logic here
    console.log('Continue with Facebook');
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
                onClick={handleGoogleLogin}
                sx={{ mb: 2 }}
              >
                Continue with Google
              </Button>
            )}
            {LoginOptions.includes('facebookLogin') && (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<FacebookIcon />}
                fullWidth
                onClick={handleFacebookLogin}
                sx={{ mb: 2 }}
              >
                Continue with Facebook
              </Button>
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
  );
};

export default Login;
