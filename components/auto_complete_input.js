import React, { useRef, useState } from "react";
import { useEffect } from "react";
import * as inputStyle from "../styles/autoComplete.module.css";
import { DownArrow, Person } from "./icons";
export default function AutoComplete({
  id,
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
  options,
  filterOptions,
  onInput,
  accessedDataName,
  accessedValueName,
  multiple,
}) {
  const compare = (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };
  const inputList = useRef();
  const selectedRef = React.createRef();
  const [searchedOptions, setSearchedOptions] = useState(options);
  const [listHide, setListHide] = useState(true);
  const [selectedOption, setSelectedOption] = useState([]);
  const onClickOption = (e) => {
    const data = JSON.parse(e.target.dataset.value);
    let newData;
    if (multiple) {
      const newOptions = options.filter(
        (option) => option[accessedValueName] != data[accessedValueName]
      );

      options.length != 0 &&
        filterOptions((allData) => {
          return { ...allData, [id]: newOptions };
        });
      if (selectedOption.some(({ _id }) => _id == data._id)) return;
      newData = [...selectedOption, data];
      setSelectedOption(newData);
    } else {
      newData = data;
      setSelectedOption(newData);
    }
    onChange(newData);
    inputList.current.value = null;
  };
  const handleSearch = (e) => {
    setSearchedOptions(
      options.filter((opt) =>
        opt[accessedDataName]
          .toLowerCase()
          .includes(e.target.value?.toLowerCase())
      )
    );
  };

  const handleRemoveSelected = async (e) => {
    const data = await selectedRef.current?.dataset.value;
    const element = await JSON.parse(data);
    const newSelecedOption = selectedOption.filter(
      (sl) => sl._id != element._id
    );
    setSelectedOption(newSelecedOption);
    const newOptions = [...options, element].sort((a, b) =>
      compare(a[accessedDataName], b[accessedDataName])
    );
    filterOptions((oldVal) => {
      return { ...oldVal, [id]: newOptions };
    });
  };
  useEffect(() => {
    setSearchedOptions(options);
  }, [options]);
  return (
    <div className={inputStyle.container}>
      <div className={inputStyle.boxContainer}>
        {Icon}
        {Array.isArray(selectedOption) ? (
          selectedOption?.map((option, i) => (
            <li
              key={i}
              className={inputStyle.selectedOption}
              data-value={JSON.stringify(option)}
              ref={selectedRef}
            >
              <span>
                {accessedDataName ? option[accessedDataName] : option}
              </span>
              <DownArrow
                width="24px"
                height="24px"
                className={inputStyle.removeIcon}
                onClick={handleRemoveSelected}
              />
            </li>
          ))
        ) : (
          <li className={inputStyle.selectedOption}>
            <span>
              {accessedDataName
                ? selectedOption[accessedDataName]
                : selectedOption}
            </span>
            <DownArrow
              width="24px"
              height="24px"
              className={inputStyle.removeIcon}
            />
          </li>
        )}
        <div
          id={id}
          className={`${inputStyle.inputContainer} ${className}`}
          style={style}
        >
          <input
            className={inputStyle.inputs}
            type={type}
            placeholder={placeholder}
            required={required ? true : false}
            data-value={selectedOption}
            ref={inputList}
            onFocus={() => {
              setListHide(false);
            }}
            onBlur={() => setListHide(true)}
            onChange={onInput ? null : handleSearch}
            onInput={onInput}
          />
          <DownArrow
            width="32px"
            height="32px"
            className={!listHide ? inputStyle.reflectArrow : null}
          />
        </div>
      </div>

      <ul
        className={listHide ? inputStyle.hideList : inputStyle.showList}
        style={{
          background: "#000000",
          paddingLeft: "8px",
          transformOrigin: "top",
          transition: "max-height 300ms ease-out",
          overflowY: "auto",
          width: "100%",
          position: "absolute",
          borderRadius: "0 0 5px 5px",
        }}
      >
        {searchedOptions?.map((option, i) => (
          <li
            key={i}
            data-value={JSON.stringify(option)}
            onMouseDown={onClickOption}
            style={{
              fontWeight: "400",
              fontSize: "32px",
              color: "#FFFFFF",
              height: "48px",
              lineHeight: "48px",
              cursor: "pointer",
            }}
          >
            {accessedDataName ? option[accessedDataName] : option}
          </li>
        ))}
      </ul>
      {error && (
        <p className={inputStyle.validation} style={validationStyle}>
          {validationText}
        </p>
      )}
    </div>
  );
}
