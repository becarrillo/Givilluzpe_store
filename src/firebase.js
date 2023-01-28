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
  collection,
  query,
  orderBy,
  limit,
  startAt,
  
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import config from "./config/config";
import { v4 as uuidv4 } from "uuid";

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
const storage = getStorage(app);

// Colections
const productosCol = collection(db, "productos");
const pedidosCol = collection(db, "pedidos");
const adminsCol = collection(db, "administradores");
// Customs functions
// eslint-disable-next-line quotes
async function getProductos(page=0, lm) {
  const startRef = async () => getProductoRefByIndex(lm*(page-1));
  const paginated =  query(productosCol, orderBy("referencia"), startAt(await startRef().then(key => key)), limit(lm));
  const productsSnapshot = await getDocs(paginated);
  var productsList = productsSnapshot.docs.map(doc => {return {"id": doc.id, "data": doc.data()}});
  return productsList;
}

async function getProductosCount() {
  const count = await (await getDocs(productosCol)).size;
  return count;
}

async function getProducto(ref) {
  const prodReference = ref;
  const oneProductSnapshot = await getDoc(doc(productosCol, prodReference));
  return oneProductSnapshot;
}

async function getProductoRefByIndex(index) {
  const myIndex = index;
  const response = await (await getDocs(productosCol)).docs.at(myIndex).id;
  return response;
}

async function saveProducto(ref, producto) {
  const prodReference = ref;
  const reqProductDoc = await getDoc(doc(productosCol, prodReference));
  const prodQuery = reqProductDoc.exists();
  if (prodQuery && prodReference === reqProductDoc.id) {
    const message = `El producto con la referencia ${prodReference} ya existe`;
    alert(message);
    return;
  } else {
    var reqDoc = doc(productosCol, prodReference);
    await setDoc(reqDoc, producto);
  }
}

async function updateInventarioProductos(ref, newQ) {
  const productDoc = doc(productosCol, ref);
  var myDoc = await getDoc(productDoc);
  await updateDoc(productDoc, {"cantidad": myDoc.data()["cantidad"]+newQ});
  console.log("Actualización realizada en producto ",myDoc.id);
}

async function removeProducto(producto) {
  const prodQuery = await getDocs(productosCol);
  prodQuery.docs.map(async (doc) => {
    var productId = doc.data().id;
    productId === producto.id 
    ? window.confirm("¿Seguro(a) que deseas borrar éste registro?") && 
    (
      await deleteDoc(doc(db, productosCol, productId)) && alert("Registro borrado exitosamente")
    ) : alert(
      "Error: No puedes borrar productos inexistentes"
    );
  });
}

async function getPedidos() {
  const foundsV = await getDocs(pedidosCol);
  return foundsV.docs.forEach(doc => doc.data());
}

async function getPedido(id) {
  var ventaId = id;
  const oneVentaSnapshot = await getDoc(doc(pedidosCol, ventaId));
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
  await updateDoc(adminDoc, admin);
  //return upAdmin;
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

async function uploadFile(file) {
  const storageRef = ref(storage, uuidv4());
  await uploadBytes(storageRef, file).then(d=> d);
  const url = await getDownloadURL(storageRef);
  return url;
}

export default {
  firebaseURL: app.options.databaseURL,
  getProductos,
  getProducto,
  getProductosCount,
  getProductoRefByIndex,
  saveProducto,
  updateInventarioProductos,
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
  removeAdmin,
  uploadFile
}