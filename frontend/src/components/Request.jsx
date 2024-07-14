import React from "react";
import {Button} from "./";

const Request = ({ email, name, title, isbn, onAccept, onReject }) => {
    return (
        <tr className="border-b border-gray-200">
            <td className="px-4 py-2">{email}</td>
            <td className="px-4 py-2">{name}</td>
            <td className="px-4 py-2">{title}</td>
            <td className="px-4 py-2">{isbn}</td>
            <td className="px-4 py-2">
                
                <Button
                    buttonText="Accept"
                    classes="bg-green-100 border-green-900 text-green-900
                    mx-1 hover:bg-green-200"
                    onClick={onAccept}
                />
                <Button
                    buttonText="Reject"
                    classes="bg-red-100 border-red-900 text-red-900 hover:bg-red-200"
                    onClick={onReject}
                />
            </td>
        </tr>
    );
};

export default Request;