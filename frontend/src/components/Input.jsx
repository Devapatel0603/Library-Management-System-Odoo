import React from "react";

const Input = ({ inputName = "username", labelText, type = "text", onChange }) => {
  return (
      <div>
          <label htmlFor={inputName}>{labelText}</label>
          <input
              type={type}
              name={inputName}
              onChange={onChange}
              className="w-full p-2.5 rounded-md outline-none border"
          />
      </div>
  );
};

export default Input;
