import axios from "axios";
import { createContext } from "react";
import { useDispatch } from "react-redux";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  return (
    <Context.Provider value={{ hello: "world" }}>{children}</Context.Provider>
  );
};
