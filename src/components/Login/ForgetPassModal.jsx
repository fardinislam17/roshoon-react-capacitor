import { Box, Modal } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { FaLock } from 'react-icons/fa';
import {
  useResetPasswordRequestMutation,
  useResetPasswordVerifyMutation,
  useUpdatePasswordMutation,
} from 'src/apis';
import { notifyError, notifySuccess } from '../SnackbarProvider/useSnackbar';
const ForgetPassModal = ({
  open,
  handleModal,
  setIsUserValid,
  isUserValid,
  setOpen,
  isVerified,
  setIsVerified,
}) => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState(false);
  const [resetPasswordRequest] = useResetPasswordRequestMutation();
  const [updatePassword] = useUpdatePasswordMutation();
  const [email, setEmail] = useState('');
  const [resetPasswordVerify] = useResetPasswordVerifyMutation();
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[+]?[\d\s()-]{10,11}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleInputChange = (value) => {
    const email = value;
    const isValid = validateEmail(email) || validatePhoneNumber(email);
    setErrors(!isValid);
  };
  const handleReset = async (e) => {
    e.preventDefault();
    const identifier = e.target.email.value;
    const response = await resetPasswordRequest({ identifier });
    if (response?.data?.success) {
      setEmail(identifier);
      setIsUserValid(!isUserValid);
    } else if (response?.error) {
      notifyError(response?.error?.data?.message);
    } else {
      notifyError(t('common.somethingWentWrong'));
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otp = e.target.code.value;
    const response = await resetPasswordVerify({
      identifier: email,
      otp,
    });
    if (response?.data) {
      localStorage.setItem('access_token', response.data.accessToken);
      setIsVerified(true);
    } else if (response.error) {
      notifyError(response?.error?.data?.message);
    } else {
      notifyError(t('common.somethingWentWrong'));
    }
  };
  const handleAutoFill = (value) => {
    handleInputChange(value);
  };
  const handleNewCode = async () => {
    const response = await resetPasswordRequest({ identifier: email });

    if (response?.data?.message) {
      notifySuccess(response.data.message);
    } else if (response?.error) {
      notifyError(response?.error?.data?.message);
    } else {
      notifyError(t('errors.somethingWentWrong'));
    }
  };

  const handleNewPass = async (e) => {
    e.preventDefault();
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;
    const resetToken = localStorage.getItem('access_token');
    if (newPassword === confirmPassword) {
      const response = await updatePassword({
        newPassword,
        confirmPassword,
        resetToken,
      });
      if (response.data.success) {
        notifySuccess(t('common.PasswordResetDone'));
        localStorage.removeItem('access_token');
        setOpen(!open);
        setIsVerified(!isVerified);
        setIsUserValid(null);
      } else if (response.error) {
        notifyError(t('errors.sessionExpired'));
      }
    } else {
      notifyError(t('errors.PassNotMatched'));
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 420,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button
            onClick={handleModal}
            className="absolute bg-greenDark right-0 top-0 text-white font-lato text-lg py-1 px-2"
          >
            <CloseIcon />
          </button>
          {isUserValid ? (
            <div>
              <h3 className="font-bold text-xl text-center font-roboto">
                {t('common.resetYourPassword')}
              </h3>
              <p className="text-gray-600 text-center font-serif my-5">
                {t('common.verifyCodeMessage')}
              </p>
              <form onSubmit={handleVerify}>
                <div className="flex mt-1 ">
                  <input
                    type="text"
                    required
                    name="email"
                    className="w-full h-14 text-lg px-4 py-2 border border-r-0 rounded-l-md text-black"
                    value={email}
                    disabled
                  />
                  <span className="flex items-center bg-[#EFEFEF4D] px-3 pointer-events-none h-14 border-l-0 rounded-r-md border">
                    <EmailIcon className="text-grayNeutral" />
                  </span>
                </div>
                <div className="flex my-5 ">
                  <input
                    type="text"
                    required
                    name="code"
                    className="w-full h-14 text-lg px-4 py-2 border border-r-0 rounded-l-md text-black"
                  />
                  <span className="flex items-center px-3 pointer-events-none h-14 border-l-0 rounded-r-md border">
                    {isVerified ? (
                      <DoneIcon className="text-green-800" />
                    ) : (
                      <KeyIcon className="text-grayNeutral" />
                    )}
                  </span>
                </div>
                <div className="flex gap-1">
                  <button
                    type="submit"
                    disabled={isVerified}
                    className={`bg-greenDark ${isVerified ? 'opacity-65' : ''} text-white rounded-sm font-lato text-lg py-1 w-full`}
                  >
                    {t('common.verifyCode')}
                  </button>
                  <button
                    type="button"
                    disabled={isVerified}
                    onClick={handleNewCode}
                    className={`bg-greenDark ${isVerified ? 'opacity-65' : ''} text-white rounded-sm font-lato text-lg py-1 w-full`}
                  >
                    {t('common.sendNewCode')}
                  </button>
                </div>
              </form>
              <form onSubmit={handleNewPass}>
                {isVerified && (
                  <>
                    <div className="flex my-5">
                      <input
                        type="pass"
                        required
                        name="newPassword"
                        className="w-full h-14 text-lg px-4 py-2 border border-r-0 rounded-l-md text-black"
                        placeholder="New Password"
                      />
                      <span className="flex items-center  px-3 pointer-events-none h-14 border-l-0 rounded-r-md border">
                        <FaLock className="text-grayNeutral text-lg" />
                      </span>
                    </div>
                    <div className="flex my-5">
                      <input
                        type="pass"
                        required
                        name="confirmPassword"
                        className="w-full h-14 text-lg px-4 py-2 border border-r-0 rounded-l-md text-black"
                        placeholder="Confirm New Password"
                      />
                      <span className="flex items-center  px-3 pointer-events-none h-14 border-l-0 rounded-r-md border">
                        <FaLock className="text-grayNeutral text-lg" />
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="bg-greenDark mt-5 text-white font-lato text-lg py-2 w-full "
                    >
                      {t('common.resetPassword')}
                    </button>
                  </>
                )}
              </form>
            </div>
          ) : (
            <div>
              <h3 className="font-bold text-3xl font-roboto">
                {t('common.resetYourPassword')}
              </h3>
              <p className="text-gray-600 font-serif my-5">
                {t('common.ResetMessage')}
              </p>
              <form onSubmit={handleReset}>
                <label className="text-lg font-lato font-medium text-grayDark">
                  {t('common.phoneOrEmail')}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="email"
                  onBlur={(e) => handleAutoFill(e.target.value)}
                  onInput={(e) => handleInputChange(e.target.value)}
                  className={`w-full h-14 mt-1 text-lg px-4 py-2 border border-grayDark focus:border-2 focus:border-secondary focus:outline-none ${
                    errors ? 'border-red-500' : ''
                  }`}
                  placeholder={t('common.phoneNumberOrEmailAddress')}
                />
                {errors && (
                  <p className="text-red-500 text-sm mt-1">
                    {t('errors.auth.enterValidPhoneOrEmail')}
                  </p>
                )}
                {isUserValid === false && (
                  <p className="text-red-500 text-sm mt-1">
                    {t('errors.auth.userNotExist')}
                  </p>
                )}
                <button
                  type="submit"
                  className="bg-greenDark mt-5 uppercase text-white font-lato text-lg py-3 px-7 "
                >
                  {t('common.resetPassword')}
                </button>
              </form>
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ForgetPassModal;
