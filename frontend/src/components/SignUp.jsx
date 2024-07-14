import React, { useState } from "react";
import { Input } from "./";
import { Button } from "./";
import { Link } from "react-router-dom";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        profile_photo: "",
        phone: "",
        line1: "",
        city: "",
        country: "",
        pincode: "",
        email: "",
        password: "",
    });
    const [confirmpassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleconfirmPassword = (e) => {
      setConfirmPassword(e.target.value);
    }
    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFile = (e) => {
      console.log(e.target.files);
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== confirmpassword) {
            setErrorMessage("* Passwords do not match");
        } else if (formData.password.trim().length < 8) {
            setErrorMessage("* Password must be at least 8 characters");
        } else {
            console.log(formData);
            // Handle form submission logic here, e.g., send data to the server
        }
    };

    return (
        <div className="flex mt-16 justify-center items-center">
            <form
                className="flex flex-col justify-center border border-blue-300 p-2.5 rounded-lg sm:w-6/12 md:w-5/12 lg:w-4/12 w-11/12 gap-4"
                onSubmit={handleSubmit}
            >
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
                <Input
                    inputName="city"
                    labelText="City"
                    type="text"
                    onChange={handleInput}
                />
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
        </div>
    );
};

export default Signup;