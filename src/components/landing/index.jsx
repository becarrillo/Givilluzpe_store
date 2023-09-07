/* eslint-disable quotes */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useContext, useEffect, useRef } from "react";
import { TodoContext } from "../../context/TodoContext";
import Header from "../header/index";
import LoaderPage from "./Loader";
import ClientPedidos from "../pedidos/client-manage/clientPedidosReqModal";
import { lazy } from "react";
import "./style.css";
import Footer from "./Footer";
import { FcRightDown2 } from "react-icons/fc";
import { IoIosCart } from "react-icons/io";
import { RiChat3Line } from "react-icons/ri";
import LandingPagination from "./Pagination";
const ProductosCards = lazy(() => import("../productos/Card"));


const Landing = () => {
    const contextApi = useContext(TodoContext);
    const [myPagination, setMyPagination] = useState(0);
    const [totalElementsInCol, setTotalElementsInCol] = useState(0);
    const [elemsPageCount, setElemsPageCount] = useState(0);
    const [productos, setProductos] = useState([]);
    const [pagesBeginFragment, setPagesBeginFragment] = useState(1);
    const [auxQuerySnapArray] = useState([]);
    const [filterIsSubmitted, setFilterIsSubmitted] = useState(false);
    const [descriptionFilt, setDescriptionFilt] = useState('');
    const [pedidosModalIsShown, setPedidosModalIsShown] = useState(false);
    const pedidoBtnRef = useRef();
    const saveLocalPagination = (pageString = '') => window.localStorage.setItem("pagination", pageString);
    // en: We save this number, 16 products per page  // es: Guardamos este núm, 16 productos por página.
    const limit = 16;

    function handDescChange(event) { setDescriptionFilt(event.target.value) }

    function handShowPedidosModal() {
        !pedidosModalIsShown ? setPedidosModalIsShown(true) : setPedidosModalIsShown(false)
    }

    async function submitFilter(event) {
        event.preventDefault();
        const querySnapshot = await contextApi.fb.getProducto(descriptionFilt);

        querySnapshot.forEach(docSnap => {
            const qDocJson = {
                "id": docSnap.id,
                "data": {
                    "detalle": docSnap.data()["detalle"],
                    "categoria": docSnap.data()["categoría"],
                    "precio": docSnap.data()["precio"],
                    "cantidad": docSnap.data()["cantidad"],
                    "foto_url": docSnap.data()["foto_url"]
                }
            }

            auxQuerySnapArray.push(productModelObj(qDocJson));
        });
        setFilterIsSubmitted(true);
    }

    const productModelObj = (p) => {
        const object = {
            "id": p.id,
            "detalle": p.data["detalle"],
            "categoria": p.data["categoria"],
            "precio": p.data["precio"],
            "cantidad": p.data["cantidad"],
            "foto_url": p.data["foto_url"]
        }
        return object;
    }

    useEffect(() => {
        window.addEventListener("offline", () => {
            saveLocalPagination('1');
        });
    }, []);

    useEffect(() => {
        const storagePageNumb = window.localStorage.getItem("pagination");
        setMyPagination(storagePageNumb !== null ? parseInt(storagePageNumb) : 1);

        // en: Update the pages beginning fragment state   // es: se actualiza el estado de comienzo del fragmento de paginación
        setPagesBeginFragment(Math.ceil(parseInt(window.localStorage.getItem("pagination")) / 8));   // pagesBeginFragment => en: this is pagination over pagination // es: esto es la paginación de la paginación
    }, [myPagination]);

    useEffect(() => {
        contextApi.fb.getProductosCount().then(n => { setTotalElementsInCol(n) });

        let pObj = [];
        const awaitProductos = () => {
            contextApi.fb.getProductosWithPagination(myPagination, limit).then(arr => {
                /* en: pass through array of pagination numbers into a query range, from Firebase Firestore 
                    custom function and mapping all these creating an object of each element from database */
                arr.forEach(p => {
                    pObj.push(productModelObj(p));
                });
                setProductos(pObj);
            }).catch(err => { throw new Error("Nuevo error: " + err) });
        }
        awaitProductos();
        setElemsPageCount(productos.length);
    }, [productos]);

    const mobileClsValue = "grid grid-rows-2 bg-zinc-200 visible mx-0 w-full h-32 md:invisible lg:invisible xl:invisible 2xl:invisible";

    if (elemsPageCount === 0) {
        return (
            <div
                className="flex flex-col bg-zinc-200 w-screen 
                  h-fit md:w-auto lg:w-screen xl:w-screen 2xl:w-screen"
            >
                <Header clsNameOfMobileNav={mobileClsValue} />
                <main className="flex flex-col mt-7 px-3 w-11/12 mx-auto my-4">
                    <h3 className="block rounded-lg shadow-sm shadow-zinc-500 text-2xl 
                     text-french-rose self-start mt-16 px-16 py-1 h-10" id="main_title"
                    >
                        Catálogo
                    </h3>
                    <LoaderPage className="rounded-lg ring-1 ring-black" />
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="flex flex-col bg-zinc-200 w-screen h-fit overflow-x-hidden md:w-auto lg:w-screen xl:w-screen 2xl:w-screen">
            <Header clsNameOfMobileNav={mobileClsValue} />  {/* <= Header component with mobile responsive class into a prop */}

            <main className="flex flex-col rounded-lg divide-y-2 divide-dotted divide-wisteria ring-1 
              ring-wisteria mt-24 px-3 py-5 w-11/12 mx-auto my-1 md:mt-12 lg:mt-9 xl:mt-9 2xl:mt-9"
            >
                <div className="grid grid-cols-3 grid-rows-2 rounded-2xl w-11/12 md:w-auto h-16 py-2 md:px-32">
                    <form className="col-span-2 justify-self-start mt-1" onSubmit={ev => { submitFilter(ev) }}>
                        <input
                            type="text"
                            placeholder="Detalle producto"
                            className="rounded-l-3xl shadow-sm shadow-zinc-500 text-center text-sm w-24 h-7 ml-1 md:w-40
                              md:h-8 lg:w-64 lg:h-9 xl:w-64 xl:h-9 2xl:w-72 2l:h-9 hover:ring-2 hover:ring-apple-green"
                            onChange={ev => handDescChange(ev)}
                        />
                        <input
                            type="submit"
                            value="Buscar"
                            className="rounded-r-3xl shadow-sm shadow-cyan-900 hover:transition-transform hover:ease-in 
                              hover:delay-175 mr-1 w-14 h-7  bg-cyan-700 text-maximum-green-yellow 
                              font-semibold cursor-pointer hover:-translate-y--1 hover:scale-110 
                              hover:bg-air-super-blue md:w-28 md:h-8 
                              md:text-lg lg:w-32 lg:h-9 xl:w-32 xl:h-9 2xl:w-32 2xl:h-9"
                        />
                    </form>

                    <button
                        className="rounded-3xl bg-cyan-700 shadow-sm shadow-french-rose m font-sans ml-auto mb-4 pl-2 py-1
                          w-24 h-8 hover:transition-transform hover:rotate-2 hover:scale-110 
                          hover:shadow-md hover:shadow-cyan-100 d:w-28 md:h-11 lg:w-28 
                          lg:h-11 xl:w-32 xl:h-11 2xl:w-28 2xl:h-12"
                        ref={pedidoBtnRef}
                        onClick={handShowPedidosModal}
                    >
                        <a
                            href="#client-pedido"
                            rel="modal:open"
                            className="flex italic hover:line-through mr-1 text-sm 
                              text-white md:text-lg lg:text-lg xl:text-lg 2xl:text-xl"
                        >
                            <IoIosCart className="mt-1 xl:mr-2" /> Tu pedido
                        </a>
                    </button>
                </div>

                {pedidosModalIsShown && <div className="flex justify-center modal" id="client-pedido"><ClientPedidos /></div>}

                <div className="flex flex-col mt-4">
                    <h2 className="block rounded-lg text-2xl text-french-rose 
                        self-center mt-3 px-16 py-1 h-11"
                    >
                        Catálogo
                    </h2>
                </div>

                {
                    !filterIsSubmitted ? <ProductosCards items={productos} /> : (
                        <div>
                            <small className="flex space-x-1.5 ml-4">
                                <span className="font-semibold mr-2">{auxQuerySnapArray.length}</span>
                                Resultado(s) 
                                <FcRightDown2 className="self-end" />
                            </small>
                            <ProductosCards items={auxQuerySnapArray} />
                        </div>
                    )
                }
            </main>
            <button className="flex flex-row animate-pulse rounded-3xl mt-72 mr-1 px-5 
                pt-7 self-end w-24 h-20 bg-french-rose text-lg ring-2 ring-white fixed"
            >
                <RiChat3Line />
                Chat
            </button>
            {
                !filterIsSubmitted && (
                    <LandingPagination
                        limit={limit}
                        pageProductosCount={elemsPageCount}
                        pagesBeginFragment={pagesBeginFragment}
                        start={limit * (myPagination - 1) + 1}
                        totalElementsInCol={totalElementsInCol}
                    />
                )
            }
            <Footer />
        </div>
    )
}

export default Landing;