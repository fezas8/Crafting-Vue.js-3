<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from "vue";

const bookBtnContent = "Book a flight";
const captions = ref<Array<string>>([
  "Soar for less",
  "Ready to takeoff",
  "Let your dreams take flight",
  "Escape to your dreams"
])
const getTitleContent = function(): string {
  return captions.value[captions.value.length-1];
}

let title: Ref<string> = ref(getTitleContent());
let intervalId = setInterval(() => {
 title.value = getTitleContent();
 captions.value.pop();
 console.log("title", title.value);
 console.log("captions", captions.value);
 
}, 1000)

setTimeout(() => {
  clearInterval(intervalId)
}, 4000);

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
          <h1 class="title is-1">{{ title }}</h1>
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
