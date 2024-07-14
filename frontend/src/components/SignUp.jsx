import React, { useState } from "react";
import { Input } from "./";
import { Button } from "./";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../features/userSlice";
import { toast } from "react-toastify";

const Signup = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    profile_photo: "",
    phone: "",
    line1: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    email: "",
    password: "",
  });
  const [confirmpassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleconfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmpassword) {
      setErrorMessage("* Passwords do not match");
    } else if (formData.password.trim().length < 8) {
      setErrorMessage("* Password must be at least 8 characters");
    } else {
      const SignUpData = new FormData();
      SignUpData.append("name", formData.name);
      SignUpData.append("profile_photo", formData.profile_photo);
      SignUpData.append("line1", formData.line1);
      SignUpData.append("city", formData.city);
      SignUpData.append("state", formData.state);
      SignUpData.append("email", formData.email);
      SignUpData.append("phone", formData.phone);
      SignUpData.append("pincode", formData.pincode);
      SignUpData.append("password", formData.password);
      SignUpData.append("country", formData.country);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/register`,
        SignUpData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 201) {
        dispatch(addUser(res.data.user));
        toast.success("Register Successful");
      }
    }
  };

  return (
    <form
      className="flex flex-col justify-center  p-2.5 rounded-lg sm:w-6/12 md:w-5/12 w-11/12 gap-4 mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-center font-bold text-xl">User Registration</h2>
      <Input
        inputName="name"
        labelText="Name"
        type="text"
        onChange={handleInput}
      />
      <Input
        inputName="profile_photo"
        labelText="Profile Photo"
        type="file"
        onChange={handleFile}
      />
      <Input
        inputName="phone"
        labelText="Phone"
        type="number"
        onChange={handleInput}
      />
      <Input
        inputName="line1"
        labelText="Address Line 1"
        type="text"
        onChange={handleInput}
      />
      <div className="flex gap-1">
        <Input
          inputName="city"
          labelText="City"
          type="text"
          onChange={handleInput}
        />
        <Input
          inputName="state"
          labelText="State"
          type="text"
          onChange={handleInput}
        />
      </div>
      <div className="flex gap-1">
        <Input
          inputName="country"
          labelText="Country"
          type="text"
          onChange={handleInput}
        />
        <Input
          inputName="pincode"
          labelText="Pincode"
          type="number"
          onChange={handleInput}
        />
      </div>
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
      <Input
        inputName="confirmpassword"
        labelText="Confirm Password"
        type="password"
        onChange={handleconfirmPassword}
      />
      <p className="text-red-500 font-medium">{errorMessage}</p>
      <p className="text-sm text-blue-500 cursor-pointer">
        Already an user? <Link to="/login">Login</Link>
      </p>
      <Button
        buttonText="Signup"
        classes="bg-green-100 text-green-900 hover:bg-green-200"
      />
    </form>
  );
};

export default Signup;
