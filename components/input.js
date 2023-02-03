import React from "react";
import * as inputStyle from "../styles/input.module.css";
export default function Input({
  Icon,
  name,
  type,
  placeholder,
  ref,
  required,
}) {
  return (
    <div className={inputStyle.inputContainer}>
      {Icon}
      <input
        className={inputStyle.inputs}
        name={name}
        type={type}
        placeholder={placeholder}
        ref={ref}
        required={required ? true : false}
      />
    </div>
  );
}
