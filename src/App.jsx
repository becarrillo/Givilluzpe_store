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
import Pedidos from "./components/pedidos/index";
import { ProductoLogger } from "./components/loggers/Producto";
import { TodoProv } from "./context/TodoContext";


function App() {

  return (
    <TodoProv>
      <BrowserRouter>
        <Routes>
          <Route exact path="/admin" element={
            <AdminAuth.Auth />
          }>
            <Route path="/admin" element={<DesktopAdmin />} />
            <Route path="/admin/producto/nuevo" element={<ProductoLogger />} />
            <Route exact path="/admin/inventario" element={
              <Inventory />} 
            />
            <Route path="/admin/pedidos" element={<Pedidos />} />
          </Route>
          <Route exact path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </TodoProv>  
  );
}

export default App;
