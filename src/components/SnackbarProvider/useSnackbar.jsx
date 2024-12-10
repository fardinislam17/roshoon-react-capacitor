import { closeSnackbar as close, enqueueSnackbar as enque } from 'notistack';

const DEFAULT_SNACKBAR_OPTIONS = {
  autoHideDuration: 3000,
  preventDuplicate: true,
  presist: false,
};

const closeSnackbar = (key) => {
  close(key);
};

const enqueueSnackbar = (message, options) => {
  const notificatioOptions = { ...DEFAULT_SNACKBAR_OPTIONS, ...options };
  return enque(message, notificatioOptions);
};

const notifyError = (message, options) => {
  return enqueueSnackbar(message, { ...options, variant: 'error' });
};

const notifyInfo = (message, options) => {
  return enqueueSnackbar(message, { ...options, variant: 'info' });
};

const notifyWarning = (message, options) => {
  return enqueueSnackbar(message, { ...options, variant: 'warning' });
};

const notifySuccess = (message, options) => {
  return enqueueSnackbar(message, { ...options, variant: 'success' });
};

const snackbarFunctions = {
  enqueueSnackbar,
  closeSnackbar,
  notifyError,
  notifyInfo,
  notifyWarning,
  notifySuccess,
};

const useSnackbar = () => snackbarFunctions;

export {
  enqueueSnackbar,
  closeSnackbar,
  notifyError,
  notifyInfo,
  notifyWarning,
  notifySuccess,
};

export default useSnackbar;
