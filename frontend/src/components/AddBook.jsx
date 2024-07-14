import React, { useState } from "react";
import { Input } from "./";
import { Button } from "./";


const AddBook = () => {
    const [formData, setFormData] = useState({
        isbn: "",
        genre: "",
        quantity: "",
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
            <h2 className="text-center font-bold text-xl">Add Book</h2>
            <Input
                inputName="isbn"
                labelText="ISBN No."
                type="number"
                onChange={handleInput}
            />
            <Input
                inputName="genre"
                labelText="Genre"
                type="text"
                onChange={handleInput}
            />
            <Input
                inputName="quantity"
                labelText="Quantity"
                type="number"
                onChange={handleInput}
            />
            <p className="text-red-500 font-medium">{errorMessage}</p>
            <Button
                buttonText="Add"
                classes="bg-green-100 border-green-900 text-green-900 hover:bg-green-200"
            />
        </form>
    );
};

export default AddBook;