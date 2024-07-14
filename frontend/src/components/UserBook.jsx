import React from "react";
import Button from "./Button";

const UserBook = () => {
    // const { image, title, description, availableQuantities } = book;
    const image =
        "https://i.pinimg.com/474x/15/fe/65/15fe6588b682d44671e567f857ba79fb.jpg";
    const title = "WINGS OF FIRE";
    const description ="THIS IS  WINGS OF FIIIIIIIRES...";
    const availableQuantities = 12;

    return (
        <div className="flex p-4 border border-gray-300 rounded-lg my-4">
            <img
                src={image}
                alt={title}
                className="w-36 h-48 object-cover mr-4"
            />
            <div className="flex flex-col">
                <div className="text-lg font-bold">{title}</div>
                <div className="text-gray-500 text-md my-2">{description}</div>
                
                <Button classes="bg-green-100 text-green-800 border border-green-800" buttonText={`Available Quantities: ${availableQuantities}`}/>
            </div>
        </div>
    );
};

export default UserBook;
