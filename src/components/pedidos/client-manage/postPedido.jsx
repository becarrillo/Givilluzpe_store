/* eslint-disable quotes */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useContext } from "react";
import { TodoContext } from "../../../context/TodoContext";


const PostPedido = () => {
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [town, setTown] = useState('');
    const contextApi = useContext(TodoContext);

    async function handSubmit(e) {
        e.preventDefault();
        const newPedido = {
            "fullname": fullname,
            "telefono": phone,
            "direccion": address,
            "municipio": town
        }
        if (window.confirm("¿Está seguro(a) de registrar el pedido?")) {
            await contextApi.fb.savePedido(newPedido);
            window.alert("1 inserción realizada");
        }
    }

    function handFullNameChange(event) {
        const myFullName = event.target.value;
        setFullname(myFullName);
    }

    function handPhoneChange(event) {
        const myPhone = event.target.value;
        setPhone(myPhone);
    }

    function handAddressChange(event) {
        const myAddress = event.target.value;
        setAddress(myAddress);
    }

    function handTownChange(event) {
        const myTown = event.target.value;
        setTown(myTown);
    }

    return (
        <div className="flex flex-col p-2 bg-zinc-200">
            <div className="self-center rounded-md bg-cyan-50 px-3 py-1">
                <form className="mx-auto" onSubmit={ev => handSubmit(ev)}>
                    <h3>Nuevo Pedido</h3>
                    <div className="grid grid-rows-2 grid-cols-2">
                        <input 
                            type="text" 
                            placeholder="Nombre completo" 
                            onChange={ev => {handFullNameChange(ev)}}
                        />
                        <input 
                            type="text" 
                            placeholder="Teléfono" 
                            onChange={ev => {handPhoneChange(ev)}}
                        />
                        <input 
                            type="text" 
                            placeholder="Dirección" 
                            onChange={ev => {handAddressChange(ev)}}
                        />
                        <input 
                            type="text" 
                            placeholder="Municipio" 
                            onChange={ev => {handTownChange(ev)}}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="rounded-sm bg-green-500 px-4 py-1 hover:bg-green-400"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PostPedido;