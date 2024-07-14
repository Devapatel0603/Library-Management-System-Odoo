import React from "react";
import Librarian from "./Librarian";

const LibrarianList = ({librarians}) => {
    
    const handleRemove = (index) => {
        console.log(`Removed librarian at index ${index}`);
        
    };

    return (
        <div className="overflow-x-auto">
            <h2 className="text-center font-bold text-xl">Librarian List</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Name</th>
                        <th className="px-4 py-2 border-b">Phone</th>
                        <th className="px-4 py-2 border-b">Address</th>
                        <th className="px-4 py-2 border-b">Email</th>
                        <th className="px-4 py-2 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {librarians.map((librarian, index) => (
                        <Librarian
                            key={index}
                            name={librarian.name}
                            phone={librarian.phone}
                            address={`${librarian.line1}, ${librarian.city}, ${librarian.state}, ${librarian.country}, ${librarian.pincode}`}
                            email={librarian.email}
                            onRemove={() => handleRemove(index)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LibrarianList;
