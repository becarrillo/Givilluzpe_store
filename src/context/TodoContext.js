/* eslint-disable quotes */
import { createContext } from "react";
import api from "../firebase";
// import data from "./productos.json";

export const TodoContext = createContext({
    fb: api,
    admin: "1",
    password: "1",
    isAuth:false,
    screenThemeToggler: false,
    productObj: null
});

// eslint-disable-next-line react/prop-types
export const TodoProv = ({ children }) => {

    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <TodoContext.Provider value={{
            fb: api,
            admin: "1",
            password: "1",
            isAuth: false,
            screenThemeToggler: false,
            productObj: null
        }}>
            {children}
        </TodoContext.Provider>
    )
}