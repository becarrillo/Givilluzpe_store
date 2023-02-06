/* eslint-disable react/react-in-jsx-scope */
import { BiListPlus } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import { MdOutlineSearch } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { useState, useContext, useRef} from "react";
import { TodoContext } from "../../context/TodoContext";


const Inventory = () => {
    const [wasAddedInventoryIcon, setWasAddedInventoryIcon] = useState(false);
    var oneProductFormInitContainerCls = "rounded-md outline-1 outline-dashed outline-zinc-500 grid grid-rows-3 space-y-3.5 mt-4 p-3 h-64 md:outline-2 lg:outline-2 xl:outline-2 2xl:outline-2"
    const [classOfOutlinePassingProduct, setClassOfOutlinePassingProduct] = useState(oneProductFormInitContainerCls);
    // eslint-disable-next-line quotes
    const [productsInventory] = useState([]);
    // eslint-disable-next-line quotes
    const [pRefValue, setpRefValue]= useState('');
    const [pdsQuantValue, setPdsQuantValue] = useState(0);

    function changeShowedItemBtnIcon() {
        if (!wasAddedInventoryIcon) {
            return <BsPlusLg className="mx-auto text-lg text-maximum-green-yellow md:text-xl lg:text-xl xl:text-xl 2xl:text-xl" />
        }
        return <AiOutlineCheck className="mx-auto text-xl text-maximum-green-yellow" onMouseDown={ev => {handlerIndividualPValues(ev)}} />
    }

    async function handleInventoryList(ev) {
        ev.preventDefault();
        
        for (let i=0; i<productsInventory.length; i++) {
            var p = productsInventory[i];
            updateInventaryP(p["ref"], parseInt(p["cantidad"]))
              .then(data => window.alert("Producto actualizado ", data))
              .catch(e=> {throw new Error("Error encontrado: ", e)})
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
        var newReference=ev.target.value;
        setpRefValue(newReference)
    }

    function handleChangeOnPdsQuantity(ev) {
        var newQuantity = ev.target.value;
        setPdsQuantValue(newQuantity);
    }

    const updateInventaryP = useContext(TodoContext).fb.updateInventarioProductos;
    const cyanProdsCard = useRef();
    const listInventarySendingBtn = useRef();

    return (
        <div className="grid grid-rows-12 bg-fuchsia-100 md:grid-cols-4 lg:grid-cols-4 
        xl:grid-cols-4 2xl:grid-cols-4 gap-1" id="inv-container"
        >
            <div className="row-span-6 w-full pt-44 bg-no-repeat md:col-span-2 md:pt-2 lg:col-span-2 lg:pt-5 xl:col-span-2 xl:pt-5 2xl:col-span-2 2xl:pt-5" id="asset_inventory0">
                <div className="grid grid-row-7 gap-8 mt-9 py-12 justify-center space-x-4 space-y-11 md:py-20 lg:py-24 xl:py-24 2xl:py-24">
                    <h4 className="rounded-3xl bg-pink-50 opacity-60 px-7 py-1 text-center 
                    text-xl font-semibold italic w-auto h-12 md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl"
                    >
                        Gestión de inventarios  
                    </h4>
                    <form className="row-span-2 rounded-sm grid grid-rows-2 bg-pink-50 opacity-70 py-1 text-center 
                    text-2xl font-semibold w-auto h-28"
                    >
                        <label className="text-sm">Buscar producto</label>
                        <div className="flex flex-row space-x-3.5 mx-auto px-1">
                            <input type="text" className="rounded-2xl ring-2 ring-french-rose bg-zinc-600 text-center text-white brightness-105 font-light w-40 h-7" placeholder=" Detalle" />
                            <button type="submit" className="text-3xl mb-7"><MdOutlineSearch /></button>
                        </div>
                    </form>
                </div>
            </div>
            
            <div className="row-span-6 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2 
            space-y-9 admin-cont px-3 py-12 w-full md:py-24 lg:py-32 xl:py-32 2xl:py-36"
            >
                <h4 className="text-lg font-bold text-center text-pink-50">Crear inventario</h4>
                <form className="row-span-3 rounded-md grid grid-cols-3 gap-5
                mx-auto p-3 w-11/12 bg-pink-50 sm:gap-5"
                >
                    <fieldset className={classOfOutlinePassingProduct}>
                        <div className="grid grid-rows-4 space-y-1.5">
                            {
                                wasAddedInventoryIcon ? (
                                    <>
                                        <div className="row-span-3 space-y-7 justify-self-center">
                                            <div className="row-span-2 space-x-2">
                                                <label htmlFor="ref_0" className="text-md lg:text-lg xl:text-lg 2xl:text-lg">Producto</label>
                                                <input type="text" className="w-20 h-7 rounded-lg bg-slate-200 text-center text-lg ring-2 ring-french-rose"
                                                    value={pRefValue} id="ref_0" placeholder="referencia" onChange={ev => { handleChangeOnProdRef(ev) }}
                                                />
                                            </div>
                                            <div className="row-span-2 space-x-2">
                                                <label htmlFor="quantity" className="text-md lg:text-lg xl:text-lg 2xl:text-lg">Cantidad</label>
                                                <input type="number" className="w-20 h-8 rounded-lg bg-slate-200 text-center ring-2 ring-french-rose"
                                                    value={pdsQuantValue} id="quantity" placeholder="0" onChange={ev => { handleChangeOnPdsQuantity(ev) }}
                                                />
                                            </div>
                                        </div>
                                        <button className="ml-auto rounded-3xl shadow-md shadow-zinc-500 bg-green-800 
                                        text-white w-7 h-7 hover:bg-green-700 md:w-9 md:h-9" onClick={ev => {handlerIndividualPValues(ev)}}
                                        >
                                            {
                                                changeShowedItemBtnIcon()
                                            }
                                        </button>
                                    </>
                                ) 
                                :
                                (
                                    <div className="row-start-4 px-2">
                                        <p className="text-zinc-600">+1 producto a la vez</p>
                                        <button className="ml-auto mt-5 rounded-3xl shadow-md shadow-zinc-500 bg-green-800 
                                        text-white w-7 h-7 hover:bg-green-700 md:w-9 md:h-9"  onClick={ev => {handlerIndividualPValues(ev)}}
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
                                    <div className="mx-auto rounded-md shadow-inner shadow-zinc-600 overflow-y-scroll overscroll-y-contain 
                                    bg-cyan-50 divide-y divide-dashed divide-zinc-600 space-y-3 w-7/12 h-40 px-4 
                                    py-2 sm:w-3/4 md:w-auto lg:w-auto" ref={cyanProdsCard}
                                    >
                                        {
                                            productsInventory.length >= 1 ? 
                                                productsInventory.map(p => {
                                                    return (
                                                        <ul className="flex flex-col ring-1 ring-zinc-600 ring-offset-2 shadow-lg shadow-air-super-blue 
                                                        bg-cyan-50 space-y-2 w-40 text-center mx-auto py-2 hover:bg-white" key={p["ref"]}
                                                        >
                                                            <li className="ml-auto mb-1 rounded-sm bg-red-500 text-lg text-white cursor-pointer hover:scale-125 
                                                            hover:transition-colors hover:duration-100 active:ring-2 active:ring-zinc-500 active:bg-red-400" onClick={ev => {
                                                                productsInventory.length > 1 ? (
                                                                    productsInventory.splice(productsInventory.indexOf(p["ref"])),
                                                                    ev.currentTarget.parentElement.remove()
                                                                ) : (
                                                                    productsInventory.splice(productsInventory.at(0)),
                                                                    ev.currentTarget.parentElement.remove()
                                                                ),
                                                                console.log("Quedan "+productsInventory.length+" producto(s) en el array"),
                                                                productsInventory.length === 0 ? (
                                                                    cyanProdsCard.current.setAttribute("hidden", "true"),
                                                                    listInventarySendingBtn.current.setAttribute("hidden", "true")
                                                                ) 
                                                                : console.log("Queda(n) "+productsInventory.length+" producto(s) en el array")
                                                            }}>
                                                                <MdClose className="zinc-500" />
                                                            </li>
                                                            <li><span className="font-semibold">Ref:</span> {p["ref"]}</li>
                                                            <li><span className="font-semibold">Cantidad:</span> {p["cantidad"]}</li>
                                                        </ul>
                                                    )
                                                }) 
                                            : 
                                            (<></>)
                                        }
                                    </div>
                                    <button className="ml-auto mt-2 rounded-3xl shadow-md shadow-zinc-500 bg-green-800 text-white w-10 h-10 hover:bg-green-700" 
                                    ref={listInventarySendingBtn} onClick={ev => {handleInventoryList(ev)}}
                                    >
                                        <BiListPlus className="mx-auto text-3xl text-maximum-green-yellow" />
                                    </button>
                                </>
                            ) 
                            : <></>
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
            
        </div>
    )
}

export default Inventory;