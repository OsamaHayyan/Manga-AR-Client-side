import React from "react";
import { forwardRef } from "react";
import * as inputStyle from "../styles/input.module.css";
const Input = forwardRef(({ Icon, name, type, placeholder, required }, ref) => {
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
});

export default Input;
