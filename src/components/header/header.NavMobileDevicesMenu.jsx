import { Link } from "react-router-dom";

/* eslint-disable react/react-in-jsx-scope */
const NavMobileDevicesMenu = () => {

    return (
        <nav className="grid grid-rows-5 rounded-2xl bg-zinc-200 fixed top-20 w-11/12 opacity-80 left-1">
            <ul className="row-span-5 divide-y divide-zinc-600 w-5/6 sm:w-full">
                <li className="px-2 py-1 text-center bg-white ring-1 ring-zinc-600 rounded-2xl shadow-lg 
                shadow-french-rose hover:bg-cyan-200 active:cursor-pointer hover:text-french-rose"
                >
                    <Link to="/#" className="text-zinc-600 my-0 px-44 font-semibold italic hover:text-french-rose">Inicio</Link>
                </li>
                <li className="text-center mx-auto py-1 bg-white ring-1 ring-zinc-600 rounded-2xl shadow-lg shadow-french-rose 
                hover:ring-zinc-600 hover:bg-cyan-100 active:cursor-pointer hover:text-french-rose"
                >
                    <Link to="/#" className="text-zinc-600 my-0 px-32 py-2 font-semibold italic hover:text-french-rose">Nosotros</Link>
                </li>
                <li className="text-center py-1 bg-white ring-1 ring-zinc-600 rounded-2xl shadow-lg shadow-french-rose hover:bg-cyan-100 
                active:cursor-pointer hover:text-french-rose"
                >
                    <Link to="/#" className="text-zinc-600 my-0 px-32 py-2 font-semibold italic hover:text-french-rose">Novedades</Link></li>
                <li className="text-center py-1 bg-white ring-1 ring-zinc-600 rounded-2xl shadow-lg shadow-french-rose 
                hover:bg-cyan-100 active:cursor-pointer hover:text-french-rose"
                >
                    <Link to="/admin" className="text-zinc-600 my-0 px-32 py-2 font-semibold italic hover:text-french-rose">Administrador</Link>
                </li>
                <li className="text-center w-auto bg-white ring-1 ring-zinc-600 rounded-2xl shadow-lg shadow-french-rose 
                hover:bg-cyan-100 hover:text-french-rose active:cursor-pointer active:text-french-rose px-2 py-1"
                >
                    <Link to="/#" className="text-zinc-600 my-0 w-40 px-24 py-2 font-semibold italic hover:text-french-rose sm:px-32">Estado de pedido</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavMobileDevicesMenu;