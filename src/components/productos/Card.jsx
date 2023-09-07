/* eslint-disable quotes */
/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */
import { useContext, useState } from "react";
import { TodoContext } from "../../context/TodoContext";
import PropTypes from "prop-types";


const Card = ({ items }) => {
    function getCardCheckBoxById(id) {
        const cardCheckboxSelector = document.querySelector(`#${id}`);
        return cardCheckboxSelector;
    }
    const apiContext = useContext(TodoContext);
    const [pedidoProducts] = useState([]);
    const addProdBtnClass = "mx-2 px-2 py-1 h-7 text-sm text-white bg-green-700 hover:bg-green-600 hover:text-zinc-700";

    return (
        <div className="grid grid-cols-1 mt-4 mb-36 py-10 rounded-md">
            <ul className="grid grid-cols-1 gap-x-3 gap-y-14 ml-2 px-1 justify-self-center md:grid-cols-3 
                lg:grid-cols-4 xl:grid-cols-5 xl:space-x-7 2xl:grid-cols-4"
            >
                {
                    items.map(item => {
                        return (
                            <li
                                className="grid grid-rows-12 rounded-sm w-56 space-y-0.5 pb-1 
                                  bg-slate-200 shadow-sm shadow-zinc-500 md:48 lg:44 xl:w-48 2xl:w-44"
                                key={item["id"]}
                            >
                                <input
                                    type="checkbox"
                                    id={`check-${item["id"]}`}
                                    className="ml-auto checked:bg-cyan-700"
                                    onClick={() => {
                                        document.getElementById(`add-prod-${item["id"]}-btn`)
                                        document.getElementById(`add-prod-${item["id"]}-btn`).toggleAttribute("disabled"),
                                        document.getElementById(`add-prod-${item["id"]}-btn`).getAttribute("class") !== addProdBtnClass ? (
                                            document.getElementById(`add-prod-${item["id"]}-btn`).setAttribute("class", addProdBtnClass)
                                        ): (
                                            document.getElementById(`add-prod-${item["id"]}-btn`).setAttribute(
                                                "class",
                                                "mx-2 px-2 py-1 h-7 text-sm text-gray-100 bg-gray-400"
                                            )
                                        )
                                    }}
                                />
                                <a rel="noreferrer" href={item["foto_url"]} className="row-span-8 hover:h-fit h-auto hover:bg-cyan-500" target="_blank" >
                                    <img src={item["foto_url"]} className="h-56 hover:opacity-90 md:h-40 lg:h-48 xl:h-44" width="240" />
                                </a>
                                <div className="row-span-2 text-center text-sm text-cyan-900 mx-auto my-5 py-8 w-32 h-28">
                                    <h5 className="font-bold justify-self-center italic overflow-x-scroll w-32 h-16">{item["detalle"]}</h5>
                                </div>
                                <div className="flex flex-row ml-1 place-content-around xl:ml-3">
                                    <p>{"$" + item["precio"]}</p>
                                    <span className="text-orange-600 font-semibold">{item["cantidad"]} un.</span>
                                </div>
                                <button
                                    className={addProdBtnClass}
                                    onClick={ev => {
                                        pedidoProducts.push(item["id"]),
                                            apiContext.productosIdPedido = pedidoProducts,
                                            getCardCheckBoxById(`check-${item["id"]}`).checked = true,
                                            ev.currentTarget.toggleAttribute("disabled", true),
                                            ev.currentTarget.setAttribute(
                                                "class",
                                                "mx-2 px-2 py-1 h-7 text-sm text-gray-100 bg-gray-400"
                                            ),
                                            console.log(ev.currentTarget.id, " is the ID!!!!")
                                    }}
                                    id={`add-prod-${item["id"]}-btn`}
                                >
                                    Agregar al pedido
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