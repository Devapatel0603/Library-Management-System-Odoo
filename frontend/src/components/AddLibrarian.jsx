import React, { useState } from "react";
import { Input } from "./";
import { Button } from "./";

const AddLibrarian = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        line1: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        email: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    
    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
            <form
                className="flex flex-col justify-center  p-2.5 rounded-lg sm:w-6/12 md:w-5/12 w-11/12 gap-4 mx-auto"
                onSubmit={handleSubmit}
            >
                <h2 className="text-center font-bold text-xl">
                    Add Librarian
                </h2>
                <Input
                    inputName="name"
                    labelText="Name"
                    type="text"
                    onChange={handleInput}
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
                <p className="text-red-500 font-medium">{errorMessage}</p>
                <Button
                    buttonText="Signup"
                    classes="bg-green-100 border-green-900 text-green-900 hover:bg-green-200"
                />
            </form>
    );
};

export default AddLibrarian;
