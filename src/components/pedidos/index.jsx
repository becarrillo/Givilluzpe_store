import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { TodoContext } from "../../context/TodoContext";
import AdminHeader from "../admin/Header";

/* eslint-disable react/react-in-jsx-scope */
const Pedidos = () => {
    const defaultMainTemplateCls = "mt-5 px-5 pt-24 h-screen";
    const defaultUlCls = "flex flex-col rounded-md ring-1 ring-zinc-600 space-y-7 p-4 h-80 bg-gray-100";
    // const pageContainerCtx = useContext(TodoContext).adminMutablePage;
    const [mainContainerCls, setMainContainerCls] = useState(defaultMainTemplateCls);
    const [ulContainerCls, setUlContainerCls] = useState(defaultUlCls);
    const apiContext = useContext(TodoContext);
    // eslint-disable-next-line quotes, no-unused-vars
    const [pedidoAttrOpt, setPedidoAttrOpt] = useState('');
    // eslint-disable-next-line quotes
    const [inputFormText, setInputFormText] = useState('');
    const [themeTogglerAction, setThemeTogglerAction] = useState(apiContext.screenThemeToggler);
    const themeTogglerRef = useRef();
    const formRef = useRef();
    
    function changeOnFormTextInput(ev) {
        setInputFormText(ev.target.value);
    }

    useEffect(() => {
        !themeTogglerAction ? (
            setThemeTogglerAction(false),
            setMainContainerCls(defaultMainTemplateCls),
            setUlContainerCls(defaultUlCls) 
        )
        : 
        (
            console.log("This is",apiContext.screenThemeToggler),
            setThemeTogglerAction(true),
            setMainContainerCls(defaultMainTemplateCls+" bg-zinc-700 text-white"),
            setUlContainerCls(defaultUlCls+" bg-slate-500")
        );
        apiContext.screenThemeToggler = themeTogglerAction;

        formRef.current.addEventListener("submit", ev => {
            ev.preventDefault();
            const data = new FormData(formRef.current);
            for(let d of data) {
                if (d[1]) {
                   console.log(d[1], " is last");
                   setPedidoAttrOpt(d[1]);
                } 
            }
        });
    }, []);

    useEffect(()=> {
        themeTogglerRef.current.addEventListener("click", ()=> {
            !themeTogglerAction ? (
                setThemeTogglerAction(true),
                setMainContainerCls(defaultMainTemplateCls+" bg-zinc-700 text-white"),
                setUlContainerCls(defaultUlCls+" bg-slate-500") 
            )
            : 
            (
                setThemeTogglerAction(false),
                setMainContainerCls(defaultMainTemplateCls),
                setUlContainerCls(defaultUlCls)
            );
            apiContext.screenThemeToggler = themeTogglerAction;
            console.log(apiContext.screenThemeToggler, " es el contexto de botón del tema")
        })
    }, [themeTogglerAction]);

    return (
        <div>
            <AdminHeader themeTogglerRef={themeTogglerRef} />
            <main className={mainContainerCls}>
                <h2>Administrador / Administrar pedidos</h2>
                <ul className={ulContainerCls}>
                    <li className="mx-auto text-sm">
                        <form className="flex flex-col space-x-11" ref={formRef} >
                            <div className="flex flex-row space-x-4 mb-4">
                                <h6>Filtrar por:</h6>
                                <div className="flex block space-x-1.5">
                                    <input type="radio" name="p-option" id="date" value="fecha" />
                                    <label htmlFor="date">fecha</label> 
                                </div>
                                
                                <div className="flex block space-x-1.5">
                                    <input type="radio" name="p-option" id="cedula" value="cédula cliente" />
                                    <label htmlFor="cedula">cédula cliente</label>
                                </div>

                                <div className="flex block space-x-1.5">
                                    <input type="radio" name="p-option" id="idPedido" value="Id pedido" />
                                    <label htmlFor="idPedido">Id pedido</label>
                                </div>
                            </div>
                            
                            <div className="flex block">
                                <input type="text" className="rounded-l-3xl shadow-sm shadow-zinc-500 text-center text-black w-36 h-8" value={inputFormText} onChange={ev => {changeOnFormTextInput(ev)}} placeholder=" pedido" />
                                <button type="submit" className="rounded-r-3xl shadow-sm shadow-zinc-500 text-sm bg-middle-blue text-white w-14 h-8 hover:bg-cyan-100 hover:text-zinc-700">Buscar</button>
                            </div>
                            
                        </form>
                    </li>
                    <li className="mx-auto cursor-pointer w-32 text-center hover:underline">Listar pedidos</li>
                    <li className="mx-auto cursor-pointer w-32 text-center hover:underline">Agregar pedido</li>
                    <li className="mx-auto cursor-pointer w-32 text-center hover:underline"><Link to="/admin">Volver</Link></li>
                </ul>
                {
                    false && (
                        <table className="mx-auto mt-2 w-9/12">
                            <thead>
                                <tr className=" bg-slate-200">
                                    <th>ID</th>
                                    <th>nombre cliente</th>
                                    <th>apellidos cliente</th>
                                    <th>teléfono</th>
                                    <th>dirección</th>
                                    <th>correo electrónico</th>
                                </tr>
                            </thead>
                            <tbody className="bg-cyan-50">
                                <tr>
                                    <td>Lorem 0</td>
                                    <td>Lorem 1</td>
                                    <td>Lorem 2</td>
                                    <td>Lorem 3</td>
                                    <td>Lorem 4</td>
                                    <td>Lorem 5</td>
                                </tr>

                            </tbody>
                        </table>
                    )
                }
                
            </main>
        </div>
    )
}

export default Pedidos;