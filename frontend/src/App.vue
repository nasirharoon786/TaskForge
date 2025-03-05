<script setup>
import Navbar from './components/navbar.vue';
import Footer from './components/footer.vue';
</script>

<template>
  <div class="container">
    <Navbar></Navbar>
    <router-view></router-view>
  </div>

  <Footer></Footer>
</template>

<style scoped></style>
