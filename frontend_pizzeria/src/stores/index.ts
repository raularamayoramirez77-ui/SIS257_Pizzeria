import { defineStore } from 'pinia'
import { getTokenFromLocalStorage } from '@/helpers'
import http from '@/plugins/axios'
import router from '@/router'

interface Usuario {
  id: number
  usuario: string
  nombre: string
  email?: string
}

const useAuthStore = defineStore('auth', {
  state: () => ({
    user: localStorage.getItem('user') || '',
    usuario: localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario')!) : null as Usuario | null,
    token: getTokenFromLocalStorage(),
    returnUrl: '',
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    userName: (state) => state.usuario?.nombre || state.user || 'Usuario',
  },
  actions: {
    async login(usuario: string, clave: string) {
      await http.post('auth/login', { usuario, clave }).then((response: any) => {
        this.user = response.data.usuario
        this.usuario = response.data.usuarioData || { id: 0, usuario: response.data.usuario, nombre: response.data.usuario }
        this.token = response.data.access_token

        localStorage.setItem('user', this.user || '')
        localStorage.setItem('usuario', JSON.stringify(this.usuario))
        localStorage.setItem('token', this.token || '')

        router.push(this.returnUrl || '/dashboard')
      })
    },
    logout() {
      localStorage.clear()
      this.$reset()
      router.push('/login')
    },
  },
})

export { useAuthStore }
export { useCartStore } from './cart'
