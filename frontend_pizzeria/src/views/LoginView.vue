<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/index'

const usuario = ref('')
const clave = ref('')
const error = ref(false)

function onSubmit() {
  const authStore = useAuthStore()
  authStore.login(usuario.value, clave.value).catch(() => (error.value = true))
}

// Agregar clase al body para ocultar header/footer
onMounted(() => {
  document.body.classList.add('login-page-mode')
})

// Remover clase al salir
onUnmounted(() => {
  document.body.classList.remove('login-page-mode')
})
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <span class="flaticon-pizza-1"></span>
          <h1>Pizza Delicious</h1>
          <p>Panel de Empleados</p>
        </div>
        
        <form class="login-form" @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="usuario" class="form-label">Usuario:</label>
            <input 
              v-model="usuario" 
              id="usuario"
              type="text" 
              class="form-input" 
              placeholder="Ingrese su usuario" 
              autofocus 
              required
            />
          </div>

          <div class="form-group">
            <label for="clave" class="form-label">Contraseña:</label>
            <input 
              v-model="clave" 
              id="clave"
              type="password" 
              class="form-input" 
              placeholder="Ingrese su contraseña" 
              required
            />
          </div>

          <p v-if="error" class="error-message">
            <i class="pi pi-exclamation-circle"></i>
            Usuario y/o contraseña incorrectos
          </p>
          
          <button type="submit" class="form-submit">
            <i class="pi pi-sign-in"></i>
            Iniciar Sesión
          </button>

          <div class="back-home">
            <router-link to="/">
              <i class="pi pi-arrow-left"></i>
              Volver al inicio
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fca100 0%, #e85a19 100%);
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 450px;
}

.login-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 50px 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.login-header .flaticon-pizza-1 {
  font-size: 60px;
  color: #fca100;
  display: block;
  margin-bottom: 15px;
}

.login-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 5px;
}

.login-header p {
  font-size: 16px;
  color: #666666;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 25px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 15px 20px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: #fca100;
  box-shadow: 0 0 0 3px rgba(252, 161, 0, 0.1);
}

.error-message {
  color: #dc3545;
  font-size: 14px;
  margin: -10px 0 20px 0;
  padding: 12px;
  background: #ffe6e6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.error-message i {
  font-size: 18px;
}

.form-submit {
  width: 100%;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #fca100 0%, #e85a19 100%);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(252, 161, 0, 0.4);
}

.form-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(252, 161, 0, 0.6);
}

.form-submit:active {
  transform: translateY(0);
}

.form-submit i {
  font-size: 18px;
}

.back-home {
  text-align: center;
  margin-top: 25px;
}

.back-home a {
  color: #666666;
  text-decoration: none;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color 0.3s ease;
}

.back-home a:hover {
  color: #fca100;
}

@media (max-width: 768px) {
  .login-card {
    padding: 40px 30px;
  }

  .login-header h1 {
    font-size: 28px;
  }

  .login-header .flaticon-pizza-1 {
    font-size: 50px;
  }
}
</style>
