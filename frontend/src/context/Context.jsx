import axios from "axios";
import { createContext } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../features/userSlice";
import { toast } from "react-toastify";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const dispatch = useDispatch();

    //Get User
    const getUser = async (setLoading) => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/user/get`,
                { withCredentials: true }
            );
            if (res.status === 200) {
                dispatch(addUser(res.data.user));
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const getBook = async () => {
        const res = await axios.get(
            "https://www.googleapis.com/books/v1/volumes?q=isbn:9781787123427"
        );
        const resData = await res.data;
        setBookDetail({
            name: resData.items[0].volumeInfo.title,
            author: resData.items[0].volumeInfo.authors[0],
            year: resData.items[0].volumeInfo.publishedDate,
            description: resData.items[0].searchInfo.textSnippet,
            imageLink: resData.items[0].volumeInfo.imageLinks.thumbnail,
        });
    };

    return <Context.Provider value={{ getUser }}>{children}</Context.Provider>;
};
