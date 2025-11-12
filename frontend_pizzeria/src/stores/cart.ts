import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Producto } from '@/models/producto'

export interface CartItem {
  producto: Producto
  cantidad: number
  notas?: string
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const total = computed(() => {
    return items.value.reduce((sum, item) => {
      const precio = typeof item.producto.precio === 'string' 
        ? parseFloat(item.producto.precio) 
        : item.producto.precio
      return sum + (precio * item.cantidad)
    }, 0)
  })

  const itemCount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.cantidad, 0)
  })

  function addItem(producto: Producto, cantidad: number = 1, notas?: string) {
    const existingItem = items.value.find(item => item.producto.id === producto.id)
    
    if (existingItem) {
      existingItem.cantidad += cantidad
      if (notas) existingItem.notas = notas
    } else {
      items.value.push({ producto, cantidad, notas })
    }
  }

  function removeItem(productoId: number) {
    const index = items.value.findIndex(item => item.producto.id === productoId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  function updateQuantity(productoId: number, cantidad: number) {
    const item = items.value.find(item => item.producto.id === productoId)
    if (item) {
      item.cantidad = cantidad
      if (cantidad <= 0) {
        removeItem(productoId)
      }
    }
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    total,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  }
})
