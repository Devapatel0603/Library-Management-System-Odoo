import React, { useState } from "react";
import {Input} from "./";
import {Button} from "./";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password.trim().length < 8){
          setErrorMessage("* password must be at least 8 characters");
        } else {
          console.log(formData);
        }

        // if (formData.password.trim().length < 8) {
        //     setErrorMessage("* password must be at least 8 characters");
        // } else {
        //     const res = await axios.post(
        //         "http://localhost:8000/api/v1/user/login",
        //         formData,
        //         {
        //             withCredentials: true,
        //         }
        //     );

        //     dispatch(addUser(res.data.user));
        //     navigate("/");
        //     setErrorMessage("");
        //     setFormData({
        //         email: "",
        //         password: "",
        //     });
        // }
    };

    return (
        <div className="flex mt-16 justify-center items-center">
            <form
                className="flex flex-col justify-center items-center border border-blue-300 p-2.5 rounded-lg sm:w-6/12 md:w-5/12 lg:w-4/12 w-11/12 gap-4"
                onSubmit={handleSubmit}
            >
                <Input
                    inputName="username"
                    labelText="Username"
                    type="text"
                    onChange={handleInput}
                />
                <Input
                    inputName="password"
                    labelText="Password"
                    type="password"
                    onChange={handleInput}
                />
                <p className="text-red-500 font-medium">{errorMessage}</p>
                <p className="text-sm text-blue-500 cursor-pointer">
                    Forget Password?
                </p>
                <Button
                    buttonText="Login"
                    classes="bg-green-100 text-green-900 hover:bg-green-200"
                />
            </form>
        </div>
    );
};

export default Login;
