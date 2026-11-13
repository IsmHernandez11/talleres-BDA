import { useState, type SyntheticEvent } from 'react'
import { crearProducto } from '../services/productoService'

function ProductoForm() {
  const [nombre, setNombre] = useState("")
  const [precio, setPrecio] = useState("")
  const [stock, setStock] = useState("")

  const handleSubmit = async (e:SyntheticEvent<HTMLFormElement, SubmitEvent>) =>{
    e.preventDefault();

    try {
        
        await crearProducto(nombre, parseFloat(precio), parseInt(stock));
        setNombre('')
        setPrecio('')
        setStock('')

    } catch (error) {
        console.error('Ocurrió un error al crear el producto: ', error)
    }

  }


  return (
    <div>
        <h1>Formulario de Productos</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <input 
                type="text" 
                onChange={(e) => setNombre(e.target.value)}
                value={nombre}
                placeholder='Nombre'
                />
            </div>
            <div>
                <input type="number"
                onChange={(e) => setPrecio(e.target.value)}
                value={precio}
                placeholder='Precio'
                />
            </div>
            <div>
                <input type="number"
                onChange={(e) => setStock(e.target.value)}
                value={stock}
                placeholder='Stock'
                />
            </div>

            <button type='submit'>Crear</button>

        </form>
        
    </div>
  )
}

export default ProductoForm
