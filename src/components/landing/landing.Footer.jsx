/* eslint-disable react/react-in-jsx-scope */
import { FaCopyright } from "react-icons/fa";


function Footer() {
    return (
        <>
            <footer className="self-center pt-0 pb-7">
                <div className="flex flex-row text-sm space-x-2">

                    Desarrollador : <FaCopyright className="mt-1 ml-4" />
                    <span>
                        Brando Elí Carrillo Pérez
                    </span>
                </div>
            </footer>
        </>
    )
}

export default Footer;