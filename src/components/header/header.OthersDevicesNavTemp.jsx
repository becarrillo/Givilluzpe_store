/* eslint-disable react/react-in-jsx-scope */
import { Link } from "react-router-dom";

const OthersDevicesNavTemp = () => {

    return (
        <nav className="invisible bg-white mt-0 mb-0 mx-auto px-6 py-2 w-11/12 h-1 rounded-3xl shadow-lg ring-2 ring-zinc-700 shadow-french-rose md:visible 
        md:h-12 lg:visible lg:h-12 xl:visible xl:h-12 2xl:visible 2xl:h-12"
        >
            <ul className="grid grid-cols-12 invisible text-start space-x-4 md:visible lg:visible lg:text-center xl:visible xl:text-center 2xl:text-center">
                <li className="col-span-2">
                    <Link to="/home" className="text-sm text-air-super-blue font-semibold italic underline hover:text-middle-blue
                    px-5 py-3 md:text-lg lg:text-lg xl:text-lg 2xl:text-xl"
                    >
                        Inicio
                    </Link>
                </li>
                <li className="col-span-2 w-auto">
                    <Link to="/#" className="text-sm text-air-super-blue font-semibold italic underline hover:text-middle-blue
                    px-0 py-3 md:text-lg lg:text-lg xl:text-lg 2xl:text-xl"
                    >
                        Nosotros
                    </Link>
                </li>
                <li className="col-span-2">
                    <Link to="/#" className="text-sm text-center text-air-super-blue font-semibold italic underline hover:text-middle-blue
                    hover:rounded-sm px-5 py-3 md:text-lg lg:text-lg xl:text-lg 2xl:text-xl"
                    >
                        Cómo pedir
                    </Link>
                </li>
                <li className="col-span-2">
                    <Link to="/admin" className="text-sm text-air-super-blue font-semibold italic underline hover:text-middle-blue
                    hover:rounded-sm px-1 py-3 active:ring-1 active:ring-black active:bg-slate-300 active:text-french-rose lg:text-lg xl:text-lg 2xl:text-xl"
                    >
                        Administrador
                    </Link>
                </li>
                <li className="col-span-2">
                    <Link to="/#" className="text-sm text-air-super-blue font-semibold italic underline 
                    hover:text-middle-blue hover:rounded-sm md:text-lg px-0 py-3 lg:text-lg xl:text-lg 2xl:text-lg"
                    >
                        Estado pedido
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default OthersDevicesNavTemp;