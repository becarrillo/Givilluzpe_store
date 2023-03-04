/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useContext, useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { TodoContext } from "../../context/TodoContext";
import { TiArrowBackOutline } from "react-icons/ti";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import ourLogo from "../../assets/french-rose-logo.png";
import "./style.css";


const Auth = () => {
    // eslint-disable-next-line quotes
    const [email, setEmail] = useState('');
    // eslint-disable-next-line quotes
    const [password, setPassword] = useState('');
    const contextApi = useContext(TodoContext);
    const [adminPermission, setAdminPermission] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { search } = useLocation();
    const passwordInputRef = useRef();
    
    async function handSubmit(ev) {
        ev.preventDefault();
        
        if (email.length > 0 || password.length > 0) {
            const admin = await contextApi.fb.loginWithEmailAndPsw(email, password);
            if (admin !== undefined) {
                window.localStorage.setItem("email", admin.user.email);
                setAdminPermission(true);
                window.localStorage.setItem("is-authenticated", "true");
            } else window.localStorage.removeItem("is-authenticated");
            
        } else window.alert("No se ha ingresado dato en alguno de los campos, verifique");
    }

    const initialSubmitBtnCls = "justify-self-center block rounded-3xl text-white px-32 w-auto h-11";

    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars, quotes
    var dAux = '';
    // en: effect for manage query data from new product register form modal  
    // es: efecto que controla la consulta de datos desde la modal del formulario registro nuevo producto
    useEffect(() => {
        if (search && search.length >= 4 && search.includes("referencia")) {
            const partialStr = search.slice(11).split("&");
            const category = partialStr.at(0);
            const descArr = partialStr.at(1).slice(8).split("+");
            const quantity = partialStr.at(2).slice(9);
            const price = partialStr.at(3).slice(6);
            const reference = partialStr.at(4).slice(11);

            for (let i = 0; i < descArr.length; i++) {
                var word = descArr[i];
                switch (i) {
                    case descArr.length - 1:
                        dAux += word;
                        break;
                    default:
                        // eslint-disable-next-line quotes
                        dAux += word + ' '
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
                "cantidad": formDataArr.at(3),
                "precio": formDataArr.at(4),
                // eslint-disable-next-line quotes
                "foto_url": ''
            }
            setAdminPermission(true);
            console.log(contextApi.isAuth, "es el valor de isAuth de contexto");
            contextApi.productObj = productObj;
            navigate("/admin/producto/nuevo");
        }
    }, [search]);

    if (!adminPermission && !(window.localStorage.getItem("is-authenticated") === "true")) {

        if (!search) return (
            <div className="grid grid-rows-7 admin-cont pt-3 h-max-full h-screen">
                <h1 className="justify-self-center text-xl text-white h-12 md:text-2xl 
                  lg:text-3xl xl:text-3xl 2xl:text-3xl"
                >
                    PORTAL ADMINISTRADOR
                </h1>
                <div className="row-span-6 rounded-md bg-slate-200 mt-7 mx-auto px-7 pt-16 pb-24 
                  w-11/12 h-11/12 shadow-lg shadow-cyan-100 space-y-0.5 md:w-2/5 md:h-max
                  lg:w-auto lg:h-7/12 xl:w-96 xl:h-9/12"
                >
                    <h4 className="text-xl text-center text-cyan-900 font-semibold mb-5">Login</h4>
                    <form 
                        onSubmit={async (ev) => {
                            await handSubmit(ev)
                        }}
                        className="grid grid-rows-5 h-96 pb-0"
                    >
                        <img 
                            src={ourLogo} 
                            width="93rem" 
                            className="justify-self-center rounded-2xl" 
                        />
                        <div className="row-span-2 grid grid-rows-2 justify-self-center space-y-4 mt-11">
                            <input type="email"
                                placeholder="Correo electrónico"
                                onChange={ev => setEmail(ev.target.value)}
                                className="rounded-3xl bg-transparent border-b-2 
                                  border-b-cyan-50 text-center shadow-inner shadow-zinc-500 h-11 text-lg"
                                value={email}
                                required={true}
                            />
                            <div className="justify-self-center flex flex-row w-auto">
                                <input type="password"
                                    placeholder="Contraseña"
                                    onChange={ev => setPassword(ev.target.value)}
                                    className="rounded-l-3xl bg-transparent border-b-2 
                                      border-b-cyan-50 text-center shadow-inner shadow-zinc-500 h-11 text-lg"
                                    value={password}
                                    required={true}
                                    ref={passwordInputRef} 
                                />
                                <button 
                                    type="button" 
                                    className="flex rounded-r-3xl bg-white px-1 py-2 text-3xl w-10 h-11" 
                                    onClick={() => {
                                        !showPassword ? (
                                            setShowPassword(true),
                                            passwordInputRef.current.setAttribute("type", "text")
                                        ) : (
                                            setShowPassword(false),
                                            passwordInputRef.current.setAttribute("type", "password")
                                        )  
                                    }}
                                >
                                    {
                                        showPassword ? (
                                            <IoEyeOffOutline className="text-zinc-700 hover:scale-110 hover:delay-150 hover:ease-linear" />
                                        ) : <IoEyeOutline className="text-zinc-700 hover:scale-110 hover:delay-150 hover:ease-linear" />
                                    } 
                                </button>
                            </div>
                            
                        </div>

                        <span className="block text-cyan-800 italic justify-self-end
                          cursor-pointer h-5 mt-3 hover:underline hover:text-cyan-700"
                        >
                            ¿Olvidaste tu contraseña?
                        </span>
                        
                        <button 
                            className={
                                // eslint-disable-next-line quotes
                                (email && password) && email.indexOf('@') >= 1  ? (  // en: check weather email and password exists and email contains an '@' after any character
                                    initialSubmitBtnCls + " bg-cyan-800 hover:scale-105 hover:bg-cyan-700"                          // en: here we give enabled's  btn class 
                                ) : initialSubmitBtnCls + " bg-gray-400"     // en: and here we give disabled's btn class (default) 
                            } 
                            // eslint-disable-next-line quotes
                            disabled={(email && password) && email.indexOf('@') >= 1 ? false : true}
                        >
                            Enviar
                        </button>
                    </form>
                </div>

                <Link to="/" className="flex text-xl text-cyan-50 italic justify-self-end 
                mr-7 fixed bottom-4 hover:text-middle-blue hover:underline"
                >
                    <TiArrowBackOutline className="mr-2 mt-1"/> 
                    Ir a inicio
                </Link>
            </div>
        );    
    }

    return <Outlet />;
}

export default Auth;