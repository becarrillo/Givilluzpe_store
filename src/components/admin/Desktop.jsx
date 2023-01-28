/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState, useRef, useContext } from "react";
import { TodoContext } from "../../context/TodoContext";
import { Link } from "react-router-dom";
import ProductosTable from "../productos/TBody";
import PageHeader from "./Header";
import { BiPlus } from "react-icons/bi";
import { MdOutlineSearch, MdDoorBack } from "react-icons/md";
import { IoIosChatboxes, IoIosNotifications } from "react-icons/io";
import { IoTimer } from "react-icons/io5";
import { RiCalendarTodoFill } from "react-icons/ri";
import { ImCircleDown } from "react-icons/im";
import ModalAddProducto from "./modals/AddingProductModal";
import "./style.css";


const Desktop = () => {
    const [productos, setProductos] = useState([{}]);
    const [newDateAndTime, setNewDateAndTime] = useState('');
    const [actionShowedPList, setActionShowedList] = useState(false);
    const contextApi = useContext(TodoContext);
    const themeTogglerRef = useRef();
    const [themeTogglerAction, setThemeTogglerAction] = useState(contextApi.screenThemeToggler);
    const [burguerMenuBtnClickSt, setBurguerMenuBtnClickSt] = useState(false);
    const initialPageContainerCls = "grid-rows-24 w-auto space-y-0 overflow-x-hidden";
    const initialPageToggleThemeBtnCls =
        "grid grid-cols-2 rounded-md w-28 fixed top-16 opacity-75 mr-2 justify-self-end bg-zinc-600 text-maximum-green-yellow ring-2 ring-wisteria justify-items-center px-1 py-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-zinc-500 duration-700 hover:skew-y-6";
    const INIT_DATE_TIME_STR = "rounded-2xl px-9 h-7 justify-self-center text-sm lg:text-sm xl:text-lg 2xl:text-lg";
    const [burguerMenuFirstDivClass, setBurguerMenuFirstDivClass] = useState("bg-cyan-600");
    const [burguerMenuScDivClass, setBurguerMenuScDivClass] = useState("bg-cyan-100 opacity-100");
    const [burguerMenuLastDivClass, setBurguerMenuLastDivClass] = useState("bg-cyan-600");
    const [sideMenuClass, setSideMenuClass] = useState('');

    var auxProds = [];

    function manageProductsData() {
        var docFiles = [];
        contextApi.productos.then(data => {
            data.forEach(p => {
                docFiles.push({
                    "id": p.id,
                    "detalle": p["data"]["detalle"],
                    "categoria": p["data"]["categoria"],
                    "precio": p["data"]["precio"],
                    "cantidad": p["data"]["cantidad"]
                })
            })
        })
            .catch(err => { throw new Error("Nuevo error detectado: " + err) });
        return docFiles;
    }

    function handPageThemeToggler() {
        var auxTogglerValidation = false;
        !themeTogglerAction ? (
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
                mutableInitialPageTgThemeBtnCls.current =
                "grid grid-cols-2 w-28 ml-9 rounded-md fixed top-16 opacity-75 mr-2 justify-self-end bg-white text-zinc-700 ring-2 ring-wisteria justify-items-center px-3 py-1 transition ease-in delay-300 hover:-translate-y-1 hover:scale-110 hover:bg-zinc-100 hover:text-french-rose duration-200 hover:skew-y-6"
            );
        console.log(themeTogglerAction);
        return auxTogglerValidation;
    }

    const mutablePageContainerCls = useRef(initialPageContainerCls);
    const mutableDateTimeClass = useRef(INIT_DATE_TIME_STR);
    const mutableInitialPageTgThemeBtnCls = useRef(initialPageToggleThemeBtnCls);
    const themeActEffect = handPageThemeToggler();
    const tableDivRef = useRef();
    const menuBarBurguerClickBtnRef = useRef();

    useEffect(() => {
        !themeTogglerAction ? (
            console.log("This IS ", contextApi.screenThemeToggler)
        )
            :
            (
                mutablePageContainerCls.current = initialPageContainerCls + " bg-zinc-100",
                mutableDateTimeClass.current = INIT_DATE_TIME_STR + " text-maximum-green-yellow",
                mutableInitialPageTgThemeBtnCls.current =
                "grid grid-cols-2 w-28 ml-9 rounded-md fixed top-16 opacity-75 mr-2 justify-self-end bg-white text-zinc-700 ring-2 ring-wisteria justify-items-center px-3 py-1 transition ease-in delay-300 hover:-translate-y-1 hover:scale-110 hover:bg-zinc-100 hover:text-french-rose duration-200 hover:skew-y-6"
            );
        setThemeTogglerAction(contextApi.screenThemeToggler),
            console.log(mutablePageContainerCls.current, " is initialPageCnt...");
    }, []);

    useEffect(() => {
        menuBarBurguerClickBtnRef.current.addEventListener("click", () => {
            !burguerMenuBtnClickSt ? setBurguerMenuBtnClickSt(true) : setBurguerMenuBtnClickSt(false)
        });

        burguerMenuBtnClickSt ? (
            setBurguerMenuFirstDivClass(burguerMenuFirstDivClass + ' ' + "rotate-45"),
            setBurguerMenuLastDivClass(burguerMenuLastDivClass + ' ' + "-rotate-45"),
            setBurguerMenuScDivClass(burguerMenuScDivClass - " opacity-100" + " opacity-40"),
            setSideMenuClass("grid grid-row-7 rounded-r-md bg-cyan-900 shadow-sm shadow-slate-200 py-2 visible")
        ) : (
            setBurguerMenuFirstDivClass("bg-cyan-600"),
            setBurguerMenuLastDivClass("bg-cyan-600"),
            setBurguerMenuScDivClass("bg-cyan-600 opacity-100"),
            setSideMenuClass("grid grid-rows-2 rounded-r-md bg-cyan-900 shadow-sm shadow-slate-200 py-2 space-y-1.5 custom-css-side-menu md:visible lg:visible xl:visible 2xl:visible")
        );
    }, [burguerMenuBtnClickSt]);

    useEffect(() => {
        var dateTimestamp = new Date();

        setTimeout(() => setNewDateAndTime(dateTimestamp.getFullYear().toString() + '/' +
            (dateTimestamp.getMonth() + 1) + '/' + dateTimestamp.getDate().toString() + ' +' +
            +dateTimestamp.getHours().toString() + ':' + dateTimestamp.getMinutes().toString() +
            ':' + dateTimestamp.getSeconds().toString()
        ), 1000);

        themeTogglerRef.current.addEventListener("click", (ev) => {
            ev.preventDefault();
            setThemeTogglerAction(themeActEffect);
            contextApi.screenThemeToggler = themeTogglerAction;
        });
    }, [newDateAndTime]);

    return (
        <div className={mutablePageContainerCls.current}>
            <PageHeader themeTogglerRef={themeTogglerRef} />
            <div className="col-span-2 row-span-2 grid grid-rows-2 w-full mx-auto pt-16 pb-1"
            >
                <div className="flex flex-row justify-self-center space-x-14 rounded-md w-24 pt-1 text-sm">
                    <RiCalendarTodoFill className="rounded-lg bg-cyan-100 shadow-sm shadow-gray-400 text-lg" />
                    <IoTimer className="rounded-lg bg-cyan-100 shadow-sm shadow-gray-400 text-lg" />
                </div>
                <span className={mutableDateTimeClass.current}>{newDateAndTime}</span>
            </div>
            <div className="grid grid-cols-12 row-span-9 rounded-md ring-1 ring-black z-10 admin-cont shadow-sm shadow-slate-200 mx-0 mt-1 py-5 md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2">
                <h3 className="col-span-7 mr-7 mt-4 pt-0 h-5 text-end text-2xl text-cyan-50 px-auto font-bold ml-2 py-8 md:text-3xl md:ml-auto lg:text-4xl lg:ml-auto xl:text-4xl xl:ml-auto 2xl:text-4xl 2xl:ml-auto"
                >
                    Administrador
                </h3>
                <ul className="col-span-5 rounded-sm bg-cyan-50 px-4 py-2 space-y-2 text-lg text-french-rose">
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

            <div className="row-span-12 grid grid-cols-12 px-0 py-2 md:mr-4 md:px-1 lg:mr-12 lg:px-1 xl:mr-11 xl:px-1 2xl:mr-4 2xl:px-2">
                <div className="col-span-12 flex flex-col rounded-md py-2 h-full text-center 
                space-y-7 md:col-span-3 md: md:visible lg:col-span-3 xl:col-span-2 2xl:col-span-4"
                >
                    <button className="rounded-xl ml-2" id="burguer_admin_btn" ref={menuBarBurguerClickBtnRef}>
                        <div className={burguerMenuFirstDivClass}></div>
                        <div className={burguerMenuScDivClass}></div>
                        <div className={burguerMenuLastDivClass}></div>
                    </button>
                    <hr></hr>
                    <div className={sideMenuClass}>
                        <h5 className="font-semibold h-8 text-apple-green mx-auto">Menú</h5>
                        <form className="space-y-0.5 px-1 pb-2 mx-auto">
                            <label htmlFor="#search" className="text-sm text-white mb-1">Filtrar producto</label>
                            <div className="space-x-1.5 self-center">
                                <input type="search" name="search" id="search" className="rounded-3xl h-7 w-40
                                        ring-2 ring-french-rose text-center md:w-36 lg:w-36 xl:w-40 2xl:w-44" placeholder=" Ref. o descripción" />
                                <button type="submit" className="text-2xl text-white cursor-pointer hover:text-zinc-200"><MdOutlineSearch /></button>
                            </div>
                        </form>
                        <hr />
                        <ul className="flex flex-col space-y-9">
                            <li className="flex flex-row mx-auto text-white cursor-pointer hover:text-maximum-green-yellow" onClick={() => {
                                !actionShowedPList ? (
                                    setActionShowedList(true), auxProds = manageProductsData(), setProductos(auxProds), console.log(productos)
                                )
                                    :
                                    setActionShowedList(false)
                            }}>
                                Listar productos 
                                <ImCircleDown className="ml-1 mt-1" />
                            </li>

                            <li className="text-white cursor-pointer hover:text-maximum-green-yellow">
                                <a href="/admin/inventario" target="_blank">
                                    Agregar inventario <button className="bg-cyan-500 rounded-md"><BiPlus className="text-xl" /></button>
                                </a>
                            </li>

                            <li className="cursor-pointer hover:text-maximum-green-yellow">
                                <ModalAddProducto />
                                <a href="#add_prod_modal" rel="modal:open" className="mx-auto space-x-1">
                                    <span className="text-white hover:text-maximum-green-yellow">Producto nuevo</span>
                                    <button className="bg-cyan-500 rounded-md h-5"><BiPlus className="text-xl text-white" /></button>
                                </a>
                            </li>
                            <li className="text-white cursor-pointer hover:text-maximum-green-yellow">
                                Listar categorías
                            </li>
                            <li className="text-white cursor-pointer hover:text-maximum-green-yellow">
                                <Link to="/admin/pedidos">
                                    Administrar pedidos
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row-span-2 col-start-1 col-span-10 ml-8 mt-7 pl-6 py-0 w-auto space-y-3.5 text-2xl 
                md:col-span-8 lg:col-span-8 xl:col-span-9 2xl:col-span-9"
                >
                    {
                        !actionShowedPList ?
                            (
                                <span className="text-md">Hola Admin</span>
                            )
                            :
                            (
                                <div className="mr-auto px-1 py-1 overflow-x-scroll md:overflow-x-hidden" ref={tableDivRef}>
                                    <h3 className="text-zinc-400">Tabla Productos</h3>
                                    <table className="divide-y divide-black justify-between shadow-sm shadow-zinc-500 text-sm text-black">
                                        <thead>
                                            <tr className="divide-x divide-zinc-700 bg-french-rose text-sm text-white font-semibold md:text-lg lg:text-lg xl:text-lg 2xl:text-xl">
                                                <th className="rounded-sm">Categoría</th>
                                                <th className="rounded-sm">Referencia</th>
                                                <th className="rounded-sm">Detalle</th>
                                                <th className="rounded-sm">Precio</th>
                                                <th className="rounded-sm">Cantidad</th>
                                                <th className="rounded-sm">Acción</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <ProductosTable products={productos} />
                                        </tbody>
                                    </table>
                                </div>
                            )
                    }
                    <div className="rounded-2xl grid grid-rows-2 admin-cont text-white mx-auto mb-9 px-3 py-2 w-full md:w-auto lg:w-auto xl:w-full 2xl:w-full">
                        <span className="text-maximum-green-yellow">Pedidos pendientes: </span>

                        <small className="ml-7 text-cyan-50">Menú / Administrar pedidos</small>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Desktop;