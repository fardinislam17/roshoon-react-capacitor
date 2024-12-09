import { useState, useEffect } from 'react';
import {
  Button,
  DialogActions,
  FormControl,
  FormGroup,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from '@mui/material';
import hidePass from '../../assets/svgs/hidepass.svg';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const CustomForm = ({ fields, handleSubmit }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [formData, setFormData] = useState({});
  const [emailError, setEmailError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'email') {
      const isValidEmail = validateEmail(value);
      setEmailError(!isValidEmail);
    }

    const allFieldsFilled = fields.every((field) => {
      return (
        !field.required ||
        (formData[field.name] && formData[field.name].trim() !== '')
      );
    });
  };

  const onClickSubmit = (e) => {
    e.preventDefault();
    if (!emailError && formData.email && formData.password) {
      handleSubmit(formData);
    }
  };

  const handleTogglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    const allFieldsFilled = fields.every((field) => {
      return (
        !field.required ||
        (formData[field.name] && formData[field.name].trim() !== '')
      );
    });
    const isValidEmail = validateEmail(formData.email);
  }, [formData, fields]);

  return (
    <FormControl component="form" onSubmit={onClickSubmit} fullWidth>
      <FormGroup>
        {fields.map((field) => (
          <>
            {' '}
            <div className="flex items-center justify-between mb-2">
              <Typography
                fontSize={18}
                fontFamily={'lato'}
                fontWeight={400}
                align="left"
                sx={{ color: '#3C4242' }}
              >
                {t(field.label)}
              </Typography>
              {field.name === 'password' && (
                <button
                  className="text-lg text-[#807D7E] font-roboto flex items-center gap-3 "
                  onClick={handleTogglePasswordVisibility}
                >
                  {showPassword ? (
                    <>
                      <img className="h-5" src={hidePass} alt="" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Visibility className="text-[#807D7E]" />
                      Show
                    </>
                  )}
                </button>
              )}
            </div>
            <TextField
              key={field.name}
              type={
                field.name === 'password' && !showPassword ? 'password' : 'text'
              }
              fullWidth
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              required={field.required}
              error={field.name === 'email' && emailError}
              helperText={
                field.name === 'email' && emailError
                  ? t('errors.auth.enterValidEmail')
                  : ''
              }
              sx={{
                mb: fields.length === 2 && field.name === 'password' ? 1 : 2,
              }}
            />
          </>
        ))}
      </FormGroup>
      <div className="flex justify-end">
        {pathname === '/login' && (
          <Button
            variant="text"
            color="secondary"
            sx={{
              fontSize: 14,
              color: '#3C4242',
              fontWeight: 400,
              textTransform: 'none',
              textDecoration: 'underline',
              padding: 0,
            }}
          >
            Forget your password
          </Button>
        )}
      </div>
      <DialogActions>
        <Button
          type="submit"
          variant="contained"
          sx={{
            fontFamily: 'lato',
            fontSize: 18,
            backgroundColor: '#195908',
            textTransform: 'none',
            fontWeight: 400,
            paddingY: 1,
            paddingX: 6,
            borderRadius: 0,
            margin: 'auto',
            boxShadow: 'none',
            marginTop: { xs: 3, sm: 0, md: 0, lg: 0 },
            marginBottom: { xs: 1, sm: 0, md: 0, lg: 0 },
          }}
        >
          {t('common.logIn')}
        </Button>
      </DialogActions>
    </FormControl>
  );
};

export default CustomForm;
