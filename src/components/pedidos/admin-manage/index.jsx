/* eslint-disable quotes */
import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { TodoContext } from "../../../context/TodoContext";
import AdminHeader from "../../admin/Header";
import { FiEdit3 } from "react-icons/fi";
import { BsEraserFill } from "react-icons/bs";
import { RiArrowLeftRightLine } from "react-icons/ri";

/* eslint-disable react/react-in-jsx-scope */
const Pedidos = () => {
    const defaultMainTemplateCls = "flex flex-col px-5 pt-24 h-screen";
    const defaultUlCls = "flex flex-col rounded-md ring-1 ring-zinc-600 space-y-3 px-4 py-2 h-80 ";
    const [mainContainerCls, setMainContainerCls] = useState(defaultMainTemplateCls);
    const [ulContainerCls, setUlContainerCls] = useState(defaultUlCls);
    const apiContext = useContext(TodoContext);
    // eslint-disable-next-line quotes, no-unused-vars
    const [pedidoAttrOpt, setPedidoAttrOpt] = useState('');
    // eslint-disable-next-line quotes
    const [inputFormText, setInputFormText] = useState('');
    const [themeTogglerAction, setThemeTogglerAction] = useState(apiContext.screenThemeToggler);
    const [pedidosQueryResult] = useState([]);
    const [radiOptionIsCkecked, setRadiOptionIsChecked] = useState(false);
    const [filterIsFound, setFilterIsFound] = useState(false);
    const [filterIsSubmitted, setFilterIsSubmitted] = useState(false);
    const [filteredPedido, setFilteredPedido] = useState([]);
    const [filteredPedidosWithQuery, setFilteredPedidosWithQuery] = useState([]);
    let [isFilteredByPedidoId, setIsFilteredByPedidoId] = useState(false);
    const [listingPedidosBtnSt, setListingPedidosBtnSt] = useState(false);
    const themeTogglerRef = useRef();
    const formRef = useRef();
    const toListPedidosRef = useRef();
    const submitButtonInitCls = "rounded-r-3xl shadow-sm shadow-zinc-500 text-sm";

    function changeOnFormTextInput(ev) {
        setInputFormText(ev.target.value);
    }
    
    function editPedido(pedidoId) {
        console.log(pedidoId);
    }

    async function getPedidoById(id) {
        const asyncSnapshot = await apiContext.fb.getPedido(id);
        if (!(asyncSnapshot === null)) setFilterIsFound(true)
        else {
            setFilterIsFound(false);
            if (filterIsSubmitted) window.alert("El pedido no se encontró");
            window.location = '/admin/pedidos';
        }
        return asyncSnapshot;
    }

    async function manageAsyncPedidosQueryWithClientCedula(cedulaInput) {
        const asyncSnapshot = await apiContext.fb.getPedidosByClientCedula(cedulaInput);
        return asyncSnapshot;
    }

    async function manageAsyncPedidoQueryWithTelefono(telefonoInput) {
        const asyncSnapshot = await apiContext.fb.getPedidosByClientTelefono(telefonoInput);
        if (!asyncSnapshot) return null
        else return asyncSnapshot;
    }
    
    function deletePedido(pedidoId) {
        const confirm = window.confirm("¿Seguro(a) que deseas borrar éste registro de pedido?");
        if (confirm) {
            apiContext.fb.removePedido(pedidoId),
            window.alert("1 Registro borrado exitosamente")
        }
    }

    useEffect(() => {
        formRef.current.addEventListener("submit", ev => {
            ev.preventDefault();
            const value = document.querySelector('input[name="p-option"]:checked').value;
            setPedidoAttrOpt(value);
            setRadiOptionIsChecked(true);
            setFilterIsSubmitted(true);
        });
    }, []);

    useEffect(() => {
        (async () => {
            const resultWithClientCedula = await manageAsyncPedidosQueryWithClientCedula(inputFormText);
            const resultWithPedidoId = await getPedidoById(inputFormText);
            const resultWithTelefono = await manageAsyncPedidoQueryWithTelefono(inputFormText);

            switch (pedidoAttrOpt) {
                // When chosen attr is not pedido id, then we asign it to filteredPedidoWithQuery state
                case "client_cedula":
                    isFilteredByPedidoId(false);
                    console.log(...resultWithClientCedula, " is the result with client client cedula")
                    setFilteredPedidosWithQuery(resultWithClientCedula);
                    break;
                case "id":
                    // Here there is a state for any pedido id result when the attr chosen is pedido id
                    setIsFilteredByPedidoId(true);
                    setFilteredPedido([resultWithPedidoId]);
                    break;
                case "tel":
                    setIsFilteredByPedidoId(false);
                    console.log(resultWithTelefono, " is with tel!")
                    setFilteredPedidosWithQuery(resultWithTelefono);
            }
        })();
    }, [pedidoAttrOpt]);

    useEffect(() => {
        themeTogglerRef.current.addEventListener("click", () => {
            !themeTogglerAction && !apiContext.screenThemeToggler ? (
                setThemeTogglerAction(false),
                setMainContainerCls(defaultMainTemplateCls),
                setUlContainerCls(defaultUlCls + "bg-gray-100")
            )
                :
                (
                    setThemeTogglerAction(true),
                    setMainContainerCls(defaultMainTemplateCls + " bg-zinc-700 text-white"),
                    setUlContainerCls(defaultUlCls + "bg-slate-400")
                );
            apiContext.screenThemeToggler = themeTogglerAction;
        })
    }, [themeTogglerAction]);

    return (
        <div>
            <AdminHeader themeTogglerRef={themeTogglerRef} />
            <main className={mainContainerCls}>
                <h2>Administrador / Administrar pedidos</h2>
                <ul className={ulContainerCls}>
                    <li className="mx-auto mb-4 text-sm">
                        <form className="flex flex-col" ref={formRef} >
                            <h5>Filtrar por:</h5>
                            <div className="flex flex-row space-x-2 mr-auto mb-4">
                                <div className="flex space-x-1.5">
                                    <input
                                        type="radio"
                                        name="p-option"
                                        id="client_cedula"
                                        value="client_cedula"
                                        onClick={() => { setRadiOptionIsChecked(true) }}
                                    />
                                    <label htmlFor="client_cedula">cédula cliente</label>
                                </div>

                                <div className="flex space-x-1.5">
                                    <input
                                        type="radio"
                                        name="p-option"
                                        id="id"
                                        value="id"
                                        onClick={() => { setRadiOptionIsChecked(true) }}
                                    />
                                    <label htmlFor="id">Id pedido</label>
                                </div>

                                <div className="flex space-x-1.5">
                                    <input
                                        type="radio"
                                        name="p-option"
                                        id="tel"
                                        value="tel"
                                        onClick={() => { setRadiOptionIsChecked(true) }}
                                    />
                                    <label htmlFor="tel">teléfono</label>
                                </div>
                            </div>

                            <div className="flex">
                                <input
                                    type="text"
                                    className="rounded-l-3xl shadow-sm shadow-zinc-500 text-center text-black w-56 h-8 md:w-80 lg:w-96 xl:w-5/6 2xl:w-11/12"
                                    value={inputFormText}
                                    onChange={ev => { changeOnFormTextInput(ev) }}
                                    placeholder=" dato del pedido"
                                />
                                <button
                                    type="submit"
                                    className={
                                        !radiOptionIsCkecked ?
                                            submitButtonInitCls + " bg-gray-200 text-white w-16 h-8"
                                            :
                                            submitButtonInitCls + " w-16 h-8 bg-cyan-100 text-zinc-700 hover:bg-zinc-600 hover:text-maximum-green-yellow"
                                    }
                                    disabled={!radiOptionIsCkecked}
                                >
                                    Buscar
                                </button>
                            </div>
                        </form>
                    </li>
                    <li className="flex flex-row ml-2 text-zinc-700">
                        <span className="italic">Resultado(s)</span>
                        <RiArrowLeftRightLine className="ml-1" />
                    </li>

                    {!filterIsSubmitted && <hr className="mx-auto w-11/12" />}

                    <li className="relative overflow-x-auto">
                        <table className="w-full mx-auto">
                            <thead>
                                {
                                    pedidosTableHead()
                                }
                            </thead>
                            <tbody>
                                {
                                    filterIsSubmitted && filterIsFound && (
                                        isFilteredByPedidoId ? (
                                            filteredPedido.map(f => {
                                                return (
                                                    <tr key={f.id}>
                                                        <td>{f.id}</td>
                                                        <td>{f.data().client_cedula}</td>
                                                        <td>{f.data().client_nombre}</td>
                                                        <td>{f.data().tel}</td>
                                                        <td>{f.data().dir}</td>
                                                        <td>{f.data().municipio}</td>
                                                        <td>{f.data().email}</td>
                                                        <td className="pr-3">
                                                            <div className="flex flex-row">
                                                                <button 
                                                                    className="rounded-sm bg-zinc-500 px-1 py-1 text-sm 
                                                                    text-white hover:bg-air-super-blue"
                                                                    onClick={() => {editPedido(f.id)}}
                                                                >
                                                                    <FiEdit3 />
                                                                </button>
                                                                <button 
                                                                    className="rounded-sm bg-red-500 px-1 py-1 text-sm 
                                                                    text-white hover:bg-french-rose"
                                                                    onClick={() => {deletePedido(f.id)}}
                                                                >
                                                                    <BsEraserFill />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })

                                        ) : filteredPedidosWithQuery.map(pedido => {
                                            return (
                                                <tr key={pedido.id}>
                                                    <td>{pedido.id}</td>
                                                    <td>{pedido.data()["fecha_hora"]}</td>
                                                    <td>{pedido.data()["client_cedula"]}</td>
                                                    <td>{pedido.data()["client_nombre"]}</td>
                                                    <td>{pedido.data()["tel"]}</td>
                                                    <td>{pedido.data()["dir"]}</td>
                                                    <td>{pedido.data()["municipio"]}</td>
                                                    <td>{pedido.data()["email"]}</td>
                                                    <td>
                                                        <div className="flex flex-row">
                                                            <button 
                                                                className="rounded-sm bg-zinc-500 px-1 py-1 text-sm
                                                                  text-white hover:bg-air-super-blue"
                                                                onClick={() => {editPedido(pedido.id)}}
                                                            >
                                                                <FiEdit3 />
                                                            </button>
                                                            <button 
                                                                className="rounded-sm bg-red-500 px-1 py-1 text-sm 
                                                                  text-white hover:bg-french-rose"
                                                                onClick={() => {deletePedido(pedido.id)}}
                                                            >
                                                                <BsEraserFill />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )
                                }
                            </tbody>
                        </table>
                    </li>
                </ul>
                <div className="justify-end mx-auto">
                    <button
                        type="button"
                        className="mx-auto w-32 text-center cursor-pointer hover:underline"
                        ref={toListPedidosRef}
                        onClick={async () => {
                            setListingPedidosBtnSt(true);
                            const pedidos = await apiContext.fb.getPedidos();
                            pedidosQueryResult.push(...pedidos);
                        }
                        }
                    >
                        Listar pedidos
                    </button>

                    <button 
                        className="mx-auto cursor-pointer w-32 text-center hover:underline"
                    >
                        <a 
                            href="#new-pedido-modal"
                            rel="modal:open"
                        >
                            Agregar pedido
                        </a>
                    </button>

                    <button className="mx-auto cursor-pointer w-32 text-center hover:underline"><Link to="/admin">Volver</Link></button>
                </div>
                {
                    filterIsFound && listingPedidosBtnSt && (
                        <table className="mx-auto mt-2 w-11/12">
                            <thead>
                                {
                                    pedidosTableHead()
                                }
                            </thead>
                            <tbody className="bg-cyan-50 text-zinc-700">
                                {
                                    filterIsFound && pedidosQueryResult.map(p => {
                                        return (
                                            <tr key={p.id} className="flex justify-between">
                                                <td>{p.id}</td>
                                                <td>{p.data()["fecha_hora"]}</td>
                                                <td>{p.data()["client_cedula"]}</td>
                                                <td>{p.data()["client_nombre"]}</td>
                                                <td>{p.data()["tel"]}</td>
                                                <td>{p.data()["municipio"]}</td>
                                                <td>{p.data()["dir"]}</td>
                                                <td>{p.data()["email"]}</td>
                                                <td>
                                                    <div className="grid grid-rows-2">
                                                        <button
                                                            className="rounded-sm bg-zinc-500 px-1 py-1 
                                                              text-sm text-white hover:bg-air-super-blue"
                                                            onClick={() => {editPedido(p.id)}}
                                                        >
                                                            <FiEdit3 />
                                                        </button>

                                                        <button
                                                            className="rounded-sm bg-red-500 px-1 py-1
                                                              text-sm text-white hover:bg-french-rose"
                                                            onClick={() => {deletePedido(p.id)}}
                                                        >
                                                            <BsEraserFill />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    )
                }
            </main>
        </div>
    )
}

const pedidosTableHead = () => {
    return (
        <tr className="bg-slate-200">
            <th>ID</th>
            <th>Cédula cliente</th>
            <th>Nombre cliente</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Municipio</th>
            <th>Email</th>
            <th>Acción</th>
        </tr>
    )
}

export default Pedidos;