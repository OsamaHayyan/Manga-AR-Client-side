import React from "react";
import { forwardRef } from "react";
import * as inputStyle from "../styles/input.module.css";
const Input = forwardRef(
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
    },
    ref
  ) => {
    return (
      <div>
        <div
          className={`${inputStyle.inputContainer} ${className}`}
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

export default Input;
