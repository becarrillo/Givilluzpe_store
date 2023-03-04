/* eslint-disable quotes */
/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */
import { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";
import PropTypes from "prop-types";


const Card = ({ items }) => {
    const contextApi = useContext(TodoContext);

    return (
        <div className="mt-4 mb-36 py-10 rounded-md">
            <ul className="grid grid-cols-1 gap-y-14 ml-2 px-1 md:grid-cols-3 
                lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4"
            >
                {
                    items.map(item => {
                        return (
                            <li 
                                className="grid grid-rows-12 rounded-sm w-44 space-y-0.5 pb-1 bg-slate-200 shadow-sm shadow-zinc-500 xl:w-44" 
                                key={item["id"]}
                            >
                                <a rel="noreferrer" href={item["foto_url"]} className="row-span-8 hover:h-fit h-auto hover:bg-cyan-500" target="_blank" >
                                    <img src={item["foto_url"]} className="h-40 hover:opacity-90 xl:h-44" width="210" />
                                </a>
                                <div  className="row-span-2 text-center text-sm text-cyan-900 mx-auto my-5 py-8 w-32 h-28">
                                    <h5 className="font-bold justify-self-center italic overflow-x-scroll w-32 h-16">{item["detalle"]}</h5>
                                </div>
                                <div className="flex flex-row ml-1 space-x-11 xl:ml-3">
                                    <p>{"$" + item["precio"]}</p>
                                    <span className="text-orange-600 font-semibold">{item["cantidad"]}</span>
                                </div>
                                <button 
                                    className="mx-2 px-2 py-1 h-7 text-sm text-white bg-green-700 hover:bg-green-600"
                                >
                                    <a href={`/pedidos/pedido/nuevo/${item["id"]}`} onClick={() => {contextApi.setIdProductoPedido = item["id"]}}>Hacer pedido</a>
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

Card.PropTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array
}

export default Card;