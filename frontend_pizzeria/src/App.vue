<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'

const route = useRoute()

// Rutas donde NO se debe mostrar header y footer
const routesWithoutLayout = computed(() => {
  const path = route.path
  return path.startsWith('/dashboard') || path === '/login'
})
</script>

<template>
  <MainHeader v-if="!routesWithoutLayout" />
  <RouterView />
  <MainFooter v-if="!routesWithoutLayout" />
</template>

<style>
/* Estilos mínimos de App.vue - el resto está en fix-styles.css */
#app {
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}
</style>
