import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import AdminHeader from "../admin/admin.Header";

/* eslint-disable react/react-in-jsx-scope */
const Pedidos = () => {
    const defaultMainTemplateCls = "p-8 h-screen";
    const [mainContainerCls, setMainContainerCls] = useState(defaultMainTemplateCls);
    const [clickThemeBtnState, setClickThemeBtnState] = useState(false);
    const togglerThemeRef = useRef();

    useEffect(()=> {
        togglerThemeRef.current.addEventListener("click", ()=> {
            !clickThemeBtnState ? (
                setClickThemeBtnState(true),
                setMainContainerCls(defaultMainTemplateCls+" bg-zinc-700") 
            ) 
            : 
            (
                setClickThemeBtnState(false),
                setMainContainerCls(defaultMainTemplateCls)
            )
        })
    })

    return (
        <div>
            <AdminHeader togglerThemeRef={togglerThemeRef}  />
            <main className={mainContainerCls}>
                <span className="ring-1 ring-zinc-600">Hola revuelo en el mundo</span>
            </main>
        </div>
    )
}

export default Pedidos;