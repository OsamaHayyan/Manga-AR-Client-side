import React from "react";
import inputStyle from "../styles/upload_input.module.css";

export default function InputUpload({
  icon,
  handleFileInput,
  name,
  fileName,
  validation,
  register,
  error,
  validationStyle,
  validationText,
  accept,
  calssName,
  lastIcon,
}) {
  return (
    <div>
      <label for="profileImage">
        <div className={`${inputStyle.inputFile} ${calssName}`}>
          {icon}
          <p>{fileName}</p>
          {lastIcon}
        </div>
        {register ? (
          <>
            <input
              {...register(name, validation)}
              id="profileImage"
              type="file"
              accept={accept}
              onChange={handleFileInput}
              style={{ display: "none" }}
            />
          </>
        ) : (
          <input
            id="profileImage"
            type="file"
            accept={accept}
            onChange={handleFileInput}
            style={{ display: "none" }}
          />
        )}
      </label>
      {error && (
        <p className={inputStyle.validation} style={validationStyle}>
          {validationText}
        </p>
      )}
    </div>
  );
}
