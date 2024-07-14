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
                className={`flex items-center gap-2 ${classes}`}
            >
                <input
                    type="text"
                    name="search"
                    placeholder="Book Name"
                    className={`w-full p-2.5 rounded-md outline-none border ${classes}`}
                />
                <button type="submit">Search</button>
            </form>
        </>
    );
};

export default SearchBook;
