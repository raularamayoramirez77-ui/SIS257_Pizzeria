<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from '@/plugins/axios'
import type { Producto } from '@/models/producto'
import type { Categoria } from '@/models/categoria'
import type { Tamaño } from '@/models/tamaño'
import { useToast } from 'vue-toastification'

const toast = useToast()

const emit = defineEmits<{
  edit: [producto: Producto]
}>()

const productos = ref<Producto[]>([])
const categorias = ref<Categoria[]>([])
const tamaños = ref<Tamaño[]>([])
const loading = ref(false)
const searchTerm = ref('')
const categoriaFiltro = ref<number | null>(null)

const obtenerLista = async () => {
  try {
    loading.value = true
    const [productosRes, categoriasRes, tamañosRes] = await Promise.all([
      axios.get('/productos'),
      axios.get('/categorias'),
      axios.get('/tamanos')
    ])
    // Ordenar por ID descendente (los más recientes primero)
    productos.value = productosRes.data.sort((a: Producto, b: Producto) => b.id - a.id)
    categorias.value = categoriasRes.data
    tamaños.value = tamañosRes.data
  } catch (error) {
    console.error('Error al obtener productos:', error)
    toast.error('Error al cargar la lista de productos')
  } finally {
    loading.value = false
  }
}

const filteredProductos = computed(() => {
  let result = productos.value

  // Filtrar por categoría
  if (categoriaFiltro.value) {
    result = result.filter(p => p.idCategoria === categoriaFiltro.value)
  }

  // Filtrar por búsqueda
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    result = result.filter(p => 
      p.nombre.toLowerCase().includes(term) ||
      p.descripcion.toLowerCase().includes(term)
    )
  }

  return result
})

const getCategoriaNombre = (idCategoria: number) => {
  const categoria = categorias.value.find(c => c.id === idCategoria)
  return categoria?.nombre || 'Sin categoría'
}

const getTamañoNombre = (idTamaño: number | null) => {
  if (!idTamaño) return '-'
  const tamaño = tamaños.value.find(t => t.id === idTamaño)
  return tamaño?.nombre || '-'
}

const handleEdit = (producto: Producto) => {
  emit('edit', producto)
}

const handleDelete = async (id: number, nombre: string) => {
  if (!confirm(`¿Está seguro de eliminar el producto "${nombre}"?\n\nNOTA: Solo se puede eliminar si no tiene ventas asociadas.`)) return

  try {
    await axios.delete(`/productos/${id}`)
    toast.success('Producto eliminado exitosamente')
    obtenerLista()
  } catch (error: any) {
    console.error('Error al eliminar:', error)
    const message = error.response?.data?.message || 'Error al eliminar el producto'
    toast.error(message)
  }
}

onMounted(() => {
  obtenerLista()
})

defineExpose({ obtenerLista })
</script>

<template>
  <div class="crud-card">
    <div class="crud-header">
      <div class="row align-items-center">
        <div class="col-md-3">
          <h5 class="crud-title">
            <i class="fas fa-pizza-slice"></i>
            Lista de Productos
          </h5>
        </div>
        <div class="col-md-3">
          <select 
            class="crud-filter-select form-control" 
            v-model="categoriaFiltro"
          >
            <option :value="null">Todas las categorías</option>
            <option 
              v-for="categoria in categorias" 
              :key="categoria.id"
              :value="categoria.id"
            >
              {{ categoria.nombre }}
            </option>
          </select>
        </div>
        <div class="col-md-6">
          <input
            type="text"
            class="crud-search-input form-control"
            placeholder="🔍 Buscar por nombre o descripción..."
            v-model="searchTerm"
          />
        </div>
      </div>
    </div>

    <div class="crud-body">
      <div v-if="loading" class="crud-loading">
        <div class="spinner-border crud-spinner" role="status">
          <span class="sr-only">Cargando...</span>
        </div>
        <p class="mt-2 text-muted">Cargando productos...</p>
      </div>

      <div v-else-if="filteredProductos.length === 0" class="crud-empty">
        <i class="fas fa-inbox crud-empty-icon"></i>
        <p class="crud-empty-text">No hay productos registrados</p>
      </div>

      <div v-else class="table-responsive">
        <table class="crud-table crud-table-compact table">
          <thead>
            <tr>
              <th width="4%">#</th>
              <th width="30%">Producto</th>
              <th width="10%">Categoría</th>
              <th width="8%">Tamaño</th>
              <th width="9%">Precio</th>
              <th width="8%">Estado</th>
              <th width="10%" class="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(producto, index) in filteredProductos" :key="producto.id">
              <td><strong>{{ index + 1 }}</strong></td>
              <td>
                <div class="producto-compact">
                  <img 
                    :src="producto.imagenUrl || '/images/pizza-1.jpg'" 
                    :alt="producto.nombre"
                    class="producto-compact-img"
                  />
                  <div class="producto-compact-info">
                    <span class="producto-compact-name">{{ producto.nombre }}</span>
                    <small class="producto-compact-desc">{{ producto.descripcion }}</small>
                    <div class="producto-ingredients" v-if="producto.ingredientes && producto.ingredientes.length > 0">
                      <span 
                        v-for="pi in producto.ingredientes.slice(0, 5)" 
                        :key="pi.id"
                        class="ingredient-mini"
                        :class="{ 'alergeno': pi.ingrediente.esAlergeno }"
                        :title="pi.ingrediente.esAlergeno ? 'Alérgeno: ' + pi.ingrediente.nombre : pi.ingrediente.nombre"
                      >
                        <i v-if="pi.ingrediente.esAlergeno" class="fas fa-exclamation-triangle"></i>
                        {{ pi.ingrediente.nombre }}
                      </span>
                      <span 
                        v-if="producto.ingredientes.length > 5" 
                        class="ingredient-mini"
                        :title="'Total: ' + producto.ingredientes.length + ' ingredientes'"
                      >
                        +{{ producto.ingredientes.length - 5 }}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <span class="crud-badge crud-badge-compact crud-badge-info">
                  {{ getCategoriaNombre(producto.idCategoria) }}
                </span>
              </td>
              <td>
                <span v-if="producto.idTamaño" class="crud-badge crud-badge-compact crud-badge-secondary">
                  {{ getTamañoNombre(producto.idTamaño) }}
                </span>
                <span v-else class="text-muted" style="font-size: 0.8rem;">-</span>
              </td>
              <td>
                <span class="precio-compact">
                  Bs. {{ Number(producto.precio).toFixed(2) }}
                </span>
              </td>
              <td>
                <span 
                  class="crud-badge crud-badge-compact"
                  :class="producto.disponible ? 'crud-badge-success' : 'crud-badge-secondary'"
                  :title="producto.disponible ? 'Disponible' : 'No disponible'"
                >
                  {{ producto.disponible ? '✓' : '✗' }}
                </span>
                <span 
                  v-if="producto.destacado" 
                  class="crud-badge crud-badge-compact crud-badge-warning ml-1"
                  title="Producto destacado"
                >
                  <i class="fas fa-star"></i>
                </span>
              </td>
              <td class="text-center">
                <button
                  @click="handleEdit(producto)"
                  class="crud-btn-edit crud-btn-compact mr-1"
                  title="Editar producto"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  @click="handleDelete(producto.id, producto.nombre)"
                  class="crud-btn-delete crud-btn-compact"
                  title="Eliminar producto"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'ProductoList' }
</script>
