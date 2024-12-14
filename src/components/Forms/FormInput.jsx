import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const FormInput = ({
  label,
  name,
  type = 'text',
  error,
  register,
  required,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full max-w-[560px] space-y-2 font-lato">
      <div className=" flex justify-between">
        <label htmlFor={name} className="text-lg text-darkGray ">
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
              <div className="flex  items-center text-lg text-grayLight gap-x-3">
                <Visibility />
                Show
              </div>
            )}
          </button>
        )}
      </div>

      <input
        id={name}
        type={type === 'password' && showPassword ? 'text' : type}
        {...register(name, { required })}
        className={`w-full h-14 text-lg px-4 py-2 border border-darkGray focus:border-2 focus:border-secondary focus:outline-none ${
          error ? 'border-red-500' : ''
        }`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;
