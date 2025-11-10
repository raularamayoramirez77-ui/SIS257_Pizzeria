export interface Ingrediente {
  id: number
  nombre: string
  descripcion: string | null
  precioPorUnidad: number | null
  unidadMedida: string | null
  stock: number
  imagenUrl: string | null
  disponible: boolean
  esAlergeno: boolean
}
