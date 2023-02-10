import React, { useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import inputStyle from "../styles/upload_input.module.css";

export default function InputUpload({
  id = "file",
  icon,
  handleFileInput,
  name,
  fileName,
  validation,
  register,
  validationStyle,
  validationText,
  errors,
  accept,
  calssName,
  lastIcon,
}) {
  let [selectedFile, setSelectedFile] = useState();
  const handleImage = (e) => {
    setSelectedFile(e.target.files[0]?.name);
  };
  return (
    <div>
      <label htmlFor={id}>
        <div className={`${inputStyle.inputFile} ${calssName}`}>
          {icon}
          <p>{selectedFile ? selectedFile : fileName}</p>
          {lastIcon}
        </div>
        {register ? (
          <>
            <input
              {...register(name, {
                ...validation,
                validate: (file) => {
                  if (
                    file.length > 0 &&
                    (!file[0].type.includes("image") ||
                      file[0].size * Math.pow(10, -6) > 10)
                  ) {
                    setSelectedFile(null);
                    document.querySelector(`#${id}`).value = null;
                    return false;
                  }
                },
                onChange: handleImage,
              })}
              id={id}
              type="file"
              accept={accept}
              style={{ display: "none" }}
            />
          </>
        ) : (
          <input
            id={id}
            type="file"
            accept={accept}
            onChange={handleFileInput}
            style={{ display: "none" }}
          />
        )}
      </label>
      {errors && (
        <p className={inputStyle.validation} style={validationStyle}>
          {errors.required ? validationText : "maximum image size is 10MB"}
        </p>
      )}
    </div>
  );
}
