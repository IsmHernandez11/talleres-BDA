import {addDoc, collection, doc, getDocs, updateDoc} from 'firebase/firestore';
import db from '../firebase';

export interface Producto{id:string ,nombre:string, precio:number, stock:number}

export const crearProducto = async (nombre:string, precio:number, stock:number) => {
 const docRef = await addDoc(collection(db, "productos"), {nombre, precio, stock});
 console.log("Producto agregado exitosamente ", docRef.id);
 return docRef;
}

export const obtenerProductos = async (): Promise<Producto[]> => {
    const querySnapshot = await getDocs(collection(db, 'productos'));
    const productos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })) as Producto[];
   
    return productos;
}

// UPDATE: actualiza el documento que tiene ese id (no crea uno nuevo)
export const actualizarProducto = async (id:string, nombre:string, precio:number, stock:number) => {
    const docRef = doc(db, "productos", id);
    await updateDoc(docRef, {nombre, precio, stock});
}
