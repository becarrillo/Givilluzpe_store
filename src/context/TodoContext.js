import { createContext } from "react";
import api from "../firebase";
// import data from "./productos.json";

export const TodoContext = createContext({
    productos: api.getProductos()
        .then(data => { return data })
        .catch(err => { throw new Error("Error " + err) }),
    admin: "cuasar01",
    password: "123456",
    isAuth: false
});

// eslint-disable-next-line react/prop-types
export const TodoProv = ({ children }) => {

    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <TodoContext.Provider value={{
            productos: api.getProductos()
                .then(data => { return data })
                .catch(err => { throw new Error("Error " + err) }),
            
            admin: "cuasar01",
            password: "123456",
            isAuth: false
        }}>
            {children}
        </TodoContext.Provider>
    )
}