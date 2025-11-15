<script setup lang="ts">
import { onMounted, nextTick } from 'vue'

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      if (typeof (window as any).AOS !== 'undefined') {
        (window as any).AOS.refresh()
      }
    }, 500)
  })
})
</script>

<template>
  <!-- Hero Section -->
  <section class="home-slider owl-carousel img" style="background-image: url(/images/bg_1.jpg);">
    <div class="slider-item" style="background-image: url(/images/bg_3.jpg);">
      <div class="overlay"></div>
      <div class="container">
        <div class="row slider-text justify-content-center align-items-center">
          <div class="col-md-7 col-sm-12 text-center ftco-animate">
            <h1 class="mb-3 mt-5 bread">Servicios</h1>
            <p class="breadcrumbs"><span class="mr-2"><router-link to="/">Inicio</router-link></span> <span>Servicios</span></p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section class="ftco-section ftco-services">
    <div class="overlay"></div>
    <div class="container">
      <div class="row justify-content-center mb-5 pb-3">
        <div class="col-md-7 heading-section ftco-animate text-center">
          <h2 class="mb-4">Nuestros Servicios</h2>
          <p>Muy muy lejos, detrás de las montañas de palabras, lejos de los países Vokalia y Consonantia, viven los textos ciegos.</p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 ftco-animate">
          <div class="media d-block text-center block-6 services">
            <div class="icon d-flex justify-content-center align-items-center mb-5">
              <span class="flaticon-diet"></span>
            </div>
            <div class="media-body">
              <h3 class="heading">Comidas Saludables</h3>
              <p>Incluso el todopoderoso Pointing no tiene control sobre los textos ciegos, es casi no ortográfico.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 ftco-animate">
          <div class="media d-block text-center block-6 services">
            <div class="icon d-flex justify-content-center align-items-center mb-5">
              <span class="flaticon-bicycle"></span>
            </div>
            <div class="media-body">
              <h3 class="heading">Entrega Rápida</h3>
              <p>Incluso el todopoderoso Pointing no tiene control sobre los textos ciegos, es casi no ortográfico.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 ftco-animate">
          <div class="media d-block text-center block-6 services">
            <div class="icon d-flex justify-content-center align-items-center mb-5"><span class="flaticon-pizza-1"></span></div>
            <div class="media-body">
              <h3 class="heading">Recetas Originales</h3>
              <p>Incluso el todopoderoso Pointing no tiene control sobre los textos ciegos, es casi no ortográfico.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Hot Meals Section -->
  <section class="ftco-section">
    <div class="container">
      <div class="row justify-content-center mb-5 pb-3">
        <div class="col-md-7 heading-section ftco-animate text-center">
          <h2 class="mb-4">Comidas Calientes</h2>
          <p class="flip"><span class="deg1"></span><span class="deg2"></span><span class="deg3"></span></p>
          <p class="mt-5">Muy muy lejos, detrás de las montañas de palabras, lejos de los países Vokalia y Consonantia, viven los textos ciegos.</p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 text-center ftco-animate">
          <div class="menu-wrap">
            <a href="#" class="menu-img img mb-4" style="background-image: url(/images/pizza-1.jpg);"></a>
            <div class="text">
              <h3><a href="#">Pizza Italiana</a></h3>
              <p>Muy muy lejos, detrás de las montañas de palabras, lejos de los países Vokalia y Consonantia.</p>
              <p class="price"><span>$2.90</span></p>
              <p><a href="#" class="btn btn-white btn-outline-white">Agregar al carrito</a></p>
            </div>
          </div>
        </div>
        <div class="col-md-3 text-center ftco-animate">
          <div class="menu-wrap">
            <a href="#" class="menu-img img mb-4" style="background-image: url(/images/pizza-2.jpg);"></a>
            <div class="text">
              <h3><a href="#">Pizza Hawaiana</a></h3>
              <p>Muy muy lejos, detrás de las montañas de palabras, lejos de los países Vokalia y Consonantia.</p>
              <p class="price"><span>$2.90</span></p>
              <p><a href="#" class="btn btn-white btn-outline-white">Agregar al carrito</a></p>
            </div>
          </div>
        </div>
        <div class="col-md-3 text-center ftco-animate">
          <div class="menu-wrap">
            <a href="#" class="menu-img img mb-4" style="background-image: url(/images/pizza-3.jpg);"></a>
            <div class="text">
              <h3><a href="#">Pizza Griega</a></h3>
              <p>Muy muy lejos, detrás de las montañas de palabras, lejos de los países Vokalia y Consonantia.</p>
              <p class="price"><span>$2.90</span></p>
              <p><a href="#" class="btn btn-white btn-outline-white">Agregar al carrito</a></p>
            </div>
          </div>
        </div>
        <div class="col-md-3 text-center ftco-animate">
          <div class="menu-wrap">
            <a href="#" class="menu-img img mb-4" style="background-image: url(/images/pizza-4.jpg);"></a>
            <div class="text">
              <h3><a href="#">Pizza Americana</a></h3>
              <p>Muy muy lejos, detrás de las montañas de palabras, lejos de los países Vokalia y Consonantia.</p>
              <p class="price"><span>$2.90</span></p>
              <p><a href="#" class="btn btn-white btn-outline-white">Agregar al carrito</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Los estilos ya están incluidos en el CSS global del template */
</style>
