/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */
import { Suspense } from "react";
import PropTypes from "prop-types";


const Productos = ({ items }) => {

    return (
        <ul className="mt-4 mb-36 py-10 rounded-md">
            <Suspense fallback={<div className="rounded-sm bg-cyan-900 shadow-xl shadow-french-rose h-max-screen"><h6 className="text-center text-xl text-white">Cargando items ...</h6></div>}>
                <li className="grid grid-rows-2 grid-cols-2 gap-y-14 ml-4 px-1">
                    {
                        // eslint-disable-next-line react/prop-types
                        items.map(element => {
                            return (
                                <div className="grid grid-rows-12 rounded-sm w-32 bg-slate-200 h-full rounded-sm shadow-sm shadow-zinc-500 xl:w-44" key={element["id"]}>
                                    <a rel="noreferrer" href={element["foto_url"]} className="row-span-7 hover:h-fit h-auto hover:bg-cyan-500" target="_blank" >
                                        <img src={element["foto_url"]} className="h-36 hover:opacity-90 xl:h-48" width="224" />
                                    </a>
                                    <h5 className="text-center text-sm font-bold pt-1 justify-self-center">{element["detalle"]}</h5>
                                    <div className="row-span-4 ml-1 xl:ml-3">
                                        <span>{"$" + element["precio"]}</span>
                                        <button className="mt-3 px-3 py-1 text-white bg-green-700 hover:bg-green-600">Hacer pedido</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </li>
            </Suspense>
        </ul>
    )
}

Productos.PropTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array
}

export default Productos;