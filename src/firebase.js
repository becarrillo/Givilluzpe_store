import { initializeApp } from "firebase/app";
import {
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getFirestore,
  collection
} from "firebase/firestore";
import config from "./config/config";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:  config.data.private.apiKey,
  authDomain: config.data.public.authDomain,
  projectId: config.data.public.projectId,
  storageBucket: config.data.private.storageBucket,
  messagingSenderId: config.data.public.messagingSenderId,
  appId: config.data.appId,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig, "givilluzpe-firebase-app");
const db = getFirestore(app);
// Colections
const productosCol = collection(db, "productos");
const pedidosCol = collection(db, "pedidos");
const adminsCol = collection(db, "administradores");

// Customs functions
async function getProductos() {
  const productsSnapshot = await getDocs(productosCol);
  var productsList = productsSnapshot.docs.map(doc => {return {"id": doc.id, "data": doc.data() }});
  return productsList;
}

async function getProducto(ref) {
  var prodReference = ref;
  const oneProductSnapshot = await getDoc(doc(db, productosCol, prodReference));
  return oneProductSnapshot;
}

async function saveProducto(ref, producto) {
  const prodReference = ref;
  const reqProductDoc = await getDoc(doc(db, productosCol, prodReference));
  const prodQuery = reqProductDoc.exists();
  if (prodQuery) {
    const message = "El producto ya existe";
    console.log(message);
    window.alert(message);
    return;
  } else {
    var reqDoc = doc(db, productosCol, prodReference);
    const newDoc = await setDoc(reqDoc, producto);
    return newDoc.data();
  }
}

async function updateProducto(ref, producto) {
  const productDoc = doc(db, productosCol, ref);
  const upProduct = await updateDoc(productDoc, producto);
  return upProduct;
}

async function removeProducto(producto) {
  const prodQuery = await getDocs(productosCol);
  prodQuery.docs.map(async (doc) => {
    var productId = doc.data().id;
    productId === producto.id 
    ? window.confirm("¿Seguro(a) que deseas borrar éste registro?") && 
    (await deleteDoc(doc(db, productosCol, productId)) && alert("Registro borrado exitosamente")) : alert(
      "Error: No puedes borrar productos inexistentes"
    );
  });
}

async function getPedidos() {
  const foundsV = await getDocs(pedidosCol);
  return foundsV.docs.map(doc => doc.data());
}

async function getPedido(id) {
  var ventaId = id;
  const oneVentaSnapshot = await getDoc(doc(db, pedidosCol, ventaId));
  return oneVentaSnapshot;
}

async function savePedido(pedido) {
  const savedPedido = await addDoc(doc(db, pedidosCol), pedido);
  return savedPedido;
}

async function updatePedido(id, pedido) {
  const pedidoDoc = doc(db, pedidosCol, id);
  const upPedido = await updateDoc(pedidoDoc, pedido);
  return upPedido;
}

async function removePedido(pedido) {
  const pedidoQuery = await getDocs(pedidosCol);
  pedidoQuery.docs.map(async (doc) => {
    var pedidoId = doc.data().id;
    pedidoId === pedido.id 
    ? window.confirm("¿Seguro(a) que deseas borrar éste registro de pedido?") && 
    (await deleteDoc(doc(db, pedidosCol, pedidoId)) && alert("Registro borrado exitosamente")) : alert(
      "Error: No puedes borrar pedidos inexistentes"
    );
  });
}

async function getAdmins() {
  const foundsAdmins = await getDocs(adminsCol);
  return foundsAdmins.docs.map(doc => doc.data());
}

async function getAdmin(id) {
  var adminId = id;
  const oneAdminSnapshot = await getDoc(doc(db, adminsCol, adminId));
  return oneAdminSnapshot;
}

async function saveAdmin(admin) {
  const savedAdmin = await addDoc(doc(db, adminsCol), admin);
  return savedAdmin;
}

async function updateAdmin(id, admin) {
  const adminDoc = doc(db, adminsCol, id);
  const upAdmin = await updateDoc(adminDoc, admin);
  return upAdmin;
}

async function removeAdmin(admin) {
  const adminsQuery = await getDocs(adminsCol);
  adminsQuery.docs.map(async (doc) => {
    var adminId = doc.data().id;
    adminId === admin.id 
    ? window.confirm("¿Seguro(a) que deseas borrar éste registro?") && 
    (await deleteDoc(doc(db, adminsCol, adminId)) && alert("Registro borrado exitosamente")) : alert(
      "Error: No puedes borrar administradores inexistentes"
    );
  });
}

export default {
  firebaseURL: app.options.databaseURL,
  getProductos,
  getProducto,
  saveProducto,
  updateProducto,
  removeProducto,
  getPedidos,
  getPedido,
  savePedido,
  updatePedido,
  removePedido,
  getAdmins,
  getAdmin,
  saveAdmin,
  updateAdmin,
  removeAdmin
}