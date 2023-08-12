/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TodoContext } from "../../../context/TodoContext";
import { GiClothes } from "react-icons/gi";


const Pedidos = () => {
    const contextApi = useContext(TodoContext);
    // eslint-disable-next-line quotes
    const [searchValue, setSearchValue] = useState({});
    const [pedidoProductsList] = useState([]);
    const location = useLocation();

    useEffect(() => {
        // eslint-disable-next-line quotes
        const myQuery = decodeURI(location.search["pedidos-selection"].replace('+', ' '));
        
        (async () => {
            const myPedidoById = await contextApi.fb.getPedido(myQuery);
            const myPedidoByClientTelefono = await contextApi.fb.getPedidoByClientTelefono(myQuery);
            const myPedidoByClientNombreComp = await contextApi.fb.getPedidoByClientNombreCompleto(myQuery);
            
            switch (myQuery) {
                case "Nombre completo":
                    setSearchValue(
                        {
                            "id": myPedidoByClientNombreComp.id,
                            "fullname": myPedidoByClientNombreComp.data()["fullname"],
                            "phone": myPedidoByClientNombreComp.data()["telefono"],
                            "address": myPedidoByClientNombreComp.data()["direccion"],
                            "town": myPedidoByClientNombreComp.data()["municipio"],
                            "products_ids": myPedidoByClientNombreComp.data()["products_ids"]
                        }
                    )
                    break;
                case "Teléfono":
                    setSearchValue(
                        {
                            "id": myPedidoByClientTelefono.id,
                            "fullname": myPedidoByClientTelefono.data()["fullname"],
                            "phone": myPedidoByClientTelefono.data()["telefono"],
                            "address": myPedidoByClientTelefono.data()["direccion"],
                            "town": myPedidoByClientTelefono.data()["municipio"],
                            "products_ids": myPedidoByClientTelefono.data()["products_ids"]
                        }
                    );
                    break;
                case "Id de pedido":
                    setSearchValue(
                        {
                            "id": myPedidoById.id,
                            "fullname": myPedidoById.data()["fullname"],
                            "phone": myPedidoById.data()["telefono"],
                            "address": myPedidoById.data()["direccion"],
                            "town": myPedidoById.data()["municipio"],
                            "products_ids": myPedidoById.data()["products_ids"]
                        }
                    );
            }
        })();

        searchValue["products_ids"].forEach(async (pId) => {
            const clientProducts = await contextApi.fb.getProductoByRef(pId);

            pedidoProductsList.push(clientProducts);
        })
    }), [];

    return (
        <div className="flex flex-col p-14 bg-zinc-200">
            <div className="space-3 overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Información del pedido</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Datos de pedido con los productos listados para la entrega</p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Id</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{searchValue["id"]}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Nombre cliente</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{searchValue["fullname"]}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Dirección</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{searchValue["address"]}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Municipio</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{searchValue["town"]}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Número telefónico</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{searchValue["phone"]}Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Productos solicitados</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <ul role="list" className="flex flex-col divide-y divide-gray-200 
                              rounded-md border border-gray-200 overflow-y-auto"
                            >
                                {
                                    pedidoProductsList.map(product => {
                                        return (
                                            <li 
                                                className="flex items-center justify-between py-3 pl-3 pr-4 text-sm" 
                                                key={product["referencia"]}
                                            >
                                                <div className="flex w-0 flex-1 items-center">
                                                    <GiClothes />
                                                    <span className="ml-2 w-0 flex-1 truncate">{product["detalle"]}</span>
                                                    <span className="ml-1 text-french-rose font-semibold font-sans">{product["price"]}</span>
                                                </div>
                                                <img className="rounded-3xl w-10 h-10" src={product["foto_url"]} />
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </dd>
                    </div>
                    </dl>
                </div>
            </div>
        </div>
        
    )
}

export default Pedidos;