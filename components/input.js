import React from "react";
import { forwardRef } from "react";
import * as inputStyle from "../styles/input.module.css";
const Input = forwardRef(
  (
    { Icon, lastIcon = null, name, type, placeholder, required, style },
    ref
  ) => {
    return (
      <div className={inputStyle.inputContainer} style={style}>
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
    );
  }
);

export default Input;
