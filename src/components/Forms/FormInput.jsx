import React, { useState } from 'react';
import { PassHideIcon, PassVisibleIcon } from '../Icons';

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
    <div className="flex flex-col gap-2 font-lato">
      <div className=" flex justify-between">
        <label htmlFor={name} className="text-[17.75px] text-[#3C4242] ">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <div className="flex items-center text-[18.33px] text-[#807D7E] gap-x-3">
                <PassHideIcon />
                Hide
              </div>
            ) : (
              <div className="flex  items-center text-[18.33px] text-[#807D7E] gap-x-3">
                <PassVisibleIcon />
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
        className={`w-[559.07px] h-[57.19px] px-4 py-2 border-[0.74px] border-[#3C4242] focus:outline-none ${
          error ? 'border-red-500' : ''
        }`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;
