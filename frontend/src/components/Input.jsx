import React from "react";

const Input = ({
  inputName = "username",
  labelText,
  type = "text",
  onChange,
  classes,
  placeholder,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={inputName}>{labelText}</label>
      <input
        type={type}
        name={inputName}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-2.5 rounded-md outline-none border ${classes}`}
      />
    </div>
  );
};

export default Input;
