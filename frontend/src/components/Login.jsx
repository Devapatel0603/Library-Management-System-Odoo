import React, { useState } from "react";
import { Input } from "./";
import { Button } from "./";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { addUser } from "../features/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.trim().length < 8) {
      setErrorMessage("* password must be at least 8 characters");
    } else {
    }

    if (formData.password.trim().length < 8) {
      setErrorMessage("* password must be at least 8 characters");
    } else {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(res.data);
      dispatch(addUser(res.data.user));
      navigate("/");
      setErrorMessage("");
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="flex mt-16 justify-center items-center">
      <form
        className="flex flex-col justify-center items-center p-2.5 rounded-lg sm:w-6/12 md:w-5/12 lg:w-4/12 w-11/12 gap-4"
        onSubmit={handleSubmit}
      >
        <Input
          inputName="email"
          labelText="Email"
          type="email"
          onChange={handleInput}
        />
        <Input
          inputName="password"
          labelText="Password"
          type="password"
          onChange={handleInput}
        />
        <div className="w-full p-2.5">
          <p className="text-red-500 font-medium">{errorMessage}</p>
          <p className="text-sm text-blue-500 cursor-pointer">
            Forget Password?
          </p>
          <p className="text-sm text-blue-500 cursor-pointer">
            <Link to="/">Signup using Google</Link>
          </p>
          <p className="text-sm text-blue-500 cursor-pointer">
            <Link to="/signup">Signup using E-mail</Link>
          </p>
        </div>
        <Button
          buttonText="Login"
          classes="bg-green-50 border-green-600 text-green-600 hover:bg-green-100 hover:text-green-700"
        />
      </form>
    </div>
  );
};

export default Login;
