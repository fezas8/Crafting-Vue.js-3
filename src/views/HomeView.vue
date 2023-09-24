<script setup lang="ts">
import { ref } from 'vue';

const bookBtnContent = 'Book a flight';
const title = ref<string>('Let your dreams take flight...');
const bookingDisabled = ref(false);
const themeClass = ref('is-link');
const textAlignment = ref('has-text-centered');
const containerClasses = ['container', textAlignment.value];
const submitMessage = ref('');
const notificationClass = ref('');

const onSubmit = (): void => {
  submitMessage.value = 'Booking successful!';
  notificationClass.value = 'notification is-success';
};

const onBlurOut = () => {
  submitMessage.value = "";
  notificationClass.value = "";
}
</script>

<template>
  <main>
    <section class="hero" :class="themeClass">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <a class="navbar-item">
                <h2 class="logo is-size-3">VUELINES</h2>
              </a>
            </div>
          </div>
        </nav>
      </div>
      <div class="hero-body">
        <div :class="containerClasses">
          <h1 class="title is-1">{{ title }}</h1>
          <form class="form-wrapper">
            <div class="field is-grouped is-grouped-centered">
              <div class="control">
                <div class="select" :class="themeClass">
                  <select value="Copenhagen">
                    <option>Travel from</option>
                    <option>Copenhagen</option>
                    <option>Amsterdam</option>
                    <option>New York</option>
                    <option>Bangalore</option>
                  </select>
                </div>
              </div>
              <div class="control">
                <div class="select" :class="themeClass">
                  <select value="New York">
                    <option>Travel to</option>
                    <option>Copenhagen</option>
                    <option>Amsterdam</option>
                    <option>New York</option>
                    <option>Bangalore</option>
                  </select>
                </div>
              </div>
              <div class="control">
                <input
                  class="input"
                  :class="themeClass"
                  type="date"
                  placeholder="Enter date"
                  value="2025-09-22"
                />
              </div>
              <div class="control">
                <input
                  class="input"
                  :class="themeClass"
                  type="number"
                  placeholder="1 Adult"
                  value="1"
                />
              </div>
              <div class="control">
                <input
                  class="input"
                  :class="themeClass"
                  type="number"
                  placeholder="1 Child"
                  value="0"
                />
              </div>
            </div>
          </form>
          <button class="button is-warning is-medium" :disabled="bookingDisabled" @click="onSubmit" @blur="onBlurOut">
            {{ bookBtnContent }}
          </button>
          <div :class="notificationClass">{{ submitMessage }}</div>
        </div>
      </div>
    </section>
    <section class="section image-section"></section>
  </main>
</template>
<style scoped>
.form-wrapper,
.button {
  margin-bottom: 24px;
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
.notification {
  width: fit-content;
  margin: 0 auto;
}
</style>
