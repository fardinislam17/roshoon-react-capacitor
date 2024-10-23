// CustomSnackbarProvider.js
import React, { useMemo } from 'react';
import {
  SnackbarProvider as CustomSnackbarProvider,
  useSnackbar,
} from 'notistack';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material';
import { red, blue, orange, green } from '@mui/material/colors';
import {
  CheckCircleOutline,
  InfoOutlined,
  ReportProblemOutlined,
  CancelOutlined,
} from '@mui/icons-material';

const StyledSnackbarProvider = styled(CustomSnackbarProvider)(({ theme }) => ({
  fontWeight: 500,
  lineHeight: theme.spacing(2),
  letterSpacing: 1,

  '&.notistack-MuiContent-error': {
    backgroundColor: red[50],
    color: red[500],
  },
  '&.notistack-MuiContent-info': {
    backgroundColor: blue[50],
    color: theme.palette.common.black,
  },
  '&.notistack-MuiContent-warning': {
    backgroundColor: orange[50],
    color: theme.palette.warning.main,
  },
  '&.notistack-MuiContent-success': {
    backgroundColor: green[50],
    color: theme.palette.success.main,
  },
}));

const ErrorIcon = styled(CancelOutlined)(({ theme }) => ({
  fontSize: theme.spacing(3),
  margin: '4px 16px 4px 0',
}));

const WarningIcon = styled(ReportProblemOutlined)(({ theme }) => ({
  fontSize: theme.spacing(3),
  margin: '4px 16px 4px 0',
}));

const SuccessIcon = styled(CheckCircleOutline)(({ theme }) => ({
  fontSize: theme.spacing(3),
  margin: '4px 16px 4px 0',
}));

const InfoIcon = styled(InfoOutlined)(({ theme }) => ({
  fontSize: theme.spacing(3),
  margin: '4px 16px 4px 0',
}));

const CloseButton = ({ snackbarKey }) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
      <CloseIcon />
    </IconButton>
  );
};

const snackbarAction = (key) => <CloseButton snackbarKey={key} />;

const SnackbarProvider = ({ children }) => {
  const icons = useMemo(
    () => ({
      success: <SuccessIcon />,
      error: <ErrorIcon />,
      warning: <WarningIcon />,
      info: <InfoIcon />,
    }),
    []
  );

  return (
    <StyledSnackbarProvider
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      maxSnack={3}
      preventDuplicate
      iconVariant={icons}
      action={snackbarAction}
    >
      {children}
    </StyledSnackbarProvider>
  );
};

export default SnackbarProvider;
