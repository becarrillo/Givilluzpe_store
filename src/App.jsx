/* eslint-disable quotes */
/* eslint-disable react/react-in-jsx-scope */
import "./App.css";
import Landing from "./components/landing/index";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import AdminAuth from "./components/admin/Auth";
import DesktopAdmin from "./components/admin/Desktop";
import Inventory from "./components/admin/Inventory";
import PedidoDetails from "./components/pedidos/client-manage/index";
import Pedidos from "./components/pedidos/admin-manage/index";
import PostPedido from "./components/pedidos/client-manage/postPedido";
import { ProductoLogger } from "./components/loggers/Producto";
import { TodoProv } from "./context/TodoContext";


function App() {

  return (
    <TodoProv>
      <BrowserRouter>
        <Routes>
          <Route exact path="/admin" element={
            <AdminAuth />
          }>
            <Route path="/admin" element={<DesktopAdmin />} />
            <Route exact path="/admin/inventario" element={
              <Inventory />} 
            />
            <Route path="/admin/producto/nuevo" element={<ProductoLogger />} />
            <Route path="/admin/pedidos" element={<Pedidos />} />
          </Route>
          <Route exact path="/" element={<Landing />} />
          <Route path="/pedidos/pedido/nuevo/:id_producto" element={<PostPedido />} />
          <Route exact path="/pedidos/pedido/search" element={<PedidoDetails />} />
        </Routes>
      </BrowserRouter>
    </TodoProv>  
  );
}

export default App;
