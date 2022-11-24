/* eslint-disable quotes */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { TodoContext } from "../../context/TodoContext";
import "./style.css";


const Auth = () => {
    const [admin, setAdmin] = useState('');
    const [password, setPassword] = useState('');
    const [adminToken, setAdminToken] = useState(false);
    const contextApi = useContext(TodoContext);
    function handSubmit(ev) {
        ev.preventDefault();
        if (admin.length > 0 || password.length > 0) {
            (admin === contextApi.admin && password === contextApi.password) ? 
            setAdminToken(true) : window.alert("Datos incorrectos, inténtelo nuevamente");
        } else alert("No se ha ingresado un dato en algún campo, verifique");
    }
    
    if (!adminToken) {
        contextApi.isAuth = false;

        return (
            <div className="grid grid-rows-12 admin-cont pt-16 h-max-full h-screen">
                <h1 className="justify-self-center text-xl text-white md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl">PORTAL ADMINISTRADORES</h1>
                <div className="row-span-10 bg-slate-300 mx-auto my-0 px-7 py-28 rounded-md w-auto h-5/6 
                shadow-xl shadow-zinc-900">
                    <h4 className="text-xl text-center font-semibold">Ingresar</h4>
                    <form className="mt-9 space-x-3 space-y-9 w-auto justify-items-center lg:w-72 xl:w-80 xl:px-2 xl:h-96 xl:space-y-11 
                    2xl:w-96 2xl:h-96 2xl:pt-8" onSubmit={ev => {
                        handSubmit(ev)
                    }}
                    >
                        <div className="flex flex-col ml-2 space-y-1.5">
                            <label>Administrador</label>
                            <input type="text" value={admin} placeholder="¿Eres admin? ingresa usuario" className="py-1" onChange={ev => {setAdmin(ev.target.value)}} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <label>Contraseña</label>
                            <input type="password" value={password} placeholder="************" className="py-1" onChange={ev => {setPassword(ev.target.value)}} />
                        </div>
                        <div className="flex flex-col w-auto text-center px-8">
                            <input type="submit" className="rounded-lg bg-green-600 text-white px-4 py-2 cursor-pointer" />
                        </div>
                    </form>
                </div>
                <span className="justify-self-end pr-40 text-2xl text-white font-semibold" id="span-page">22 pedidos en el día de hoy</span>
            </div>
        )
    }

    contextApi.isAuth = true;
    return <Outlet />;
}

export default Auth;