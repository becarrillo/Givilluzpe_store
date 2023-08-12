/* eslint-disable react/react-in-jsx-scope */
import { BiListPlus } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import { MdOutlineSearch } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import { FcRightDown2 } from "react-icons/fc";
import { MdClose } from "react-icons/md";
import { Pulsar } from "@uiball/loaders";
import { useState, useContext, useRef, useEffect } from "react";
import { TodoContext } from "../../context/TodoContext";
import AdminHeader from "./Header";


const Inventory = () => {
    function changeShowedItemBtnIcon() {
        if (!wasAddedInventoryIcon) {
            return <BsPlusLg className="mx-auto text-lg text-maximum-green-yellow md:text-xl lg:text-xl xl:text-xl 2xl:text-xl" />
        }
        return (
            <AiOutlineCheck className="mx-auto text-xl text-maximum-green-yellow"
                onMouseDown={ev => { handlerIndividualPValues(ev) }}
            />
        )
    }

    async function handleInventoryList(ev) {
        const pListSendConfirm = window.confirm("¿Estás seguro(a) de agregar la lista o cantidad por producto al inventario?");
        if (!pListSendConfirm) ev.preventDefault()
        else {
            setUploading(true);

            for (let i = 0; i < productsInventory.length; i++) {
                var p = productsInventory[i];
                await updateInventaryP(p["ref"], parseInt(p["cantidad"]));
            }

            setProductsInventory([]);
            setUploading(false);
        }
    }

    const handlerIndividualPValues = (ev) => {
        ev.preventDefault();
        !wasAddedInventoryIcon ?
            (
                setWasAddedInventoryIcon(true),
                setClassOfOutlinePassingProduct(oneProductFormInitContainerCls.slice(54, 90))
            )
            :
            (
                setWasAddedInventoryIcon(false),
                productsInventory.push({ "ref": pRefValue, "cantidad": pdsQuantValue }),
                setClassOfOutlinePassingProduct(oneProductFormInitContainerCls)
            )
    }

    function handleChangeOnProdRef(ev) {
        var newReference = ev.target.value;
        setpRefValue(newReference)
    }

    function handleChangeOnPdsQuantity(ev) {
        var newQuantity = ev.target.value;
        setPdsQuantValue(newQuantity);
    }

    async function submitProdFilter(event) {
        event.preventDefault();
        setFilterIsSubmitted(true);
        setFilterTemplate(
            <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
                <div
                    className="border-t-transparent border-solid animate-spin  
                        rounded-full border-middle-blue border-8 h-64 w-64"
                >
                </div>
            </div>
        );
        const querySnapshot = await findProduct(filterSearch);
        setFiltersProds(querySnapshot);
    }

const [wasAddedInventoryIcon, setWasAddedInventoryIcon] = useState(false);
var oneProductFormInitContainerCls = (
    "rounded-md outline-1 outline-dashed outline-zinc-500 grid grid-rows-3 space-y-3.5 mt-4 p-3 h-64 md:outline-2 lg:outline-2 xl:outline-2 2xl:outline-2"
);
    const [classOfOutlinePassingProduct, setClassOfOutlinePassingProduct] = useState(oneProductFormInitContainerCls);
// eslint-disable-next-line quotes
const [productsInventory, setProductsInventory] = useState([]);
// eslint-disable-next-line quotes
const [pRefValue, setpRefValue] = useState('');
const [pdsQuantValue, setPdsQuantValue] = useState(0);
const [uploading, setUploading] = useState(false);
const findProduct = useContext(TodoContext).fb.getProducto;
const [filterIsSubmitted, setFilterIsSubmitted] = useState(false);
// eslint-disable-next-line quotes
const [filterSearch, setFilterSearch] = useState('');
const [filtersProds, setFiltersProds] = useState([]);
const [filterTemplate, setFilterTemplate] = useState(<></>);
const updateInventaryP = useContext(TodoContext).fb.updateInventarioProductos;
const cyanProdsCard = useRef();
const listInventarySendingBtn = useRef();

useEffect(() => {
    setFilterTemplate(filteredItems(filtersProds));
}, [filtersProds]);

if (!uploading) {
    return (
        <div className="grid grid-rows-12 bg-fuchsia-100 md:grid-cols-4 lg:grid-cols-4 
            xl:grid-cols-4 2xl:grid-cols-4 gap-1" id="inv-container"
        >
            <AdminHeader />
            <div className="row-span-6 w-full pt-14 bg-no-repeat md:col-span-2 md:pt-2 lg:col-span-2 lg:pt-5 
                xl:col-span-2 xl:pt-5 2xl:col-span-2 2xl:pt-5" id="asset_inventory0"
            >
                <div className="grid grid-row-6 mt-2 py-8 justify-center space-y-7 md:py-20 
                    lg:py-24 xl:py-24 2xl:py-24"
                >
                    <h4 className="rounded-3xl bg-white opacity-60 mx-auto px-7 py-1 text-center 
                        text-lg font-semibold italic w-9/12 h-12 md:w-11/12 md:text-2xl lg:w-11/12 lg:text-2xl xl:w-11/12 xl:text-2xl 2xl:w-11/12 2xl:text-2xl"
                    >
                        Gestión de inventarios
                    </h4>
                    <form
                        className="flex items-center justify-center space-x-1.5 rounded-3xl bg-white
                            opacity-70 justify-self-center px-2 py-1 text-center text-2xl font-semibold w-max h-28"
                        onSubmit={ev => { submitProdFilter(ev) }}
                    >
                        <label className="text-sm">Buscar producto</label>
                        <div className="flex space-x-3.5 px-2 py-2 rounded-2xl bg-slate-200 h-11">
                            <input
                                type="text"
                                className="rounded-2xl ring-2 ring-french-rose bg-zinc-600 italic text-center
                                  text-white brightness-105 font-light w-40 h-7"
                                value={filterSearch}
                                onChange={ev => { setFilterSearch(ev.target.value) }}
                                placeholder=" Detalle"
                            />
                            <button
                                type="submit"
                                className="align-text-bottom text-3xl active:text-french-rose hover:scale-110 hover:text-slate-600"
                            >
                                <MdOutlineSearch />
                            </button>
                        </div>
                    </form>
                    {
                        filterIsSubmitted ? filterTemplate : <></>
                    }
                </div>
            </div>

            <div className="row-span-6 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2 
                space-y-9 admin-cont px-3 py-12 w-full md:py-24 lg:py-32 xl:py-32 2xl:py-36"
            >
                <h4 className="text-lg font-bold text-center text-pink-50">Crear inventario</h4>
                <form className="row-span-3 rounded-md grid grid-cols-3 gap-5 mx-auto p-3 w-11/12 bg-pink-50 sm:gap-5">
                    <fieldset className={classOfOutlinePassingProduct}>
                        <div className="grid grid-rows-4 space-y-1.5">
                            {
                                wasAddedInventoryIcon ? (
                                    <>
                                        <div className="row-span-3 space-y-7 justify-self-center">
                                            <div className="row-span-2 space-x-2">
                                                <label htmlFor="ref_0" className="text-md lg:text-lg xl:text-lg 2xl:text-lg">Producto</label>
                                                <input 
                                                    type="text" 
                                                    className="w-20 h-7 rounded-lg bg-slate-200 text-center text-lg ring-2 ring-french-rose"
                                                    value={pRefValue} id="ref_0" placeholder="referencia" 
                                                    onChange={ev => { handleChangeOnProdRef(ev) }}
                                                />
                                            </div>
                                            <div className="row-span-2 space-x-2">
                                                <label htmlFor="quantity" className="text-md lg:text-lg xl:text-lg 2xl:text-lg">Cantidad</label>
                                                <input 
                                                    type="number" 
                                                    className="w-20 h-8 rounded-lg bg-slate-200 text-center ring-2 ring-french-rose"
                                                    value={pdsQuantValue} 
                                                    id="quantity" 
                                                    placeholder="0" 
                                                    onChange={ev => { handleChangeOnPdsQuantity(ev) }}
                                                />
                                            </div>
                                        </div>
                                        <button className="ml-auto rounded-3xl shadow-md shadow-zinc-500 bg-green-800 
                                                text-white w-7 h-7 hover:bg-green-700 md:w-9 md:h-9" onClick={ev => { handlerIndividualPValues(ev) }}
                                        >
                                            {
                                                changeShowedItemBtnIcon()
                                            }
                                        </button>
                                    </>
                                ) : (
                                    <div className="row-start-4 px-2">
                                        <p className="text-zinc-600">+1 producto a la vez</p>
                                        <button className="ml-auto mt-5 rounded-3xl shadow-md shadow-zinc-500 bg-green-800 
                                            text-white w-7 h-7 hover:bg-green-700 md:w-9 md:h-9"  onClick={ev => { handlerIndividualPValues(ev) }}
                                        >
                                            {
                                                changeShowedItemBtnIcon()
                                            }
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </fieldset>

                    <fieldset className="col-span-2 flex flex-col space-y-3">
                        <legend className="mx-auto text-zinc-600 font-bold">+ Nuevo inventario</legend>
                        {
                            productsInventory.length > 0 ? (
                                <>
                                    <div
                                        className="mx-auto rounded-md shadow-inner shadow-zinc-600 overflow-y-scroll overscroll-y-contain 
                                            bg-cyan-50 divide-y divide-dashed divide-zinc-600 space-y-3 w-7/12 h-40 px-4 
                                            py-2 sm:w-3/4 md:w-auto lg:w-auto"
                                        ref={cyanProdsCard}
                                    >
                                        {
                                            productsInventory.length >= 1 ?
                                                productsInventory.map(p => {
                                                    return (
                                                        <ul 
                                                            className="flex flex-col ring-1 ring-zinc-600 ring-offset-2 shadow-lg shadow-air-super-blue
                                                              bg-cyan-50 space-y-2 w-40 text-center mx-auto py-2 hover:bg-white" 
                                                            key={p["ref"]}
                                                        >
                                                            <li className="ml-auto mb-1 rounded-sm bg-red-500 text-lg text-white cursor-pointer 
                                                                    hover:scale-125 hover:transition-colors hover:duration-100 active:ring-2 
                                                                    active:ring-zinc-500 active:bg-red-400"
                                                                onClick={ev => {
                                                                    productsInventory.length > 1 ? (
                                                                        productsInventory.splice(productsInventory.indexOf(p["ref"])),
                                                                        ev.currentTarget.parentElement.remove()
                                                                    ) : (
                                                                        productsInventory.splice(productsInventory.at(0)),
                                                                        ev.currentTarget.parentElement.remove()
                                                                    ),
                                                                        console.log("Quedan " + productsInventory.length + " producto(s) en el array"),
                                                                        productsInventory.length === 0 ? (
                                                                            cyanProdsCard.current.setAttribute("hidden", "true"),
                                                                            listInventarySendingBtn.current.setAttribute("hidden", "true")
                                                                        ) : console.log("Queda(n) " + productsInventory.length + " producto(s) en el array")
                                                                }
                                                                }>
                                                                <MdClose className="zinc-500" />
                                                            </li>
                                                            <li><span className="font-semibold">Ref:</span> {p["ref"]}</li>
                                                            <li><span className="font-semibold">Cantidad:</span> {p["cantidad"]}</li>
                                                        </ul>
                                                    )
                                                }
                                                ) : <></>
                                        }
                                    </div>
                                    <button
                                        className="ml-auto mt-2 rounded-3xl shadow-md shadow-zinc-500 bg-green-800 
                                            text-white w-10 h-10 hover:bg-green-700"
                                        onClick={async (ev) => { await handleInventoryList(ev) }}
                                        ref={listInventarySendingBtn}
                                    >
                                        <BiListPlus className="mx-auto text-3xl text-maximum-green-yellow" />
                                    </button>
                                </>
                            ) : <></>
                        }
                    </fieldset>
                </form>
                <footer className="row-start-6 rounded-2xl sketch-4 s bg-zinc-700 text-center opacity-40 py-6 w-auto">
                    <div className="ml-auto">
                        <h3 className="text-3xl text-french-rose font-bold brightness-125">Givilluzpe</h3>
                        <p className="text-white italic">Tienda Online de prendas femeninas de calidad</p>
                    </div>

                </footer>
            </div>
        </div >
    )
}

return procesingLoader(Pulsar);
}

const filteredItems = (filtersProds) => {
    return (
        <>
            <small className="flex w-10/12 justify-self-center">
                <span className="font-semibold mr-2">{filtersProds.length}</span>
                Resultado(s)
                <FcRightDown2 className="ml-2 mt-1" />
            </small>
            <ul className="row-span-4 grid grid-cols-4 gap-x-36 gap-y-6 rounded-sm bg-zinc-500 opacity-75 mx-auto px-3 py-2 justify-self-center
                w-7/12 h-56 overflow-auto md:gap-x-40 md:gap-y-7 lg:gap-x-44 lg:gap-y-9 xl:gap-x-48 
                xl:gap-y-9 2xl:gap-x-48 2xl:gap-y-9"
            >
                {
                    filtersProds.map(item => {
                        return (
                            <li
                                className="flex flex-col rounded-sm bg-slate-200 space-y-2
                                    shadow-sm shadow-zinc-500 w-32 md:w-32 lg:w-40 xl:w-36 2xl:w-40"
                                key={item["id"]}
                            >
                                <a
                                    rel="noreferrer"
                                    href={item.data()["foto_url"]}
                                    className="h-auto hover:bg-cyan-500" target="_blank"
                                >
                                    <img
                                        src={item.data()["foto_url"]}
                                        className="h-28 hover:opacity-90 md:h-24 lg:h-28 xl:h-28"
                                        width="225"
                                    />
                                </a>
                                <div className="text-center text-sm text-cyan-900 mx-auto mt-3 py-2 w-32 h-12">
                                    <h5 className="flex flex-col font-bold justify-self-center italic 
                                        overflow-x-scroll w-32 h-10"
                                    >
                                        {item.data()["detalle"]}
                                        <span className="text-zinc-600 font-normal">Ref. {item.data()["referencia"]}</span>
                                    </h5>
                                </div>
                                <div className="flex flex-row ml-1 place-content-around xl:ml-3">
                                    <p>{"$" + item.data()["precio"]}</p>
                                    <span className="text-orange-600 font-semibold">{item.data()["cantidad"]} un.</span>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

const procesingLoader = (UiLoader) => {
    return (
        <div className="flex flex-col h-screen bg-zinc-700 items-center place-content-center space-y-4">
            <UiLoader
                className="w-28 h-28"
                size={93}
                speed={1.75}
                color="pink"
            />
            <span className="italic text-slate-200">Procesando</span>
        </div>
    )
}

export default Inventory;