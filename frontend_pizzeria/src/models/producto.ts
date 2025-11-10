export interface Producto {
  id: number
  idCategoria: number
  idTamaño: number | null
  nombre: string
  descripcion: string
  precio: number
  imagenUrl: string | null
  disponible: boolean
  destacado: boolean
  categoria?: {
    id: number
    nombre: string
  }
  tamaño?: {
    id: number
    nombre: string
    multiplicadorPrecio: number
  }
  ingredientes?: ProductoIngrediente[]
}

export interface ProductoIngrediente {
  id: number
  cantidad: number
  notas: string | null
  ingrediente: {
    id: number
    nombre: string
    esAlergeno: boolean
  }
}
