import React from "react";
import Request from "./Request";

const RequestList = ({requests}) => {
    
    const handleAccept = (index) => {
        console.log(`Accepted request at index ${index}`);
    
    };

    const handleReject = (index) => {
        console.log(`Rejected request at index ${index}`);
        
    };

    return (
        <div className="overflow-x-auto mt-4">
            <h2 className="text-center font-bold text-xl">Request List</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Email</th>
                        <th className="px-4 py-2 border-b">Name</th>
                        <th className="px-4 py-2 border-b">Title</th>
                        <th className="px-4 py-2 border-b">ISBN</th>
                        <th className="px-4 py-2 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request, index) => (
                        <Request
                            key={index}
                            email={request.email}
                            name={request.name}
                            title={request.title}
                            isbn={request.isbn}
                            onAccept={() => handleAccept(index)}
                            onReject={() => handleReject(index)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RequestList;
