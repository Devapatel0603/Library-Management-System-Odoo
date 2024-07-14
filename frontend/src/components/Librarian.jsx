import React from "react";
import {Button} from "./";

const Librarian = ({ name, phone, address, email, onRemove }) => {
    return (
        <tr className="border-b border-gray-200">
            <td className="px-4 py-2">{name}</td>
            <td className="px-4 py-2">{phone}</td>
            <td className="px-4 py-2">{address}</td>
            <td className="px-4 py-2">{email}</td>
            <td className="px-4 py-2">
                <Button
                    buttonText="Remove"
                    classes="bg-red-100 border-red-900 text-red-900
                    mx-1 hover:bg-red-200"
                    onClick={onRemove}
                />
            </td>
        </tr>
    );
};

export default Librarian;
