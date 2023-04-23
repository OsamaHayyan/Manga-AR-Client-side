import React from "react";
import { forwardRef } from "react";
import inputStyle from "../styles/input.module.css";

type Props = {
  Icon?: JSX.Element;
  lastIcon?: { icon: JSX.Element; width: number };
  name?: string;
  type?: string;
  placeholder?: string;
  validation?: boolean;
  validationText?: string;
  required?: boolean;
  style?: React.CSSProperties;
  className?: string;
  validationStyle?: React.CSSProperties;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};
const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      Icon,
      lastIcon = null,
      name,
      type,
      placeholder,
      validation,
      validationText,
      required,
      style,
      className,
      validationStyle,
      onChange,
      onBlur,
    },
    ref
  ) => {
    return (
      <div className={inputStyle.container}>
        <div
          className={`${className} ${inputStyle.inputContainer}`}
          style={style}
        >
          {Icon}
          <input
            className={inputStyle.inputs}
            style={
              lastIcon
                ? { width: `calc(100% - ${72 - lastIcon?.width}px)` }
                : null
            }
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            type={type}
            placeholder={placeholder}
            ref={ref}
            required={required ? true : false}
          />
          {lastIcon?.icon}
        </div>
        {validation && (
          <p className={inputStyle.validation} style={validationStyle}>
            {validationText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
export default Input;
