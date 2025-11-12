<script setup lang="ts">
import { ref } from 'vue'
import VentaList from '@/components/venta/VentaList.vue'
import VentaDetalle from '@/components/venta/VentaDetalle.vue'
import VentaSave from '@/components/venta/VentaSave.vue'
import type { Venta } from '@/models/venta'

const listRef = ref<InstanceType<typeof VentaList> | null>(null)
const ventaSeleccionada = ref<Venta | null>(null)
const showDetalleModal = ref(false)
const showNuevaVentaModal = ref(false)

const handleVerDetalles = (venta: Venta) => {
  console.log('📥 VentasView - handleVerDetalles recibido')
  console.log('📋 Venta recibida:', venta)
  ventaSeleccionada.value = venta
  showDetalleModal.value = true
  console.log('✅ Modal de detalles abierto:', showDetalleModal.value)
  console.log('✅ Venta seleccionada:', ventaSeleccionada.value?.numeroVenta)
}

const handleCerrarDetalle = () => {
  showDetalleModal.value = false
  ventaSeleccionada.value = null
  listRef.value?.obtenerLista()
}

const handleNuevaVenta = () => {
  showNuevaVentaModal.value = true
}

const handleCerrarNuevaVenta = () => {
  showNuevaVentaModal.value = false
}

const handleVentaGuardada = () => {
  showNuevaVentaModal.value = false
  listRef.value?.obtenerLista()
}
</script>

<template>
  <div class="container-fluid">
    <!-- Header -->
    <div class="row mb-4">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h2 class="mb-1">
              <i class="fas fa-shopping-cart text-primary mr-2"></i>
              Gestión de Ventas
            </h2>
            <p class="text-muted mb-0">
              Administra las ventas online y presenciales
            </p>
          </div>
          <div>
            <router-link 
              to="/dashboard" 
              class="btn btn-outline-secondary mr-2"
            >
              <i class="fas fa-arrow-left mr-1"></i> Volver
            </router-link>
            <button 
              class="btn btn-primary btn-lg"
              @click="handleNuevaVenta"
            >
              <i class="fas fa-plus mr-2"></i>
              Nueva Venta Presencial
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista -->
    <div class="row">
      <div class="col-12">
        <VentaList 
          ref="listRef"
          @viewDetails="handleVerDetalles"
        />
      </div>
    </div>

    <!-- Modal de Nueva Venta -->
    <VentaSave
      :show="showNuevaVentaModal"
      @close="handleCerrarNuevaVenta"
      @saved="handleVentaGuardada"
    />

    <!-- Modal de Detalles -->
    <VentaDetalle
      :venta="ventaSeleccionada"
      :show="showDetalleModal"
      @close="handleCerrarDetalle"
    />
  </div>
</template>

<style scoped>
.border-left-primary {
  border-left: 4px solid #4e73df;
}

.border-left-success {
  border-left: 4px solid #1cc88a;
}

.border-left-info {
  border-left: 4px solid #36b9cc;
}

.border-left-warning {
  border-left: 4px solid #f6c23e;
}
</style>
