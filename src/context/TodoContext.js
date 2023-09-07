/* eslint-disable quotes */
import { createContext } from "react";
import api from "../firebase";

export const TodoContext = createContext({
    fb: api,
    user: null,
    productObj: null,
    productFilterResult: null,
    pagination: null,
    productosIdPedido: null,
    screenThemeToggler: null
});

// eslint-disable-next-line react/prop-types
export const TodoProv = ({ children }) => {

    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <TodoContext.Provider value={{
            fb: api,
            user: null,
            productObj: null,
            productFilterResult: null,
            pagination: null,
            productosIdsPedido: null,
            screenThemeToggler: null
        }}>
            {children}
        </TodoContext.Provider>
    )
}