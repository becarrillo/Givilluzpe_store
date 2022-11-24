/* eslint-disable react/react-in-jsx-scope */
import { useState, useContext, useEffect } from "react";
import { TodoContext } from "../../context/TodoContext";
import { RiChat3Line } from "react-icons/ri";
import Header from "../header/header.index";
import LoaderPage from "./landing.Loader";
import { lazy } from "react";
import "./style.css";
import Footer from "./landing.Footer";
const Productos = lazy(() => import("../productos/productos.index"));


const Landing = () => {
    const contextApi = useContext(TodoContext);
    const [count, setCount] = useState(0);
    // eslint-disable-next-line quotes
    const [productos, setProductos] = useState([{id: '', detalle: '', categoria: '', precio: 0, foto_url: ''}]);

    useEffect(() => {
        const awaitProductos =  () => {
            var pObj = [];
            contextApi.productos.then(arr => {
                arr.forEach(p => {
                    pObj.push({
                        "id": p.id,
                        "detalle": p.data["detalle"],
                        "categoria": p.data["categoria"],
                        "precio": p.data["precio"],
                        "foto_url": p.data["foto_url"]
                    });
                    setCount(count+1);
                })
                setProductos(pObj);
            }).catch(err => { throw new Error("Nuevo error: " + err) })
        }

        awaitProductos()
    }, [productos]);

    const mobileClsValue = "grid grid-rows-2 bg-zinc-200 visible mx-0 w-full h-32 md:invisible lg:invisible xl:invisible 2xl:invisible";

    if (count === 0) {
        return (
            <div className="flex flex-col bg-zinc-200 w-screen h-fit md:w-auto lg:w-screen xl:w-screen 2xl:w-screen">
                <Header clsNameOfMobileNav={mobileClsValue} />
                <main className="flex flex-col mt-7 px-3 w-11/12 mx-auto my-4">
                    <h2 className="flex block rounded-lg shadow-sm shadow-zinc-500 text-2xl text-french-rose 
                    self-start mt-16 px-16 py-1 h-11" id="main_title"
                    >
                        Catálogo
                    </h2>
                    <LoaderPage className="rounded-lg ring-1 ring-black" />
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="flex flex-col bg-zinc-200 w-screen h-fit overflow-x-hidden md:w-auto lg:w-screen xl:w-screen 2xl:w-screen">
            <Header clsNameOfMobileNav={mobileClsValue} />
            
            <main className="grid grid-rows-1 rounded-lg divide-y-2 divide-dotted divide-wisteria ring-1 ring-wisteria mt-16 px-3 py-5 w-11/12 mx-auto my-4">
                <div className="grid grid-cols-3 rounded-2xl bg-slate-200 w-11/12 md:w-auto h-14 mx-auto mb-5 py-2 md:px-32 md:space-y-5 lg:space-y-5 lg:px-36 xl:space-y-5 xl:px-40 2xl:space-y-5 2xl:px-48">
                    <form className="col-span-3 justify-self-center">
                        <input type="text" placeholder="Detalle producto" className="rounded-l-3xl shadow-sm shadow-zinc-500 text-center text-sm w-44 h-9 ml-1 hover:ring-2 hover:ring-apple-green" />
                        <input type="submit" value="Buscar " className="rounded-r-3xl shadow-sm shadow-cyan-900 hover:transition-transform hover:ease-in hover:delay-175 mr-1 px-2 h-9 bg-middle-blue text-lg text-white font-semibold cursor-pointer hover:-translate-y--1 hover:scale-110 hover:bg-cyan-100 hover:text-black" />
                    </form>
                </div>

                <div className="flex flex-col">
                    <h2 className="flex block rounded-lg shadow-sm shadow-zinc-500 text-2xl text-french-rose 
                    self-start mt-3 px-16 py-1 h-11" id="main_title"
                    >
                        Catálogo
                    </h2>
                
                    <Productos items={productos} />
                </div>
                    
            </main>
            <button className="flex flex-row animate-pulse rounded-3xl mt-96 mr-1 px-5 pt-7 self-end 
            w-24 h-20 bg-french-rose text-lg ring-2 ring-white fixed"
            >
                <RiChat3Line />
                Chat
            </button>
            <Footer />
        </div>
    )
}

export default Landing;




