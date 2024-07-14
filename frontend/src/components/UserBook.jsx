import React from "react";
import Button from "./Button";

const UserBook = ({
    image = "https://i.pinimg.com/474x/15/fe/65/15fe6588b682d44671e567f857ba79fb.jpg",
    title = "WINGS OF FIRE",
    description = "WINGS OF FIRE",
    info = {
        value: "12",
        color: "blue",
    },
}) => {
    const buttonColor = `bg-${info.color}-100 text-${info.color}-800  border-${info.color}-800`;
    return (
        <div className="flex p-4 border border-gray-300 rounded-lg my-4">
            <img
                src={image}
                alt={`${title}'s image`}
                className="w-36 h-48 object-cover mr-4"
            />
            <div className="flex flex-col">
                <div className="text-lg font-bold">{title}</div>
                <div className="text-gray-500 text-md my-2">{description}</div>

                <Button
                    classes={`border ${buttonColor}`}
                    buttonText={`${info.value}`}
                />
                <div>
                    <Button
                        classes=" mt-4 text-blue-600 border-blue-600 bg-blue-50 hover:text-blue-700 hover:bg-blue-100"
                        buttonText="Send Request"
                    />
                </div>
            </div>
        </div>
    );
};

export default UserBook;
