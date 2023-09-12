<script setup lang="ts">
const bookBtnContent = "Book a flight";
const captions = [
  "Soar for less",
  "Ready to takeoff",
  "Let your dreams take flight",
  "Escape to your dreams"
]
const getTitleContent = function(): string {
  const captionIndex = Math.floor(Math.random() * captions.length);
  return captions[captionIndex];
}
const season = "summer";

let summerDeal = 50
const today = new Date();
if(today.getUTCHours() > 10 ){
  summerDeal = summerDeal + 0.1 * summerDeal;
}
</script>

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
          <h1 class="title is-1">{{ getTitleContent() }}</h1>
          <h3 class="subtitle is-3">{{ season === "summer" ? `${summerDeal}% off for summer` : "20% off for the season" }}</h3>
          <button class="button is-link is-medium">{{ bookBtnContent }}</button>
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
