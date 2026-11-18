import { useEffect, useState, type SyntheticEvent } from 'react'
import { actualizarProducto, crearProducto, type Producto } from '../services/productoService'
import './ProductoForm.css'

interface Props {
  productoEditar: Producto | null
  onExito: (mensaje: string) => void
  onError: (mensaje: string) => void
  onCancelar: () => void
}

function ProductoForm({ productoEditar, onExito, onError, onCancelar }: Props) {
  const [nombre, setNombre] = useState("")
  const [precio, setPrecio] = useState("")
  const [stock, setStock] = useState("")
  const [errorForm, setErrorForm] = useState("")
  const [guardando, setGuardando] = useState(false)

  // Cada vez que cambia el producto a editar, se cargan (o se limpian) los inputs
  useEffect(() => {
    if (productoEditar) {
      setNombre(productoEditar.nombre)
      setPrecio(String(productoEditar.precio))
      setStock(String(productoEditar.stock))
    } else {
      setNombre('')
      setPrecio('')
      setStock('')
    }
    setErrorForm('')
  }, [productoEditar])

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    if (guardando) return

    const precioNum = parseFloat(precio)
    const stockNum = Number(stock)

    // Validaciones mínimas
    if (nombre.trim() === '') {
      setErrorForm('El nombre no puede estar vacío.')
      return
    }
    if (isNaN(precioNum) || precioNum <= 0) {
      setErrorForm('El precio debe ser un número mayor que cero.')
      return
    }
    if (stock.trim() === '' || !Number.isInteger(stockNum) || stockNum < 0) {
      setErrorForm('El stock debe ser un número entero mayor o igual a cero.')
      return
    }

    setErrorForm('')
    setGuardando(true)
    try {
      if (productoEditar) {
        await actualizarProducto(productoEditar.id, nombre.trim(), precioNum, stockNum)
        onExito('Producto actualizado correctamente.')
      } else {
        await crearProducto(nombre.trim(), precioNum, stockNum)
        onExito('Producto guardado correctamente.')
      }
    } catch (error) {
      console.error('Ocurrió un error al guardar el producto: ', error)
      onError('No se pudo guardar el producto. Inténtalo de nuevo.')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <section className={productoEditar ? 'form-card form-card--edicion' : 'form-card'}>
      <h2>{productoEditar ? 'Editar producto' : 'Nuevo producto'}</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="form__campo">
          Nombre
          <input
            type="text"
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
            placeholder='Ej. Teclado mecánico'
          />
        </label>
        <label className="form__campo">
          Precio (USD $)
          <input
            type="number"
            step="0.01"
            onChange={(e) => setPrecio(e.target.value)}
            value={precio}
            placeholder='0.00'
          />
        </label>
        <label className="form__campo">
          Stock
          <input
            type="number"
            step="1"
            onChange={(e) => setStock(e.target.value)}
            value={stock}
            placeholder='0'
          />
        </label>

        {errorForm && <p className="form__error" role="alert">{errorForm}</p>}

        <div className="form__botones">
          <button type='submit' className="btn btn--principal" disabled={guardando}>
            {guardando ? 'Guardando…' : productoEditar ? 'Actualizar producto' : 'Guardar producto'}
          </button>
          {productoEditar && (
            <button type='button' className="btn btn--secundario" onClick={onCancelar} disabled={guardando}>
              Cancelar edición
            </button>
          )}
        </div>
      </form>
    </section>
  )
}

export default ProductoForm
