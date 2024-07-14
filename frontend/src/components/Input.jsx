import React from "react";

const Input = ({ name = "Username", type = "text", onChange }) => {
  return (
    <div>
      <label htmlFor={name}>{name.capitalize()}</label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        className="w-full p-2.5 rounded-md outline-none"
      />
    </div>
  );
};

export default Input;
