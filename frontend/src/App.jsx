import React, { useContext, useEffect, useState } from "react";
import { Home, Layout } from "./routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, UserBook, SignUp } from "./components";
import { Context } from "./context/Context";

const App = () => {
    const { getUser } = useContext(Context);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUser(setLoading);
    }, []);

    if (loading) {
        return (
            <>
                <div>Loading</div>
            </>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index exact element={<Home />} />
                    <Route path="login" exact element={<Login />} />
                    <Route path="signup" exact element={<SignUp />} />
                    <Route path="userbook" exact element={<UserBook />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
