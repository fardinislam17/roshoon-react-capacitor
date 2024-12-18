import React, { useState } from 'react';
import hidePass from 'src/assets/svgs/hidepass.svg';
import { Visibility } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const CustomForm = ({ fields, handleSubmit, handleModal }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[+]?[\d\s()-]{10,11}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleInputChange = (name, errorMessage, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (name === 'email') {
        return {
          ...prev,
          [name]:
            !validateEmail(value) && !validatePhoneNumber(value)
              ? t(errorMessage)
              : '',
        };
      }
      if (name === 'password') {
        return {
          ...prev,
          [name]: value.length < 6 ? t(errorMessage) : '',
        };
      }
      return prev;
    });
  };

  const onClickSubmit = (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error !== '');
    if (!hasErrors) {
      handleSubmit(formData);
    }
  };

  const handleTogglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  return (
    <form className="w-full" onSubmit={onClickSubmit}>
      <div className="flex flex-col gap-4">
        {fields.map((field) => (
          <div key={field.label}>
            <div className="flex items-center justify-between mb-2">
              <label className="text-lg font-lato font-medium text-grayDark">
                {t(field.label)}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              {field.name === 'password' && (
                <button
                  className="text-sm text-grayLight font-roboto flex items-center gap-2"
                  onClick={handleTogglePasswordVisibility}
                >
                  {showPassword ? (
                    <>
                      <img className="h-5" src={hidePass} alt="Hide" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Visibility className="text-grayNeutral h-5 w-5" />
                      Show
                    </>
                  )}
                </button>
              )}
            </div>
            <input
              key={field.name}
              type={
                field.type === 'password' && !showPassword ? 'password' : 'text'
              }
              value={formData[field.name] || ''}
              onChange={(e) =>
                handleInputChange(
                  field.name,
                  field.errorMessage,
                  e.target.value
                )
              }
              required={field.required}
              className={`w-full h-14 text-lg px-4 py-2 border border-grayDark focus:border-2 focus:border-secondary focus:outline-none ${
                errors[field.name] ? 'border-red-500' : ''
              }`}
              placeholder={field.placeholder ? t(field.label) : ''}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}
      </div>
      {pathname === '/login' && (
        <div className="mt-4 text-right">
          <button
            onClick={() => handleModal()}
            type="button"
            className="text-sm underline text-grayDark hover:text-black"
          >
            Forget your password
          </button>
        </div>
      )}
      <div className="flex justify-center mt-6 mb-4">
        <button
          type="submit"
          className="bg-greenDark text-white font-lato text-lg py-4 px-10 "
        >
          {t('common.logIn')}
        </button>
      </div>
    </form>
  );
};

export default CustomForm;
