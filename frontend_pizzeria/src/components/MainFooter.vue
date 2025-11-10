<template>
  <footer class="ftco-footer ftco-section img">
    <div class="overlay"></div>
    <div class="container">
      <div class="row mb-5">
        <div class="col-lg-3 col-md-6 mb-5 mb-md-5">
          <div class="ftco-footer-widget mb-4">
            <h2 class="ftco-heading-2">Sobre Nosotros</h2>
            <p>Somos una pizzería comprometida con la calidad y el sabor. Ofrecemos las mejores pizzas de la ciudad con ingredientes frescos y entrega a domicilio.</p>
            <ul class="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
              <li class="ftco-animate"><a href="#"><span class="icon-twitter"></span></a></li>
              <li class="ftco-animate"><a href="#"><span class="icon-facebook"></span></a></li>
              <li class="ftco-animate"><a href="#"><span class="icon-instagram"></span></a></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 mb-5 mb-md-5">
          <div class="ftco-footer-widget mb-4">
            <h2 class="ftco-heading-2">Blog Reciente</h2>
            <div class="block-21 mb-4 d-flex">
              <a class="blog-img mr-4" style="background-image: url(/images/image_1.jpg);"></a>
              <div class="text">
                <h3 class="heading"><a href="#">Los secretos de una pizza perfecta</a></h3>
                <div class="meta">
                  <div><a href="#"><span class="icon-calendar"></span> Nov 2, 2025</a></div>
                  <div><a href="#"><span class="icon-person"></span> Admin</a></div>
                  <div><a href="#"><span class="icon-chat"></span> 19</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-2 col-md-6 mb-5 mb-md-5">
          <div class="ftco-footer-widget mb-4 ml-md-4">
            <h2 class="ftco-heading-2">Servicios</h2>
            <ul class="list-unstyled">
              <li><a href="#" class="py-2 d-block">Cocinado</a></li>
              <li><a href="#" class="py-2 d-block">Entrega</a></li>
              <li><a href="#" class="py-2 d-block">Comida de Calidad</a></li>
              <li><a href="#" class="py-2 d-block">Mixto</a></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 mb-5 mb-md-5">
          <div class="ftco-footer-widget mb-4">
            <h2 class="ftco-heading-2">¿Tienes Preguntas?</h2>
            <div class="block-23 mb-3">
              <ul>
                <li><span class="icon icon-map-marker"></span><span class="text">Santa Cruz, Bolivia</span></li>
                <li><a href="#"><span class="icon icon-phone"></span><span class="text">+591 123 456 789</span></a></li>
                <li><a href="#"><span class="icon icon-envelope"></span><span class="text">info@pizzadelicious.com</span></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-center">
          <p>Copyright &copy;{{ currentYear }} Todos los derechos reservados | Esta plantilla fue creada con <i class="icon-heart" aria-hidden="true"></i> por <a href="" target="_blank">El d4vd</a></p>
        </div>
      </div>
    </div>
  </footer>
  
  <!-- loader - se oculta automáticamente con main.js -->
  <div id="ftco-loader" class="show fullscreen">
    <svg class="circular" width="48px" height="48px">
      <circle class="path-bg" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke="#eeeeee"/>
      <circle class="path" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke-miterlimit="10" stroke="#F96D00"/>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

onMounted(() => {
  // Asegurar que el loader se oculte después de que Vue monte el componente
  setTimeout(() => {
    const loader = document.getElementById('ftco-loader')
    if (loader) {
      loader.classList.remove('show')
      setTimeout(() => {
        loader.style.display = 'none'
      }, 300)
    }
  }, 500)
})
</script>

<style scoped>
/* Los estilos ya están incluidos en el CSS global del template */
</style>
