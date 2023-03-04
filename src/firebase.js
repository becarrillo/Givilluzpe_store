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
  where
} from "firebase/firestore";

import {
  initializeAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  browserLocalPersistence,
  indexedDBLocalPersistence
} from "firebase/auth";
import { getStorage, uploadBytes, getDownloadURL, ref } from "firebase/storage";
import config from "./config/config";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: config.data.private.apiKey,
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
const auth = initializeAuth(app, {
  persistence: [indexedDBLocalPersistence, browserLocalPersistence]
});
auth.languageCode = "es";

// Colections
const productosCol = collection(db, "productos");
const pedidosCol = collection(db, "pedidos");
const adminsCol = collection(db, "administradores");
// Customs functions
async function postNewUserWithEmailAndPsw(email, password) {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    window.alert("Se creó el usuario con el correo ",user.email);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error("Error code: ",errorCode, " => ",errorMessage);
  }
}

async function loginWithEmailAndPsw(email, password) {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    window.alert(errorCode, " : ", errorMessage);
  }
}

async function signOutFromAuth() {
  try {
    await signOut(auth);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(errorCode, " : ", errorMessage);
  }
}
// eslint-disable-next-line quotes
async function getProducto(description='') {
  const myDescQuery = query(productosCol, where("detalle", "==", description));

  try {
    const results = await getDocs(myDescQuery);
    return results.docs;
  } catch (error) {
    throw new Error(error)
  }
}

async function getProductos() {
  const snapshot = await getDocs(productosCol);
  const results = snapshot.docs.map(doc => { return { "id": doc.id, "data": doc.data() } });
  return results;
}

// eslint-disable-next-line quotes
async function getProductosWithPagination(page = 0, lm) {
  const startRef = async () => getProductoRefByIndex(lm * (page - 1));
  // en: We get only the products into a range (start to a limit)  // es: obtenemos los productos solamente dentro de un rango
  const paginated = query(productosCol, orderBy("referencia"), startAt(await startRef().then(key => key)), limit(lm));
  const productsSnapshot = await getDocs(paginated);
  var productsList = productsSnapshot.docs.map(doc => { return { "id": doc.id, "data": doc.data() } });
  return productsList;
}

async function getProductosCount() {
  const count = await (await getDocs(productosCol)).size;
  return count;
}

async function getProductoByRef(ref) {
  const prodReference = ref;
  const oneProductSnapshot = await getDoc(doc(productosCol, prodReference));
  return oneProductSnapshot;
}

async function getProductoRefByIndex(index) {
  const myIndex = index;
  const myRef = await (await getDocs(productosCol)).docs.at(myIndex).id;
  return myRef;
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
  await updateDoc(productDoc, { "cantidad": myDoc.data()["cantidad"] + newQ });
  console.log("Actualización realizada en producto ", myDoc.id);
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
  return foundsV.docs;
}

async function getPedido(id) {
  var pedidoId = id;
  const onePedidoSnapshot = await getDoc(doc(pedidosCol, pedidoId));
  return onePedidoSnapshot;
}

async function getPedidoByClientNombreCompleto(fullname) {
  const myFullNameQuery = query(pedidosCol, where("fullname", "==", fullname))
  const result = await getDoc(myFullNameQuery);
  return result;
}

async function getPedidoByClientTelefono(phone) {
  const myPhoneQuery = query(pedidosCol, where("telefono", "==", phone));
  const result = await getDoc(myPhoneQuery);
  return result;
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
  // eslint-disable-next-line quotes
  const storageRef = ref(storage, encodeURI(__dirname.replace('%', '/') + file.name.replace('%', '/')));
  const newMetadata = {
    cacheControl: "public,max-age=300",
    contentType: "image/jpeg"
  }
  const r = await uploadBytes(storageRef, file, newMetadata);

  console.log(r);

  const url = await getDownloadURL(storageRef);

  return url;
}

export default {
  firebaseURL: app.options.databaseURL,
  getProductoByRef,
  getProducto,
  getProductos,
  getProductosWithPagination,
  getProductosCount,
  getProductoRefByIndex,
  saveProducto,
  updateInventarioProductos,
  removeProducto,
  getPedidos,
  getPedido,
  getPedidoByClientNombreCompleto,
  getPedidoByClientTelefono,
  savePedido,
  updatePedido,
  removePedido,
  getAdmins,
  getAdmin,
  saveAdmin,
  updateAdmin,
  removeAdmin,
  uploadFile,
  postNewUserWithEmailAndPsw,
  loginWithEmailAndPsw,
  signOutFromAuth
}