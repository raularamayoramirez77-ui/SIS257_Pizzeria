<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useToast } from 'vue-toastification'
import axios from '@/plugins/axios'

interface Props {
  show: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const cartStore = useCartStore()
const toast = useToast()

// Ref al contenedor del body
const checkoutBodyRef = ref<HTMLDivElement | null>(null)

// Datos del cliente
const formData = ref({
  nombreCliente: '',
  telefono: '',
  direccion: '',
  ciudad: 'Cochabamba',
  tipoVenta: 'online' as 'online' | 'presencial',
  metodoPago: 'qr' as 'qr' | 'tarjeta' | 'efectivo' | 'debito',
  notasAdicionales: ''
})

// Validación
const errors = ref({
  nombreCliente: '',
  telefono: '',
  direccion: ''
})

// Estados
const loading = ref(false)
const step = ref(1) // 1: Datos cliente, 2: Método de pago, 3: Confirmación

// Scroll al inicio del contenedor
const scrollToTop = () => {
  nextTick(() => {
    if (checkoutBodyRef.value) {
      checkoutBodyRef.value.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  })
}

const total = computed(() => cartStore.total)
const costoDelivery = computed(() => 10) // Siempre delivery para pedidos online
const totalConDelivery = computed(() => total.value + costoDelivery.value)

const formatPrice = (price: number) => {
  return `Bs. ${price.toFixed(2)}`
}

// Validar formulario
const validateStep1 = () => {
  errors.value = {
    nombreCliente: '',
    telefono: '',
    direccion: ''
  }

  let isValid = true

  if (!formData.value.nombreCliente.trim()) {
    errors.value.nombreCliente = 'El nombre es requerido'
    isValid = false
  }

  if (!formData.value.telefono.trim()) {
    errors.value.telefono = 'El teléfono es requerido'
    isValid = false
  } else if (!/^\d{7,8}$/.test(formData.value.telefono)) {
    errors.value.telefono = 'Teléfono inválido (7-8 dígitos)'
    isValid = false
  }

  if (!formData.value.direccion.trim()) {
    errors.value.direccion = 'La dirección de entrega es requerida'
    isValid = false
  }

  return isValid
}

const nextStep = () => {
  if (step.value === 1 && validateStep1()) {
    step.value = 2
    scrollToTop()
  } else if (step.value === 2) {
    step.value = 3
    scrollToTop()
  }
}

const prevStep = () => {
  if (step.value > 1) {
    step.value--
    scrollToTop()
  }
}

const handleConfirmOrder = async () => {
  try {
    loading.value = true

    // Preparar los datos de la venta
    const ventaData = {
      clienteNombre: formData.value.nombreCliente,
      clienteTelefono: formData.value.telefono,
      clienteNotas: `Delivery - ${formData.value.direccion}, ${formData.value.ciudad}`,
      tipoVenta: formData.value.tipoVenta,
      estado: 'pendiente',
      metodoPago: formData.value.metodoPago,
      subtotal: total.value,
      descuento: 0,
      total: totalConDelivery.value,
      notasInternas: formData.value.notasAdicionales || null,
      detalles: cartStore.items.map(item => ({
        idProducto: item.producto.id,
        nombreProducto: item.producto.nombre,
        cantidad: item.cantidad,
        precioUnitario: typeof item.producto.precio === 'string' 
          ? parseFloat(item.producto.precio) 
          : item.producto.precio,
        subtotal: (typeof item.producto.precio === 'string' 
          ? parseFloat(item.producto.precio) 
          : item.producto.precio) * item.cantidad,
        notas: item.notas || null
      }))
    }

    console.log('📤 Enviando venta:', ventaData)

    // Enviar al backend
    const response = await axios.post('/ventas', ventaData)

    console.log('✅ Venta creada:', response.data)

    // Mostrar toast de éxito en el centro
    toast.success(
      `🎉 ¡Gracias por su compra!\n\nSu pedido #${response.data.numeroVenta} ha sido registrado exitosamente.\n\n📍 Será entregado en:\n${formData.value.direccion}, ${formData.value.ciudad}\n\n⏱️ Tiempo estimado de entrega: 30-45 minutos`,
      {
        position: 'top-center',
        timeout: 8000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        icon: '🍕'
      }
    )

    // Limpiar carrito
    cartStore.clearCart()

    // Cerrar modal
    handleClose()

    // Opcional: Redirigir a la página de inicio después de 2 segundos
    setTimeout(() => {
      // router.push('/')
    }, 2000)

  } catch (error: any) {
    console.error('❌ Error al crear venta:', error)
    toast.error(
      error.response?.data?.message || 'Error al procesar el pedido. Por favor, intente nuevamente.',
      {
        position: 'top-center',
        timeout: 5000
      }
    )
  } finally {
    loading.value = false
  }
}

const handleClose = () => {
  step.value = 1
  formData.value = {
    nombreCliente: '',
    telefono: '',
    direccion: '',
    ciudad: 'Cochabamba',
    tipoVenta: 'online',
    metodoPago: 'qr',
    notasAdicionales: ''
  }
  errors.value = {
    nombreCliente: '',
    telefono: '',
    direccion: ''
  }
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="show" 
        class="modal-overlay"
        @click.self="handleClose"
      >
        <div class="checkout-modal">
          <!-- Header -->
          <div class="checkout-header">
            <h3 class="checkout-title">
              <i class="fas fa-shopping-bag mr-2"></i>
              Finalizar Pedido
            </h3>
            <button class="close-btn" @click="handleClose">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <!-- Progress Steps -->
          <div class="progress-steps">
            <div class="step" :class="{ active: step >= 1, completed: step > 1 }">
              <div class="step-icon">1</div>
              <div class="step-label">Datos</div>
            </div>
            <div class="step-line" :class="{ active: step > 1 }"></div>
            <div class="step" :class="{ active: step >= 2, completed: step > 2 }">
              <div class="step-icon">2</div>
              <div class="step-label">Pago</div>
            </div>
            <div class="step-line" :class="{ active: step > 2 }"></div>
            <div class="step" :class="{ active: step >= 3 }">
              <div class="step-icon">3</div>
              <div class="step-label">Confirmar</div>
            </div>
          </div>

          <!-- Body -->
          <div ref="checkoutBodyRef" class="checkout-body">
            <!-- Step 1: Datos del Cliente -->
            <div v-if="step === 1" class="step-content">
              <h4 class="mb-4">Información de Entrega</h4>

              <!-- Info de Delivery -->
              <div class="delivery-info-banner">
                <i class="fas fa-motorcycle mr-2"></i>
                <div>
                  <strong>Pedido con Delivery</strong>
                  <p>Tu pedido será entregado en la dirección que indiques (Costo: Bs. 10.00)</p>
                </div>
              </div>

              <!-- Nombre -->
              <div class="form-group">
                <label for="nombre" class="form-label">Nombre Completo *</label>
                <input 
                  type="text" 
                  id="nombre"
                  class="form-control"
                  v-model="formData.nombreCliente"
                  placeholder="Ej: Juan Pérez"
                  :class="{ 'is-invalid': errors.nombreCliente }"
                >
                <div v-if="errors.nombreCliente" class="invalid-feedback">
                  {{ errors.nombreCliente }}
                </div>
              </div>

              <!-- Teléfono -->
              <div class="form-group">
                <label for="telefono" class="form-label">Teléfono *</label>
                <input 
                  type="tel" 
                  id="telefono"
                  class="form-control"
                  v-model="formData.telefono"
                  placeholder="Ej: 70123456"
                  maxlength="8"
                  :class="{ 'is-invalid': errors.telefono }"
                >
                <div v-if="errors.telefono" class="invalid-feedback">
                  {{ errors.telefono }}
                </div>
              </div>

              <!-- Dirección de Entrega -->
              <div class="form-group">
                <label for="direccion" class="form-label">Dirección de Entrega *</label>
                <textarea 
                  id="direccion"
                  class="form-control"
                  v-model="formData.direccion"
                  rows="2"
                  placeholder="Ej: Av. América #123, entre calles A y B"
                  :class="{ 'is-invalid': errors.direccion }"
                ></textarea>
                <div v-if="errors.direccion" class="invalid-feedback">
                  {{ errors.direccion }}
                </div>
              </div>

              <!-- Ciudad -->
              <div class="form-group">
                <label for="ciudad" class="form-label">Ciudad</label>
                <select id="ciudad" class="form-control" v-model="formData.ciudad">
                  <option value="Cochabamba">Cochabamba</option>
                  <option value="La Paz">La Paz</option>
                  <option value="Santa Cruz">Santa Cruz</option>
                  <option value="Oruro">Oruro</option>
                  <option value="Potosí">Potosí</option>
                  <option value="Sucre">Sucre</option>
                </select>
              </div>

              <!-- Notas adicionales -->
              <div class="form-group">
                <label for="notas" class="form-label">Notas Adicionales (Opcional)</label>
                <textarea 
                  id="notas"
                  class="form-control"
                  v-model="formData.notasAdicionales"
                  rows="2"
                  placeholder="Ej: Tocar el timbre, llamar al llegar..."
                  maxlength="200"
                ></textarea>
                <small class="form-text text-muted">
                  {{ formData.notasAdicionales.length }}/200 caracteres
                </small>
              </div>
            </div>

            <!-- Step 2: Método de Pago -->
            <div v-if="step === 2" class="step-content">
              <h4 class="mb-4">Método de Pago</h4>

              <!-- Info de pago online -->
              <div class="payment-info-banner">
                <i class="fas fa-shield-alt mr-2"></i>
                <span>Pago anticipado requerido para pedidos con delivery</span>
              </div>

              <div class="payment-methods">
                <!-- QR -->
                <label class="payment-card">
                  <input type="radio" value="qr" v-model="formData.metodoPago">
                  <div class="payment-content">
                    <div class="payment-icon">
                      <i class="fas fa-qrcode"></i>
                    </div>
                    <div class="payment-info">
                      <h5>Código QR</h5>
                      <p>Pago mediante código QR (Simulado)</p>
                    </div>
                  </div>
                </label>

                <!-- Tarjeta de Crédito -->
                <label class="payment-card">
                  <input type="radio" value="tarjeta" v-model="formData.metodoPago">
                  <div class="payment-content">
                    <div class="payment-icon">
                      <i class="fas fa-credit-card"></i>
                    </div>
                    <div class="payment-info">
                      <h5>Tarjeta de Crédito</h5>
                      <p>Pago con tarjeta de crédito (Simulado)</p>
                    </div>
                  </div>
                </label>

                <!-- Tarjeta de Débito -->
                <label class="payment-card">
                  <input type="radio" value="debito" v-model="formData.metodoPago">
                  <div class="payment-content">
                    <div class="payment-icon">
                      <i class="fas fa-credit-card"></i>
                    </div>
                    <div class="payment-info">
                      <h5>Tarjeta de Débito</h5>
                      <p>Pago con tarjeta de débito (Simulado)</p>
                    </div>
                  </div>
                </label>
              </div>

              <!-- Simulación de pago -->
              <div v-if="formData.metodoPago === 'qr'" class="payment-simulation mt-4">
                <div class="qr-container">
                  <div class="qr-placeholder">
                    <i class="fas fa-qrcode"></i>
                    <p>Código QR (Simulado)</p>
                    <small>Escanea con tu app bancaria</small>
                  </div>
                </div>
              </div>

              <div v-if="formData.metodoPago === 'tarjeta' || formData.metodoPago === 'debito'" class="payment-simulation mt-4">
                <div class="card-form">
                  <div class="alert alert-info">
                    <i class="fas fa-info-circle mr-2"></i>
                    <strong>Modo Simulación:</strong> No se procesarán pagos reales
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="Número de tarjeta" value="**** **** **** 1234" disabled>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <input type="text" class="form-control" placeholder="MM/AA" value="12/25" disabled>
                    </div>
                    <div class="col-6">
                      <input type="text" class="form-control" placeholder="CVV" value="***" disabled>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 3: Confirmación -->
            <div v-if="step === 3" class="step-content">
              <h4 class="mb-4">Confirmar Pedido</h4>

              <div class="confirmation-details">
                <!-- Datos del cliente -->
                <div class="detail-section">
                  <h5><i class="fas fa-user mr-2"></i>Datos del Cliente</h5>
                  <div class="detail-row">
                    <span class="detail-label">Nombre:</span>
                    <span class="detail-value">{{ formData.nombreCliente }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Teléfono:</span>
                    <span class="detail-value">{{ formData.telefono }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Dirección:</span>
                    <span class="detail-value">{{ formData.direccion }}, {{ formData.ciudad }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Tipo de entrega:</span>
                    <span class="detail-value">
                      <span class="badge badge-info">
                        <i class="fas fa-motorcycle mr-1"></i>Delivery
                      </span>
                    </span>
                  </div>
                </div>

                <!-- Método de pago -->
                <div class="detail-section">
                  <h5><i class="fas fa-wallet mr-2"></i>Método de Pago</h5>
                  <div class="detail-row">
                    <span class="detail-label">Forma de pago:</span>
                    <span class="detail-value">
                      <span class="badge badge-success">
                        {{ formData.metodoPago === 'qr' ? 'Código QR' : 
                           formData.metodoPago === 'tarjeta' ? 'Tarjeta de Crédito' : 
                           'Tarjeta de Débito' }}
                      </span>
                    </span>
                  </div>
                </div>

                <!-- Resumen del pedido -->
                <div class="detail-section">
                  <h5><i class="fas fa-shopping-cart mr-2"></i>Tu Pedido</h5>
                  <div v-for="item in cartStore.items" :key="item.producto.id" class="cart-item-summary">
                    <div class="item-summary-left">
                      <span class="item-quantity">{{ item.cantidad }}x</span>
                      <span class="item-name">{{ item.producto.nombre }}</span>
                    </div>
                    <span class="item-price">{{ formatPrice((typeof item.producto.precio === 'string' ? parseFloat(item.producto.precio) : item.producto.precio) * item.cantidad) }}</span>
                  </div>
                  
                  <div class="totals-summary">
                    <div class="total-row">
                      <span>Subtotal:</span>
                      <span>{{ formatPrice(total) }}</span>
                    </div>
                    <div v-if="costoDelivery > 0" class="total-row">
                      <span>Delivery:</span>
                      <span>{{ formatPrice(costoDelivery) }}</span>
                    </div>
                    <div class="total-row total-final">
                      <span>Total:</span>
                      <span>{{ formatPrice(totalConDelivery) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="checkout-footer">
            <div class="footer-left">
              <div class="total-display">
                <span class="total-label">Total:</span>
                <span class="total-amount">{{ formatPrice(totalConDelivery) }}</span>
              </div>
            </div>
            <div class="footer-right">
              <button 
                v-if="step > 1"
                type="button" 
                class="btn btn-outline-secondary mr-2"
                @click="prevStep"
                :disabled="loading"
              >
                <i class="fas fa-arrow-left mr-1"></i>
                Atrás
              </button>
              <button 
                v-if="step < 3"
                type="button" 
                class="btn btn-primary"
                @click="nextStep"
              >
                Siguiente
                <i class="fas fa-arrow-right ml-1"></i>
              </button>
              <button 
                v-if="step === 3"
                type="button" 
                class="btn btn-success"
                @click="handleConfirmOrder"
                :disabled="loading"
              >
                <span v-if="loading">
                  <i class="fas fa-spinner fa-spin mr-1"></i>
                  Procesando...
                </span>
                <span v-else>
                  <i class="fas fa-check-circle mr-1"></i>
                  Confirmar Pedido
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
  overflow-y: auto;
}

.checkout-modal {
  background: white;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Header */
.checkout-header {
  padding: 18px 25px;
  background: linear-gradient(135deg, #fca100, #e85a19);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px 16px 0 0;
  flex-shrink: 0;
}

.checkout-title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

/* Progress Steps */
.progress-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 20px;
  background: #f8f9fa;
  flex-shrink: 0;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.step-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: white;
  border: 2px solid #dee2e6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  color: #6c757d;
  transition: all 0.3s ease;
}

.step.active .step-icon {
  background: #fca100;
  border-color: #fca100;
  color: white;
}

.step.completed .step-icon {
  background: #28a745;
  border-color: #28a745;
  color: white;
}

.step-label {
  font-size: 11px;
  font-weight: 600;
  color: #6c757d;
}

.step.active .step-label {
  color: #fca100;
}

.step-line {
  width: 40px;
  height: 2px;
  background: #dee2e6;
  transition: all 0.3s ease;
}

.step-line.active {
  background: #28a745;
}

/* Body */
.checkout-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px 25px;
  scroll-behavior: smooth;
}

.step-content {
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

.step-content h4 {
  color: #2c3e50;
  font-weight: 700;
  border-bottom: 2px solid #fca100;
  padding-bottom: 8px;
  margin-bottom: 15px;
  font-size: 18px;
}

/* Form Elements */
.form-group {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #2c3e50;
  font-size: 13px;
}

.form-control {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  color: #2c3e50 !important;
  background-color: #ffffff !important;
}

.form-control:focus {
  border-color: #fca100;
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(252, 161, 0, 0.15);
}

.form-control.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: #dc3545;
}

.form-text {
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: #6c757d !important;
}

/* Tipo de Venta */
.tipo-venta-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.radio-card {
  cursor: pointer;
}

.radio-card input[type="radio"] {
  display: none;
}

.radio-content {
  padding: 15px;
  border: 2px solid #dee2e6;
  border-radius: 10px;
  text-align: center;
  transition: all 0.3s ease;
  background: white;
}

.radio-content i {
  font-size: 28px;
  color: #6c757d;
  margin-bottom: 8px;
  display: block;
}

.radio-content span {
  display: block;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
  font-size: 14px;
}

.radio-content small {
  color: #6c757d;
  font-size: 11px;
}

.radio-card input[type="radio"]:checked + .radio-content {
  border-color: #fca100;
  background: rgba(252, 161, 0, 0.05);
}

.radio-card input[type="radio"]:checked + .radio-content i {
  color: #fca100;
}

/* Info Banners */
.delivery-info-banner {
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  border-left: 4px solid #2196f3;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;
}

.delivery-info-banner i {
  font-size: 24px;
  color: #2196f3;
  flex-shrink: 0;
  margin-top: 2px;
}

.delivery-info-banner strong {
  display: block;
  color: #1976d2;
  margin-bottom: 4px;
  font-size: 14px;
}

.delivery-info-banner p {
  margin: 0;
  color: #0d47a1;
  font-size: 13px;
  line-height: 1.4;
}

.payment-info-banner {
  background: linear-gradient(135deg, #fff3e0, #ffe0b2);
  border-left: 4px solid #ff9800;
  padding: 12px 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  font-size: 13px;
  color: #e65100;
  font-weight: 600;
}

.payment-info-banner i {
  font-size: 18px;
  color: #ff9800;
}

/* Payment Methods */
.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.payment-card {
  cursor: pointer;
}

.payment-card input[type="radio"] {
  display: none;
}

.payment-content {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border: 2px solid #dee2e6;
  border-radius: 10px;
  transition: all 0.3s ease;
  background: white;
}

.payment-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #6c757d;
  flex-shrink: 0;
}

.payment-info h5 {
  margin: 0 0 4px 0;
  font-size: 15px;
  font-weight: 700;
  color: #2c3e50;
}

.payment-info p {
  margin: 0;
  font-size: 12px;
  color: #6c757d;
}

.payment-card input[type="radio"]:checked + .payment-content {
  border-color: #fca100;
  background: rgba(252, 161, 0, 0.05);
}

.payment-card input[type="radio"]:checked + .payment-content .payment-icon {
  background: #fca100;
  color: white;
}

/* Payment Simulation */
.payment-simulation {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
}

.qr-container {
  display: flex;
  justify-content: center;
}

.qr-placeholder {
  width: 200px;
  height: 200px;
  background: white;
  border: 2px dashed #dee2e6;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6c757d;
}

.qr-placeholder i {
  font-size: 60px;
  margin-bottom: 10px;
}

.qr-placeholder p {
  margin: 0;
  font-weight: 600;
}

.qr-placeholder small {
  font-size: 11px;
}

.card-form {
  max-width: 400px;
  margin: 0 auto;
}

/* Confirmation */
.confirmation-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.detail-section {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
}

.detail-section h5 {
  margin: 0 0 12px 0;
  font-size: 15px;
  font-weight: 700;
  color: #2c3e50;
  border-bottom: 2px solid #dee2e6;
  padding-bottom: 8px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 8px 0;
  border-bottom: 1px solid #dee2e6;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  font-weight: 600;
  color: #6c757d;
  font-size: 13px;
}

.detail-value {
  font-weight: 500;
  color: #2c3e50;
  text-align: right;
  max-width: 60%;
  font-size: 13px;
}

.cart-item-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #dee2e6;
}

.item-summary-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.item-quantity {
  font-weight: 700;
  color: #fca100;
}

.item-name {
  color: #2c3e50;
  font-weight: 500;
}

.item-price {
  font-weight: 700;
  color: #28a745;
}

.totals-summary {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 2px solid #dee2e6;
}

.total-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  color: #2c3e50;
  font-weight: 500;
}

.total-final {
  font-size: 18px;
  font-weight: 700;
  color: #fca100;
  padding-top: 12px;
  border-top: 2px solid #fca100;
  margin-top: 8px;
}

/* Footer */
.checkout-footer {
  padding: 15px 25px;
  background: #f8f9fa;
  border-top: 2px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0 0 16px 16px;
  flex-shrink: 0;
}

.footer-left {
  flex: 1;
}

.total-display {
  display: flex;
  align-items: center;
  gap: 8px;
}

.total-label {
  font-size: 14px;
  font-weight: 600;
  color: #6c757d;
}

.total-amount {
  font-size: 20px;
  font-weight: 700;
  color: #28a745;
}

.footer-right {
  display: flex;
  gap: 8px;
}

/* Buttons */
.btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 13px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: #fca100;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #e85a19;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(252, 161, 0, 0.4);
}

.btn-success {
  background: #28a745;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background: #218838;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);
}

.btn-outline-secondary {
  background: white;
  border: 2px solid #6c757d;
  color: #6c757d;
}

.btn-outline-secondary:hover:not(:disabled) {
  background: #6c757d;
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .checkout-modal {
    max-width: 100%;
    max-height: 100vh;
    border-radius: 0;
  }

  .checkout-header {
    border-radius: 0;
    padding: 15px 20px;
  }

  .checkout-title {
    font-size: 18px;
  }

  .progress-steps {
    padding: 12px 15px;
  }

  .step-line {
    width: 25px;
  }

  .step-icon {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }

  .checkout-body {
    padding: 15px;
  }

  .tipo-venta-options {
    grid-template-columns: 1fr;
  }

  .checkout-footer {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
    padding: 12px 15px;
  }

  .total-amount {
    font-size: 18px;
  }

  .footer-right {
    width: 100%;
  }

  .footer-right .btn {
    flex: 1;
  }
}

/* Scrollbar */
.checkout-body::-webkit-scrollbar {
  width: 8px;
}

.checkout-body::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.checkout-body::-webkit-scrollbar-thumb {
  background: #fca100;
  border-radius: 4px;
}

.checkout-body::-webkit-scrollbar-thumb:hover {
  background: #e85a19;
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
