import React from "react";

const Button = ({
  classes = "text-blue-600 border-blue-600 bg-blue-50 hover:text-blue-700 hover:bg-blue-100",
  buttonText,
}) => {
  return (
    <button className={`p-2.5 px-4 rounded-md border font-medium ${classes}`}>
      {buttonText}
    </button>
  );
};

export default Button;
