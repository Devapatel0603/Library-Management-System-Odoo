import React from "react";
import { Home, Layout } from "./routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components";
import {Signup} from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index exact element={<Home />} />
          <Route path="about" exact element={"About Page"} />
          
          <Route path="login" exact element={<Login/>} />
          <Route path="signup" exact element={<Signup/>} />
          <Route path="contact" exact element={"Contact Page"} />
          <Route path="blog" exact element={"Blog Page"} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
