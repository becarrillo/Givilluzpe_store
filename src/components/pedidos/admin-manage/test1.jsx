/* eslint-disable react/react-in-jsx-scope */
const { useState, useContext } = require("react");
import { TodoContext } from "../../../context/TodoContext";
import { BsEraserFill } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";


const Test1 = () => {
    // eslint-disable-next-line quotes
    const [id, setId] = useState('');
    const contextApi = useContext(TodoContext);

    async function handleSubmit(ev) {
        ev.preventDefault();
        //console.log(...await contextApi.fb.getPedidosByClientTelefono(tel));
        console.log(await contextApi.fb.getPedido(id));
    }

    return (
        <div className="justify-center">
            <h2>Éste formulario es de prueba</h2>
            <form onSubmit={ev => {handleSubmit(ev)}}>
                <input type="text" placeholder="id pedido" onChange={ev => {
                    setId(ev.target.value),
                    contextApi.filteredPedido = true
                }}
                />
                <button
                    className="px-5 py-1 text-maximum-green-yellow font-semibold 
                      bg-cyan-900 hover:bg-cyan-800"
                >
                    OK
                </button>
            </form>
            <pre>
                {
                    (contextApi.filteredPedido !== null) && (
                        <table>
                            <thead>
                                <tr>
                                    <thead>
                                        <tr className="flex justify-between bg-slate-200">
                                            <th>ID</th>
                                            <th>Fecha creación</th>
                                            <th>Cédula cliente</th>
                                            <th>Nombre completo cliente</th>
                                            <th>Teléfono</th>
                                            <th>Dirección</th>
                                            <th>Municipio</th>
                                            <th>Correo electrónico</th>
                                            <th>Acción</th>
                                        </tr>
                                    </thead>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>{contextApi.filteredPedido.id}</td>
                                    <td>{contextApi.filteredPedido.data()["fecha_hora"]}</td>
                                    <td>{contextApi.filteredPedido.data()["client_cedula"]}</td>
                                    <td>{contextApi.filteredPedido.data()["client_nombre"]}</td>
                                    <td>{contextApi.filteredPedido.data()["tel"]}</td>
                                    <td>{contextApi.filteredPedido.data()["dir"]}</td>
                                    <td>{contextApi.filteredPedido.data()["municipio"]}</td>
                                    <td>{contextApi.filteredPedido.data()["email"]}</td>
                                    <td>
                                        <div className="flex flex-row">
                                            <button className="rounded-sm bg-zinc-500 px-1 py-1 text-sm text-white hover:bg-air-super-blue"><FiEdit3 /></button>
                                            <button className="rounded-sm bg-red-500 px-1 py-1 text-sm text-white hover:bg-french-rose"><BsEraserFill /></button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )
                }
            </pre>
        </div>
    )
}

export default Test1;