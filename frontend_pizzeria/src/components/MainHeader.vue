<template>
  <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
    <div class="container">
      <RouterLink to="/" class="navbar-brand">
        <span class="flaticon-pizza-1 mr-1"></span>Pizza<br><small>Delicious</small>
      </RouterLink>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="oi oi-menu"></span> Menú
      </button>
      <div class="collapse navbar-collapse" id="ftco-nav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Inicio</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/menu" class="nav-link">Menú</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/services" class="nav-link">Servicios</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/blog" class="nav-link">Blog</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/about" class="nav-link">Nosotros</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/contact" class="nav-link">Contacto</RouterLink>
          </li>

          <!-- Carrito de compras -->
          <li class="nav-item">
            <RouterLink to="/menu" class="nav-link cart-nav-link">
              <i class="fas fa-shopping-cart"></i>
              <span v-if="cartItemCount > 0" class="cart-badge-header">{{ cartItemCount }}</span>
            </RouterLink>
          </li>
          
          <!-- Botón para Panel de Administración (solo si está logueado) -->
          <li v-if="isAuthenticated" class="nav-item">
            <RouterLink to="/dashboard" class="nav-link admin-link">
              <i class="fas fa-tachometer-alt mr-1"></i>
              Panel Admin
            </RouterLink>
          </li>
          
          <!-- Botón de Iniciar Sesión/Usuario -->
          <li class="nav-item">
            <RouterLink 
              v-if="!isAuthenticated" 
              to="/login" 
              class="nav-link login-link"
            >
              <i class="fas fa-sign-in-alt mr-1"></i>
              Iniciar Sesión
            </RouterLink>
            <a 
              v-else 
              href="#" 
              class="nav-link user-link"
              @click.prevent="handleLogout"
              title="Cerrar sesión"
            >
              <i class="fas fa-user-circle mr-1"></i>
              {{ userName }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useAuthStore } from '@/stores'
import { useCartStore } from '@/stores/cart'

const authStore = useAuthStore()
const cartStore = useCartStore()
const router = useRouter()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const userName = computed(() => authStore.userName)
const cartItemCount = computed(() => cartStore.itemCount)

const handleLogout = () => {
  if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
    authStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped>
/* Los estilos ya están incluidos en el CSS global del template */

/* Estilos para el botón de admin */
.admin-link {
  background-color: rgba(252, 161, 0, 0.15) !important;
  border-radius: 6px;
  padding: 8px 16px !important;
  margin-left: 10px;
  transition: all 0.3s ease;
}

.admin-link:hover {
  background-color: rgba(252, 161, 0, 0.3) !important;
  transform: translateY(-2px);
}

/* Estilos para el botón de login */
.login-link {
  background-color: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  padding: 8px 16px !important;
  margin-left: 10px;
  transition: all 0.3s ease;
}

.login-link:hover {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-color: rgba(255, 255, 255, 0.5);
}

/* Estilos para el usuario logueado */
.user-link {
  background-color: rgba(40, 167, 69, 0.15) !important;
  border-radius: 6px;
  padding: 8px 16px !important;
  margin-left: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.user-link:hover {
  background-color: rgba(40, 167, 69, 0.3) !important;
  transform: translateY(-2px);
}

/* Carrito en el header */
.cart-nav-link {
  position: relative;
  font-size: 20px !important;
  padding: 8px 16px !important;
}

.cart-badge-header {
  position: absolute;
  top: 0;
  right: 5px;
  background: #fca100;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;
  border: 2px solid #1a1a1a;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* Responsive */
@media (max-width: 991px) {
  .admin-link,
  .login-link,
  .user-link {
    margin-left: 0;
    margin-top: 5px;
    display: inline-block;
  }
  
  .cart-nav-link {
    padding: 10px 16px !important;
  }
}
</style>
