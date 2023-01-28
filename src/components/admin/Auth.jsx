/* eslint-disable quotes */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useContext ,useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { TodoContext } from "../../context/TodoContext";
import "./style.css";
const { ChaoticOrbit } = require('@uiball/loaders');

const returnDetail = (str) => {return str}

const Auth = () => {
    const [admin, setAdmin] = useState('');
    const [password, setPassword] = useState('');
    const [adminPermission, setAdminPermission] = useState(false);

    const [detaiTest, setDetailTest] = useState('');

    const initialJsxTemplate = (
        <div className="grid grid-rows-12 admin-cont pt-16 h-max-full h-screen">
            <h1 className="justify-self-center text-xl text-white md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl">PORTAL ADMINISTRADOR</h1>
            <div className="row-span-11 bg-slate-300 mx-auto my-0 px-7 py-28 rounded-md w-auto h-5/6 
                shadow-xl shadow-zinc-900">
                <h4 className="text-xl text-center font-semibold">Ingresar</h4>
                <form className="mt-9 space-x-3 space-y-9 w-auto justify-items-center lg:w-72 xl:w-80 xl:px-2 xl:h-96 xl:space-y-11
                    2xl:w-96 2xl:h-96 2xl:pt-8" onSubmit={ev => {
                        handSubmit(ev)
                    }}>
                    <div className="flex flex-col ml-2 space-y-1.5">
                        <label className="text-sm">Administrador</label>
                        <input type="text" value={admin} placeholder="¿Eres admin? ingresa usuario" className="py-1 rounded-sm italic"
                            onChange={ev => { setAdmin(ev.target.value), console.log(admin+ "Hola") }}
                        />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <label className="text-sm">Contraseña</label>
                        <input type="password" value={password} placeholder="************" className="py-1 rounded-sm"
                            onChange={ev => { setPassword(ev.target.value) }}
                        />
                    </div>
                    <div className="flex flex-col w-auto text-center px-8">
                        <input type="submit" className="rounded-lg bg-green-600 text-white px-4 py-2 cursor-pointer" />
                    </div>
                </form>
            </div>
        </div>
    );
    const { search } = useLocation();

    function handSubmit(ev) {
        ev.preventDefault();
        if (admin.length > 0 || password.length > 0) {
            (admin === contextApi.admin && password === contextApi.password) ? 
            setAdminPermission(true) : window.alert("Datos incorrectos, inténtelo nuevamente");
        } else alert("No se ha ingresado dato en uno de los dos campos, verifique");
    }

    const contextApi = useContext(TodoContext);
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    var dAux = '';

    useEffect(()=> {
        if (search && search.length >= 4 && search.includes("referencia")) {
            
            const partialStr = search.slice(11).split("&");
            const category = partialStr.at(0);
            const descArr =  partialStr.at(1).slice(8).split("+");
            const quantity = partialStr.at(2).slice(9);
            const price = partialStr.at(3).slice(6);
            const reference = partialStr.at(4).slice(11);
            

            for (let i=0; i<descArr.length; i++) {
                var word = descArr[i];
                switch (i) {
                    case descArr.length-1:
                        dAux+=word;
                        break;
                    default:
                        dAux+=word+' '
                }
            }

            const formDataArr = new Array(
                decodeURI(reference),
                decodeURI(category),
                decodeURI(dAux),
                parseInt(quantity),
                price
            );
            const productObj = {
                "referencia": formDataArr.at(0),
                "categoria": formDataArr.at(1),
                "detalle": formDataArr.at(2),
                "cantidad" : formDataArr.at(3),
                "precio": formDataArr.at(4),
                "foto_url": ''
            }

            setDetailTest(formDataArr.at(2));
            var testing = returnDetail(detaiTest);
            console.log("Testing is ",testing);
            console.log("Result object is: ", productObj);
            contextApi.isAuth = true;
            setAdminPermission(contextApi.isAuth);
            console.log(contextApi.isAuth, "es el valor de isAuth de contexto");
            contextApi.productObj = productObj;
            navigate("/admin/producto/nuevo");
        }
    }, [search]);
    
    if (!adminPermission) {
        contextApi.isAuth = false;

        if (!search) return initialJsxTemplate;
        return (
            <div className="flex flex-col space-y-3.5 py-72">
                <div className="mx-auto">
                    <ChaoticOrbit
                        size={25}
                        speed={1.5}
                        color="black"
                    />
                </div>
                <h3 className="text-lg mx-auto">Cargando...</h3>
            </div>
        );
    }

    contextApi.isAuth = true;
    
    return <Outlet />;
}

export default {Auth, "testDetail": returnDetail};