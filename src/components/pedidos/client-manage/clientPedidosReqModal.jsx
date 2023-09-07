/* eslint-disable react/react-in-jsx-scope */

const ClientPedidosReqModal = () => {
 
    return (
        <form method="GET" action="/pedidos/pedido/search" className="flex flex-col p-5 modal" id="pedido-modal">
            <h3 className="mx-auto">Consulta pedidos</h3>
            <select 
              name="pedidos-selection" 
              className="mx-auto"
            >
                <option value="Nombre completo">Nombre completo</option>
                <option value="Teléfono">Teléfono</option>
                <option value="Id de pedido">Id de pedido</option>
            </select>
            <div className="block mx-auto space-x-3">
                <label htmlFor="value">Valor</label>
                <input 
                    type="text" 
                    className="rounded-md h-9"
                    id="value"
                />
                <button
                    type="submit"
                    className="rounded-md px-4 py-1 h-9"
                >
                    Búsqueda
                </button>
            </div>
        </form>
    )
}

export default ClientPedidosReqModal;