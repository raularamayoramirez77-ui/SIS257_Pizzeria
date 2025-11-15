<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Producto } from '@/models/producto'

interface Props {
  producto: Producto | null
  show: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  addToCart: [producto: Producto, cantidad: number, notas?: string]
}>()

const cantidad = ref(1)
const notas = ref('')

const imagenUrl = computed(() => {
  return props.producto?.imagenUrl || '/images/pizza-1.jpg'
})

const precioTotal = computed(() => {
  if (!props.producto) return 0
  const precio = typeof props.producto.precio === 'string' 
    ? parseFloat(props.producto.precio) 
    : props.producto.precio
  return precio * cantidad.value
})

const handleAddToCart = () => {
  if (props.producto) {
    emit('addToCart', props.producto, cantidad.value, notas.value || undefined)
    handleClose()
  }
}

const handleClose = () => {
  cantidad.value = 1
  notas.value = ''
  emit('close')
}
</script>

<template>
  <div 
    v-if="show && producto" 
    class="modal fade show" 
    style="display: block; background: rgba(0,0,0,0.5);"
    @click.self="handleClose"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">
            <i class="fa fa-pizza-slice mr-2"></i>{{ producto.nombre }}
          </h5>
          <button type="button" class="close text-white" @click="handleClose">
            <span>&times;</span>
          </button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <div class="row">
            <!-- Imagen -->
            <div class="col-md-5">
              <img 
                :src="imagenUrl" 
                :alt="producto.nombre"
                class="img-fluid rounded"
                style="width: 100%; height: 300px; object-fit: cover;"
              >
              <div class="mt-3">
                <span v-if="producto.categoria" class="badge badge-info">
                  <i class="fa fa-tag mr-1"></i>{{ producto.categoria.nombre }}
                </span>
                <span v-if="producto.tamaño" class="badge badge-primary ml-2">
                  <i class="fa fa-ruler mr-1"></i>{{ producto.tamaño.nombre }}
                </span>
                <span v-if="producto.destacado" class="badge badge-warning ml-2">
                  <i class="fa fa-star mr-1"></i>Destacado
                </span>
              </div>
            </div>

            <!-- Detalles -->
            <div class="col-md-7">
              <h4 class="text-primary">Bs. {{ (typeof producto.precio === 'string' ? parseFloat(producto.precio) : producto.precio).toFixed(2) }}</h4>
              <p class="text-muted">{{ producto.descripcion }}</p>

              <!-- Cantidad -->
              <div class="form-group">
                <label for="cantidad"><strong>Cantidad:</strong></label>
                <div class="input-group" style="max-width: 150px;">
                  <div class="input-group-prepend">
                    <button 
                      class="btn btn-outline-secondary" 
                      type="button"
                      @click="cantidad = Math.max(1, cantidad - 1)"
                    >
                      <i class="fa fa-minus"></i>
                    </button>
                  </div>
                  <input 
                    type="number" 
                    class="form-control text-center" 
                    v-model.number="cantidad"
                    min="1"
                    max="99"
                  >
                  <div class="input-group-append">
                    <button 
                      class="btn btn-outline-secondary" 
                      type="button"
                      @click="cantidad = Math.min(99, cantidad + 1)"
                    >
                      <i class="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Notas especiales -->
              <div class="form-group">
                <label for="notas"><strong>Notas especiales:</strong></label>
                <textarea 
                  id="notas"
                  class="form-control" 
                  v-model="notas"
                  rows="3"
                  placeholder="Ej: Sin cebolla, extra queso..."
                  maxlength="200"
                ></textarea>
                <small class="form-text text-muted">
                  {{ notas.length }}/200 caracteres
                </small>
              </div>

              <!-- Total -->
              <div class="alert alert-info">
                <strong>Total: Bs. {{ precioTotal.toFixed(2) }}</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="handleClose">
            <i class="fa fa-times mr-1"></i> Cancelar
          </button>
          <button 
            type="button" 
            class="btn btn-primary"
            @click="handleAddToCart"
            :disabled="!producto.disponible"
          >
            <i class="fa fa-shopping-cart mr-1"></i>
            {{ producto.disponible ? 'Añadir al carrito' : 'No disponible' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal.show {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Asegurar que los labels sean visibles */
.form-group label {
  color: #2c3e50 !important;
  font-weight: 600;
}

/* Asegurar que los inputs sean visibles */
.form-control {
  color: #2c3e50 !important;
  background-color: #ffffff !important;
  border: 1px solid #ced4da !important;
}

.form-control:focus {
  color: #2c3e50 !important;
  background-color: #ffffff !important;
  border-color: #80bdff !important;
}

.form-control::placeholder {
  color: #6c757d !important;
  opacity: 0.7;
}

/* Texto pequeño debajo del textarea */
.form-text {
  color: #6c757d !important;
}

/* Badge personalizado */
.badge {
  font-size: 0.85rem;
  padding: 0.35rem 0.65rem;
  font-weight: 600;
}

.badge-primary {
  background-color: #fca100 !important;
  color: white;
}
</style>
