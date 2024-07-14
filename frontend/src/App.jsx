import React from "react";
import { Home, Layout } from "./routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, UserBook, SignUp } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index exact element={<Home />} />
          <Route path="about" exact element={"About Page"} />
          <Route path="login" exact element={<Login />} />
          <Route path="signup" exact element={<SignUp />} />
          <Route path="userbook" exact element={<UserBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
