/* eslint-disable react/react-in-jsx-scope */
import "./App.css";
import Landing from "./components/landing/index";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import AdminAuth from "./components/admin/admin.Auth";
import { TodoProv } from "./context/TodoContext";
import DesktopAdmin from "./components/admin/admin.Desktop";
// import { useState } from "react";
import Inventory from "./components/admin/admin.Inventory";
import Pedidos from "./components/pedidos/pedidos.index";


function App() {
  //const [isAuth, setIsAuth] = useState(useContext(TodoContext).isAuth);
  
  return (
    <TodoProv>
      <BrowserRouter>
        <Routes>
          <Route exact path="/admin" element={<AdminAuth />}>
            <Route path="/admin/" element={<DesktopAdmin />} />
            <Route path="/admin/pedidos" element={<Pedidos />} />
          </Route>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/admin/:id/inventario" element={<Inventory />} />
        </Routes>
      </BrowserRouter>
    </TodoProv>  
  );
}

export default App;
