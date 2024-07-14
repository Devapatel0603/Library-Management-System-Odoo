import axios from "axios";
import React, { useState } from "react";

const SearchBook = ({ classes }) => {
    const [searchBooks, setSearchBooks] = useState([]);

    const handleSubmit = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/searchBooks`
            );
            if (res.status === 200) {
                setSearchBooks(res.data.books);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className={`flex items-center gap-2 flex-col md:flex-row ${classes}`}
            >
                <input
                    type="text"
                    name="search"
                    placeholder="Book Name"
                    className={`w-full p-2.5 rounded-md outline-none border ${classes}`}
                />
                <button
                    type="submit"
                    className={`p-2.5 px-4 rounded-md border font-medium text-blue-600 border-blue-600 bg-blue-50 hover:text-blue-700 hover:bg-blue-100`}
                >
                    Search
                </button>
            </form>
        </>
    );
};

export default SearchBook;
