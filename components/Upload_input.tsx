import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {
  FieldErrorsImpl,
  FieldValues,
  Message,
  UseFormRegister,
  ValidationRule,
  useForm,
} from "react-hook-form";
import inputStyle from "../styles/upload_input.module.css";

type Props = {
  id?: string;
  icon?: JSX.Element;
  handleFileInput?: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
  fileName: string;
  validation?: Partial<{ required: Message | ValidationRule<boolean> }>;
  register?: UseFormRegister<FieldValues>;
  validationStyle?: React.CSSProperties;
  validationText?: string;
  errors?: { required?: boolean; other?: boolean };
  accept: string;
  calssName?: string;
  lastIcon?: JSX.Element;
  multiple?: boolean;
};
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
}: Props) {
  const [selectedFile, setSelectedFile] = useState<File[]>();

  return (
    <div className={inputStyle.container}>
      <label htmlFor={id} style={{ width: "100%" }}>
        <div className={`${inputStyle.inputFile} ${calssName}`}>
          {icon}
          <div className={inputStyle.selectedFiles}>
            {selectedFile?.length > 0 ? (
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
                    document.querySelector<HTMLInputElement>(`#${id}`).value =
                      null;
                    return false;
                  }
                },
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
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
      {errors.other ||
        (errors.required && (
          <p className={inputStyle.validation} style={validationStyle}>
            {errors.required ? validationText : "maximum image size is 10MB"}
          </p>
        ))}
    </div>
  );
}
