import { useState, useEffect } from 'react';
import {
  Button,
  DialogActions,
  FormControl,
  FormGroup,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const CustomForm = ({ fields, handleClick }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
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

    setIsButtonDisabled(!allFieldsFilled || emailError);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailError && formData.email && formData.password) {
      handleClick(formData);
    }
  };

  const handleTogglePasswordVisibility = () => {
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
    setIsButtonDisabled(!allFieldsFilled || !isValidEmail);
  }, [formData, fields]);

  return (
    <FormControl component="form" onSubmit={handleSubmit} fullWidth>
      <FormGroup>
        {fields.map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            type={
              field.name === 'password' && !showPassword ? 'password' : 'text'
            }
            fullWidth
            variant="outlined"
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            error={field.name === 'email' && emailError}
            helperText={
              field.name === 'email' && emailError
                ? t('errors.auth.enterValidEmail')
                : ''
            }
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: field.name === 'password' && (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        ))}
      </FormGroup>

      <DialogActions>
        <Button onClick={handleClick} color="secondary">
          {t('common.cancel')}
        </Button>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={isButtonDisabled}
        >
          {t('common.submit')}
        </Button>
      </DialogActions>
    </FormControl>
  );
};

export default CustomForm;
