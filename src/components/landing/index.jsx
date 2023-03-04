/* eslint-disable quotes */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useContext, useEffect  } from "react";
import { TodoContext } from "../../context/TodoContext";
import Header from "../header/index";
import LoaderPage from "./Loader";
import ClientPedidos from "../pedidos/client-manage/clientPedidosReqModal";
import { lazy } from "react";
import "./style.css";
import Footer from "./Footer";
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
              ring-wisteria mt-24 px-3 py-5 w-11/12 mx-auto my-1"
            >
                <div className="grid grid-cols-3 grid-rows-2 rounded-2xl w-11/12 md:w-auto h-16 py-2 md:px-32">
                    <form className="col-span-2 justify-self-center mt-1" onSubmit={ev => { submitFilter(ev) }}>
                        <input type="text"
                            placeholder="Detalle producto"
                            className="rounded-l-3xl shadow-sm shadow-zinc-500 text-center text-sm w-44 h-9 ml-1 
                              hover:ring-2 hover:ring-apple-green"
                            onChange={ev => handDescChange(ev)}
                        />
                        <input type="submit"
                            value="Buscar "
                            className="rounded-r-3xl shadow-sm shadow-cyan-900 hover:transition-transform hover:ease-in 
                              hover:delay-175 mr-1 px-2 h-9 bg-middle-blue text-lg text-white 
                              font-semibold cursor-pointer hover:-translate-y--1 hover:scale-110 
                              hover:bg-cyan-100 hover:text-black"
                        />
                    </form>

                    <button
                        className="rounded-sm text-black font-sans mb-5 px-2 py-1
                          h-11 hover:underline" 
                        onClick={handShowPedidosModal}
                    >
                        <a href="#client-pedidos" rel="modal:open">Consultar pedidos</a>
                    </button>
                </div>

                {pedidosModalIsShown && <div className="flex justify-center modal" id="client-pedidos"><ClientPedidos /></div>}
        
                {
                    filterIsSubmitted && (
                        <small className="block">
                            <span className="font-semibold">{auxQuerySnapArray.length}</span>
                            Resultado(s)
                        </small>
                    )
                }

                <div className="flex flex-col">
                    <h2 className="block rounded-lg shadow-sm shadow-zinc-500 text-2xl text-french-rose 
                        self-start mt-3 px-16 py-1 h-11" id="main_title"
                    >
                        Catálogo
                    </h2>

                    {
                        !filterIsSubmitted ? <ProductosCards items={productos} /> : <ProductosCards items={auxQuerySnapArray} />
                    }
                </div>

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