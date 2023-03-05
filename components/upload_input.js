import React, { useEffect, useRef } from "react";
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
  multiple,
}) {
  const [selectedFile, setSelectedFile] = useState();
  const [test, setTest] = useState();

  return (
    <div className={inputStyle.container}>
      <label htmlFor={id} style={{ width: "100%" }}>
        <div className={`${inputStyle.inputFile} ${calssName}`}>
          {icon}
          <div className={inputStyle.selectedFiles}>
            {selectedFile ? (
              selectedFile?.map((file, i) => {
                return <p key={i}>{file.name}</p>;
              })
            ) : (
              <p>{fileName}</p>
            )}
          </div>
          {lastIcon}
        </div>
        {register ? (
          <>
            <input
              multiple={multiple}
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
                onChange: (e) => {
                  setSelectedFile([...e.target.files]);
                },
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
