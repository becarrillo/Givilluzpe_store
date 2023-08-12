/* eslint-disable react/react-in-jsx-scope */
import { FaCopyright } from "react-icons/fa";


function Footer() {
    return (
        <>
            <footer className="flex flex-col w-full h-44 space-y-7 pt-9 pb-7" id="footer">
                <p className="text-center text-sm text-pink-100">Tienda virtual, nos ubicamos en Barranquilla, Atlántico, Colombia</p>
                <div className="flex flex-row text-sm text-pink-100 justify-center space-x-1.5">
                    
                    Desarrollador : <FaCopyright className="mt-1 ml-4" />
                    <span className="italic ">
                        Brando Elí Carrillo Pérez
                    </span>
                </div>
                <span className="self-center text-md text-cyan-50 font-semibold">2023</span>
            </footer>
        </>
    )
}

export default Footer;