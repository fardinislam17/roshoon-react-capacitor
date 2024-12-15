import { useState } from 'react';
import Select from 'react-select';
import { cn } from 'src/utils/cn';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { formSelectStyles } from 'src/styles/formSelectStyles';

const FormInput = ({
  label,
  name,
  defaultValue,
  type = 'text',
  error,
  register,
  required,
  options = [],
  onChange,
  readOnly = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="w-full space-y-2 font-lato">
      <div className="flex justify-between">
        <label htmlFor={name} className="text-lg text-grayDark">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <div className="flex items-center text-lg text-grayLight gap-x-3">
                <VisibilityOff />
                Hide
              </div>
            ) : (
              <div className="flex items-center text-lg text-grayLight gap-x-3">
                <Visibility />
                Show
              </div>
            )}
          </button>
        )}
      </div>
      {type === 'dropdown' && !readOnly ? (
        <Select
          id={name}
          options={options}
          onChange={onChange}
          classNamePrefix="select"
          placeholder={`Select ${label}`}
          styles={formSelectStyles(error)}
        />
      ) : (
        <input
          disabled={readOnly}
          readOnly={readOnly}
          defaultValue={defaultValue}
          {...(readOnly ? {} : register(name, { required }))}
          autoComplete={'new-password'}
          type={type === 'password' && showPassword ? 'text' : type}
          className={cn('form-input', { 'border-red-500': error })}
        />
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;
