/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState, useRef, useContext, Suspense } from "react";
import { TodoContext } from "../../context/TodoContext";
import { Link } from "react-router-dom";
import PageHeader from "./admin.Header";
import { BiPlus } from "react-icons/bi";
import { MdOutlineSearch } from "react-icons/md";
import { MdDoorBack } from "react-icons/md";
import { IoIosChatboxes } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { IoTimer } from "react-icons/io5";
import { RiCalendarTodoFill } from "react-icons/ri";
import { IoAccessibilityOutline } from "react-icons/io5";


const Desktop = () => {
    const [productos, setProductos] = useState([{}]);
    const [newDateAndTime, setNewDateAndTime] = useState('');
    const [actionShowedPList, setActionShowedList] = useState(false);
    const [themeTogglerAction, setThemeTogglerAction] = useState(false);
    const contextApi = useContext(TodoContext);
    const togglerThemeRef = useRef();
    const initialPageContainerCls = "grid-rows-12 space-y-2 w-auto overflow-x-hidden";
    const initialPageToggleThemeBtnCls = 
    "grid grid-cols-2 rounded-md w-28 fixed top-16 opacity-75 mr-2 justify-self-end bg-zinc-600 text-maximum-green-yellow ring-2 ring-wisteria justify-items-center px-1 py-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-zinc-500 duration-700 hover:skew-y-6";
    const INIT_DATE_TIME_STR = "rounded-2xl px-9 h-7 justify-self-center text-sm lg:text-sm xl:text-lg 2xl:text-lg";

    var auxProds = [];

    function manageProductsData() {
        var docFiles = [];
        contextApi.productos.then(data => {
            data.forEach(p => {
                docFiles.push({ "id": p["id"], "detalle": p["data"]["detalle"], "categoria": p["data"]["categoria"] })
            })
        })
            .catch(err => { throw new Error("Nuevo error detectado: " + err) });
        return docFiles;
    }

    function handPageThemeToggler() {
        var auxTogglerValidation = false;
        !themeTogglerAction ?
        (
            auxTogglerValidation = true,
            mutablePageContainerCls.current = initialPageContainerCls,
            mutableDateTimeClass.current = INIT_DATE_TIME_STR,
            mutableInitialPageTgThemeBtnCls.current = initialPageToggleThemeBtnCls
        )
        :
        (
            auxTogglerValidation = false,
            mutablePageContainerCls.current = initialPageContainerCls + " bg-zinc-700",
            mutableDateTimeClass.current = INIT_DATE_TIME_STR + " text-maximum-green-yellow",
            mutableInitialPageTgThemeBtnCls.current 
            = 
            "grid grid-cols-2 w-28 ml-9 rounded-md fixed top-16 opacity-75 mr-2 justify-self-end bg-white text-zinc-700 ring-2 ring-wisteria justify-items-center px-3 py-1 transition ease-in delay-300 hover:-translate-y-1 hover:scale-110 hover:bg-zinc-100 hover:text-french-rose duration-200 hover:skew-y-6"
        );

        console.log(mutablePageContainerCls.current);
        return auxTogglerValidation;
    }

    const mutablePageContainerCls = useRef(initialPageContainerCls);
    const mutableDateTimeClass = useRef(INIT_DATE_TIME_STR);
    const mutableInitialPageTgThemeBtnCls = useRef(initialPageToggleThemeBtnCls);
    const themeActEffect = handPageThemeToggler();

    useEffect(() => {
        var dateTimestamp = new Date();

        setTimeout(() => setNewDateAndTime(dateTimestamp.getFullYear().toString() + '/' +
            (dateTimestamp.getMonth() + 1) + '/' + dateTimestamp.getDate().toString() + ' +' +
            +dateTimestamp.getHours().toString() + ':' + dateTimestamp.getMinutes().toString() +
            ':' + dateTimestamp.getSeconds().toString()
        ),1000);

        togglerThemeRef.current.addEventListener("click", () => {
            setThemeTogglerAction(themeActEffect)
        })
    }, [newDateAndTime]);

    return (
        <div className={mutablePageContainerCls.current}>
            <PageHeader togglerThemeRef={togglerThemeRef} />
            <div className="col-span-2 grid grid-rows-2 w-full mx-auto py-1"
            >
                <div className="flex block justify-self-center space-x-14 rounded-md w-24 pt-1 text-sm">
                    <RiCalendarTodoFill className="rounded-lg bg-cyan-100 shadow-sm shadow-gray-400 text-lg" />
                    <IoTimer className="rounded-lg bg-cyan-100 shadow-sm shadow-gray-400 text-lg" />
                </div>
                <span className={mutableDateTimeClass.current}>{newDateAndTime}</span>
            </div>
            <div className="grid grid-cols-12 row-span-9 rounded-md ring-1 ring-black z-10 admin-cont shadow-md shadow-zinc-700 mx-2 mt-1 py-5">
                <h3 className="col-span-7 ml-auto mr-7 mt-4 pt-0 h-5 text-end text-2xl text-cyan-50 px-auto font-bold py-8 md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl"
                >
                    Administrador
                </h3>
                <ul className="col-span-5 bg-cyan-50 px-4 py-2 space-y-2 text-lg text-french-rose">
                    <li>
                        <span className="flex flex-row space-x-0.5">
                            <Link to="/#">
                                <IoIosNotifications />
                            </Link>
                            <small className="bg-yellow-200 px-1 py-0 text-sm font-semibold rounded-md ring-1 ring-french-rose" >8</small>
                        </span>
                    </li>
                    <li>
                        <span className="flex flex-row px-auto space-x-0.5">
                            <IoIosChatboxes />
                            <small className="bg-yellow-200 px-1 py-0 text-sm font-semibold rounded-md ring-1 ring-french-rose">2</small>
                        </span>
                    </li>
                    <li className="flex flex-row" onClick={() => {
                        contextApi.isAuth = false
                    }}>
                        <Link to="/#" ><MdDoorBack /></Link>
                        <small className="ml-2 text-sm"> CERRAR SESION</small>
                    </li>
                </ul>
            </div>

            <div className="row-span-12 grid-rows-12 grid grid-cols-12 ml-2 py-0 h-screen">
                <div className="col-span-5 grid grid-rows-8 rounded-md py-7 w-auto h-full text-center space-y-1.5 bg-cyan-900 shadow-2xl 
                shadow-black md:col-span-3 lg:col-span-3 xl:col-span-2 2xl:col-span-2"
                >
                    <h5 className="font-semibold text-apple-green mx-auto">Menú</h5>
                    <form className="space-y-2 px-1 self-center mx-auto">
                        <label htmlFor="#search" className="text-sm text-white mb-1">Filtrar producto</label>
                        <div className="flex block space-x-1.5">
                            <input type="search" name="search" id="search" className="rounded-md h-7 w-24
                            ring-2 ring-french-rose md:w-36 lg:w-36 xl:w-40 2xl:w-44" placeholder=" Ref. o descripción" />
                            <button type="submit" className="text-2xl text-white cursor-pointer hover:text-zinc-200"><MdOutlineSearch /></button>
                        </div>
                    </form>
                    <hr />
                    <span className="text-white cursor-pointer" onClick={() => {
                        !actionShowedPList ? (
                            setActionShowedList(true),auxProds = manageProductsData(), setProductos(auxProds), console.log(productos)
                        ) 
                        : 
                        setActionShowedList(false)
                    }}>Listar productos</span>
                    
                    <span className="text-white cursor-pointer">
                        <a href="/admin/lorem/inventario" target="_blank">
                            Agregar inventario <button className="bg-cyan-500 rounded-md"><BiPlus className="text-xl" /></button>
                        </a>
                    </span>
                        
                    <div className="space-x-1.5 cursor-pointer">
                        <span className="text-white">Subir producto nuevo</span>
                        <button className="bg-cyan-500 rounded-md"><BiPlus className="text-xl text-white" /></button>
                    </div>
                    <span className="text-white cursor-pointer flex flex-row mx-auto">
                        Crear categoría
                        <BiPlus className="rounded-md bg-cyan-500 text-xl text-white ml-2" />
                    </span>
                    <span className="text-white cursor-pointer"><Link to="/admin/pedidos"> Administrar pedidos</Link></span>
                </div>
                <div className="flex flex-row text-center text-2xl text-zinc-400 space-x-3.5 font-semibold italic p-3 w-44"><span className="text-xl">Hola</span>, Luz <IoAccessibilityOutline className="rounded-md w-7 h-7" /></div>
                <div className="col-span-6 px-1 py-16 w-auto space-y-3.5 text-2xl 
                md:col-span-8 lg:col-span-8 xl:col-span-8 2xl:col-span-9"
                >
                    <div className="rounded-2xl grid grid-rows-2 admin-cont text-white my-4 px-4 py-5 w-auto">
                        <div>
                            <span className="text-maximum-green-yellow">Pedidos pendientes: </span>
                            <span className="text-3xl text-french-rose font-semibold">6</span>
                        </div>
                        <small className="ml-7 text-wisteria">Menú / Administrar pedidos</small>
                    </div>
                    {
                        actionShowedPList && (
                            <div className="mr-auto px-3 py-7">
                                <h3 className="text-zinc-400">Tabla Productos</h3>
                                <table className="text-sm divide-y divide-black text-black justify-between w-full shadow-sm shadow-zinc-500">
                                    <thead>
                                        <tr className="divide-x divide-zinc-700 bg-french-rose text-lg text-white font-semibold">
                                            <th className="rounded-sm">Categoría</th>
                                            <th className="rounded-sm">Ref</th>
                                            <th className="rounded-sm">Detalle</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            productos.map(doc => {
                                                return (
                                                    <tr key={doc["id"]} className="divide-x divide-zinc-700 odd:bg-air-super-blue odd:text-white 
                                                    even:bg-indigo-200 odd:hover:bg-slate-400 even:hover:bg-indigo-100 text-lg"
                                                    >
                                                        <td className="rounded-sm px-2 w-1/4">{doc["categoria"]}</td>
                                                        <td className="rounded-sm px-1 w-1/6 text-center">{doc["id"]}</td>
                                                        <td className="rounded-sm px-2 w-5/12">{doc["detalle"]}</td>
                                                    </tr>
                                                )
                                            })
                                        } 
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Desktop;