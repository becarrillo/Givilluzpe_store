/* eslint-disable react/react-in-jsx-scope */
// import { useRef } from "react";
import { ImHome } from "react-icons/im";
import { FcExpand } from "react-icons/fc";
import { WiMoonAltWaxingCrescent5 } from "react-icons/wi";


const Header = ({themeTogglerRef}) => {

    return (
        <header className="grid grid-cols-4 bg-cyan-100 shadow-sm shadow-cyan-200 justify-items-strech justify-self-start w-screen h-14 py-4 fixed top-0">
            <a className="rounded-2xl justify-self-start shadow-md shadow-zinc-500 text-cyan-600 font-bold 
            ml-1 mt-0 px-3 py-1 w-24 h-8 hover:bg-zinc-200 hover:text-french-rose md:ml-3 lg:ml-3 xl:ml-2 2xl:ml-3" href="/"
            >
                <span className="flex flex-row">Inicio <ImHome className="ml-2 mt-1" /></span>
            </a>
            <div className="col-span-2 flex flex-row justify-self-end space-x-1.5 ml-auto mt-0 md:space-x-3 lg:space-x-4 xl:space-x-9 xl:text-lg 2xl:space-x-16">
                <a href="/" className="flex flex-row rounded-lg text-center text-smd text-cyan-600 ml-7 hover:text-blue-300 font-semibold italic 
                md:text-sm lg:flex-row lg:text-md xl:flex-row xl:text-lg 2xl:flex-row 2xl:text-lg"
                >
                    Agregar administradores
                </a>
                <a href="/" className="flex flex-col rounded-md text-center text-smd text-cyan-600 ml-7 hover:text-blue-300 
                font-semibold italic md:flex-row md:text-sm lg:flex-row lg:text-md xl:flex-row xl:text-lg 2xl:flex-row 2xl:text-lg"
                >
                    Herramientas <FcExpand className="mx-auto my-1 text-sm text-cyan-600 md:ml-2 lg:ml-2 xl:ml-1 2xl:ml-1" />
                </a>
            </div>
            <button className="flex block ml-8 p-1 rounded-sm ring-2 ring-wisteria bg-zinc-600 text-cyan-50 w-28 h-8 hover:bg-cyan-50 hover:text-zinc-700 hover:ring-french-rose" ref={themeTogglerRef}>
                <span className="ml-5">Modo</span>
                <WiMoonAltWaxingCrescent5 className="ml-auto text-xl" />
            </button>
        </header>
    )
}

export default Header;