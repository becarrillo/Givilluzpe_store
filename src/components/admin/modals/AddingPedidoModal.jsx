/* eslint-disable react/react-in-jsx-scope */




const AddingPedidoModal = () => {
    return (
        <div 
            className="flex flex-col rounded-md"
            id="new-pedido-modal"
        >
            <h6>Nuevo pedido</h6>
            <hr></hr>
            <form className="mx-auto">
                <input type="text" placeholder="categoría" />
                <input type="text" placeholder="detalle" />
                <input type="text" placeholder="documento de ID" />
                <input type="text" placeholder="email" />
                <input type="text" placeholder="municipio" />
                <input type="text" placeholder="teléfono" />
            </form>
        </div>
    )
}

export default AddingPedidoModal;