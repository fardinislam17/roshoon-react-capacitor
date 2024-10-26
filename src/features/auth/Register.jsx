import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { CustomForm } from 'src/components/Forms';
import { REGISTRATION_FIELDS } from 'src/app/constants';
import { useRegisterLazyQuery } from 'src/features/roshoon/roshoonApi';
import { useDispatch } from 'react-redux';
import { setUser } from 'src/features/session/sessionSlice';
import { useNavigate } from 'react-router-dom';
import {
  notifyError,
  notifySuccess,
} from 'src/features/snackbarProvider/useSnackbar';

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterLazyQuery();

  const handleRegistration = async ({ email, password, fullName: name }) => {
    try {
      const response = await register({ email, password, name });
      if (response.isSuccess) {
        if (response.data.user) {
          dispatch(setUser({ ...response.data.user, loggedIn: true }));
        }
        notifySuccess(response.data.message);
        navigate('/homepage');
      } else {
        notifyError(response.error?.data?.message);
      }
    } catch (error) {
      notifyError(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
          Create an Account
        </Typography>
        <CustomForm
          fields={REGISTRATION_FIELDS}
          handleClick={handleRegistration}
        />
      </Paper>

      <Backdrop
        open={isLoading}
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default RegistrationPage;
