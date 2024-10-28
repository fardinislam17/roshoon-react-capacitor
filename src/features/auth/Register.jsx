import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { CustomForm } from 'src/components/Forms';
import { REGISTRATION_FIELDS } from 'src/app/constants';
import { useRegisterLazyQuery } from 'src/apis/roshoonApi';
import { useDispatch } from 'react-redux';
import { getCurrentUser, setUser } from 'src/slices/sessionSlice';
import { useNavigate } from 'react-router-dom';
import * as paths from 'src/paths';
import {
  notifyError,
  notifySuccess,
} from 'src/features/snackbarProvider/useSnackbar';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const RegistrationPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterLazyQuery();
  const currentUser = useSelector(getCurrentUser);

  const handleRegistration = async ({
    email,
    password,
    fullName: name,
    phone,
  }) => {
    try {
      const response = await register({ email, password, name, phone });
      if (response.isSuccess) {
        notifySuccess(response.data.message);
        navigate(paths.homepage);
      } else {
        notifyError(response.error?.data?.message);
      }
    } catch (error) {
      notifyError(error.message);
    }
  };

  useEffect(() => {
    if (currentUser?.loggedIn) {
      navigate(paths.homepage);
    }
  }, [currentUser, navigate]);

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
          {t('common.createAnAccount')}
        </Typography>
        <CustomForm
          fields={REGISTRATION_FIELDS}
          handleSubmit={handleRegistration}
          handleCancel={() => navigate('/homepage')}
        />
      </Paper>

      <Backdrop
        open={isLoading}
        sx={{
          color: (theme) => theme.palette.grey[700],
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default RegistrationPage;
