<script setup lang="ts">
import { ref, computed } from 'vue'

const bookBtnContent = 'Book a flight'
const title = ref<string>('Let your dreams take flight...')
const titleCapitalized = computed<string>(() =>
  title.value.replace(/(^\w{1})|(\s+\w{1})/g, (alphabet) => alphabet.toUpperCase())
)
const bookingDisabled = ref(true)
const themeClass = ref('is-link')
const dynamicAttr = ref('id')
const anchorAttributes = {
  id: 'logo',
  href: '/'
}
// const isTextCentered = ref(true);
// const containerClasses = {
//   "container": true,
//   "has-text-centered": isTextCentered
// };
const textAlignment = ref('has-text-centered')
const containerClasses = ['container', textAlignment.value]
const bgImage = "url('https://picsum.photos/800/500')";
</script>

<template>
  <main>
    <section class="hero" :class="themeClass">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <a v-bind="anchorAttributes" class="navbar-item">
                <h2 class="logo is-size-3">VUELINES</h2>
              </a>
            </div>
          </div>
        </nav>
      </div>
      <div class="hero-body">
        <div :class="containerClasses">
          <h1 class="title is-1">{{ titleCapitalized }}</h1>
          <div class="fields-wrapper">
            <div>
              <div class="select" :class="themeClass">
                <select>
                  <option>Travel from</option>
                  <option>Copenhagen</option>
                  <option>Amsterdam</option>
                  <option>New York</option>
                  <option>Bangalore</option>
                </select>
              </div>
            </div>
            <div>
              <div class="select" :class="themeClass">
                <select>
                  <option>Travel to</option>
                  <option>Copenhagen</option>
                  <option>Amsterdam</option>
                  <option>New York</option>
                  <option>Bangalore</option>
                </select>
              </div>
            </div>
            <div>
              <input class="input" :class="themeClass" type="date" placeholder="Enter date" />
            </div>
            <div>
              <input class="input" :class="themeClass" type="number" placeholder="1 Adult" />
            </div>
            <div>
              <input class="input" :class="themeClass" type="number" placeholder="1 Child" />
            </div>
          </div>
          <button class="button is-warning is-medium" :disabled="bookingDisabled">
            {{ bookBtnContent }}
          </button>
        </div>
      </div>
    </section>
    <section :[dynamicAttr]="'image'" class="section image-section" :style="{ backgroundColor: 'yellow', backgroundImage: bgImage }"></section>
  </main>
</template>
<style scoped>
.fields-wrapper {
  margin: 0 auto;
  display: grid;
  grid-auto-flow: column;
  gap: 16px;
  width: fit-content;
  margin-bottom: 16px;
}
.image-section {
  height: 70vh;
background-image: linear-gradient(to bottom, rgba(255, 255, 0, 0.5), rgba(0, 0, 255, 0.5)),
    url(https://images.unsplash.com/photo-1682687982141-0143020ed57a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80);
  background-position: center;
  background-size: cover;
}
.logo {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
    Verdana, sans-serif;
}
</style>
