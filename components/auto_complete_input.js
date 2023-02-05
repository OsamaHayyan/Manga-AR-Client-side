import React from "react";
import * as inputStyle from "../styles/input.module.css";
export default function AutoComplete({
  Icon,
  lastIcon = null,
  name,
  type,
  placeholder,
  error,
  validation,
  validationText,
  required,
  style,
  className,
  validationStyle,
  onChange,
  onBlur,
  register,
}) {
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
          onChange={onChange}
          onBlur={onBlur}
          type={type}
          placeholder={placeholder}
          required={required ? true : false}
          {...register(name, validation)}
        />
        {lastIcon?.icon}
      </div>
      {error && (
        <p className={inputStyle.validation} style={validationStyle}>
          {validationText}
        </p>
      )}
    </div>
  );
}
