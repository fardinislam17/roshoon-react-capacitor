import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Input = ({
  label,
  placeholder,
  onChange,
  onBlur,
  onClick,
  onFocus,
  onKeyPress,
  type = 'text',
  name,
  defaultValue,
  value,
  min,
  max,
  maxLength,
  errorText,
  isDisabled,
  ref,
  registerProperty,
  id,
  classNames,
  inputClassNames,
  isRequired = false,
  noMargin = false,
  noTextAreaHeight = false,
  noBorder = false,
  pattern,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(
    defaultValue ? defaultValue.toString() : ''
  );

  const myRef = useRef(null);
  const { t } = useTranslation();

  const handleClick = (e) => {
    onClick && onClick(e);
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  const handleWheel = (e) => {
    e.currentTarget.blur();
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur && onBlur(e);
    registerProperty && registerProperty.onBlur(e);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    onChange && onChange(e);
    registerProperty && registerProperty.onChange(e);
  };

  useEffect(() => {
    if (registerProperty?.name) {
      const inputValue = document.getElementById(registerProperty.name)?.value;
      setInputValue(inputValue);
    }
  }, [registerProperty]);

  return (
    <div
      className={`relative ${classNames || ''} ${
        isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
      } min-w-[200px] ${!noMargin ? 'mt-5 mb-3' : ''}`}
    >
      <div className="relative">
        {label && (
          <label
            htmlFor={id || registerProperty?.name}
            className="block font-lato text-grayDark text-sm mb-[10px]"
          >
            {t(label)}
            {isRequired && (
              <span className="ml-1 text-red-500 font-lato text-xxs font-semibold">
                *
              </span>
            )}
          </label>
        )}

        {type !== 'textarea' && (
          <input
            step="any"
            type={type}
            id={id || registerProperty?.name}
            className={`h-[57px] relative flex ${
              !noBorder ? 'border' : ''
            } font-lato font-medium text-base text-grayDark px-5 py-2 ${
              !errorText && !isFocused && inputValue
                ? 'border-greenDark'
                : errorText
                  ? 'border-red-200'
                  : isFocused
                    ? 'border-greenOlive border-2'
                    : 'border-light'
            } outline-none 
             ${inputClassNames || ''}  w-full placeholder:text-neutral`}
            ref={(el) => {
              myRef.current = el;
              registerProperty && registerProperty.ref(el);
            }}
            pattern={pattern}
            name={registerProperty ? registerProperty.name : name}
            min={min}
            max={max}
            key={registerProperty}
            maxLength={maxLength}
            placeholder={t(placeholder)}
            defaultValue={defaultValue}
            value={value}
            onClick={handleClick}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyPress={onKeyPress}
            onWheel={handleWheel}
          />
        )}

        {type === 'textarea' && (
          <textarea
            id={id || registerProperty?.name}
            className={`relative ${!noTextAreaHeight ? 'min-h-[124px]' : ''} ${
              !noBorder ? 'border' : ''
            } ${inputClassNames || ''} font-lato font-medium text-sm ${
              !errorText && !isFocused && inputValue
                ? 'border-greenDark'
                : errorText
                  ? 'border-red-200'
                  : isFocused
                    ? 'border-greenOlive'
                    : 'border-light'
            } outline-none px-4 py-2  w-full placeholder:text-neutral`}
            placeholder={t(placeholder)}
            ref={registerProperty ? registerProperty.ref : ref}
            name={registerProperty ? registerProperty.name : name}
            defaultValue={defaultValue}
            value={value}
            onClick={handleClick}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyPress={onKeyPress}
          ></textarea>
        )}
      </div>

      {errorText && (
        <h3 className="text-red-500 text-sm absolute mt-2 font-lato">
          {errorText}
        </h3>
      )}
    </div>
  );
};

export default Input;
