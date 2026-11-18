import { useState } from 'react'
import './App.css'
import ProductoForm from "./components/ProductoForm"
import ProductoList from './components/ProductoList'
import type { Producto } from './services/productoService'

function App() {
  // Producto que se está editando (null = modo CREATE)
  const [productoEditar, setProductoEditar] = useState<Producto | null>(null)
  // Al cambiar este número, la lista vuelve a leer Firestore
  const [recarga, setRecarga] = useState(0)
  const [mensaje, setMensaje] = useState('')
  const [esError, setEsError] = useState(false)

  const mostrarMensaje = (texto: string, error: boolean) => {
    setMensaje(texto)
    setEsError(error)
  }

  // Se llama cuando el formulario guardó o actualizó correctamente
  const handleExito = (texto: string) => {
    mostrarMensaje(texto, false)
    setProductoEditar(null)
    setRecarga(recarga + 1)
  }

  const handleEditar = (producto: Producto) => {
    setMensaje('')
    setProductoEditar(producto)
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>Gestión de productos</h1>
        <p>Crea, consulta y edita el inventario guardado en Firestore</p>
      </header>

      {mensaje && (
        <p className={esError ? 'mensaje mensaje--error' : 'mensaje mensaje--exito'} role="status">
          {mensaje}
        </p>
      )}

      <ProductoForm
        productoEditar={productoEditar}
        onExito={handleExito}
        onError={(texto) => mostrarMensaje(texto, true)}
        onCancelar={() => setProductoEditar(null)}
      />
      <ProductoList onEditar={handleEditar} recarga={recarga} />
    </div>
  )
}

export default App
