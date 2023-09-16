<script setup lang="ts">

const bookBtnContent = 'Book a flight'
const title = 'Let your dreams take flight...'
</script>

<template>
  <main>
    <section class="hero is-link">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <a class="navbar-item">
                <h2 class="logo is-size-3">
                  VUELINES
                </h2>
              </a>
            </div>
          </div>
        </nav>
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1">{{ title }}</h1>
          <div class="fields-wrapper">
            <div>
              <div class="select is-link">
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
              <div class="select is-link">
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
              <input class="input is-link" type="date" placeholder="Enter date" />
            </div>
            <div>
              <input class="input is-link" type="number" placeholder="1 Adult" />
            </div>
          </div>
          <button class="button is-warning is-medium">{{ bookBtnContent }}</button>
        </div>
      </div>
    </section>
    <section class="section image-section"></section>
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
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
}
</style>
