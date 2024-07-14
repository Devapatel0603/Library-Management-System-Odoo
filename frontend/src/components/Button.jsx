import React from "react";

const Button = ({
  classes = "bg-blue-600 text-white hover:bg-blue-700",
  buttonText,
}) => {
  return (
    <button className={`p-2.5 rounded-md ${classes}`}>{buttonText}</button>
  );
};

export default Button;
