<script setup lang="ts"></script>

<template>
  <main>
    <section class="hero is-fullheight">
      <div class="hero-head">
        <div class="container">
          <figure class="image is-64x64">
            <img  src="../assets/logo.png" alt="Logo" />
          </figure>
        </div>
      </div>

      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1">Soar for less</h1>
          <h3 class="subtitle is-3">50% off for summer</h3>
          <button class="button is-link is-medium">Book a flight</button>
        </div>
      </div>
    </section>
  </main>
</template>
<style scoped>
.hero {
  background-image: url(https://images.unsplash.com/photo-1586500036065-bdaeac7a4feb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3088&q=80);
  background-position: center;
  background-size: cover;
}
.image {
  margin: 16px;
}
</style>
