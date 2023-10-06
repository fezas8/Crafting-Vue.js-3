<script setup lang="ts">
import { ref, watch, type Ref, onMounted } from 'vue';
import type { IFormData } from '@/types/common'

const bookBtnContent = 'Book a flight';
const title = ref<string>('Let your dreams take flight...');
const bookingDisabled = ref(false);
const themeClass = ref('is-link');
const textAlignment = ref('has-text-centered');
const containerClasses = ['container', textAlignment.value];
const submitMessage = ref('');
const isBookingSubmitted = ref(false);

const cities = [
  'Dubai',
  'Amsterdam',
  'Paris',
  'Copenhagen',
  'New Delhi',
  'New York',
  'Los Angeles',
  'London',
  'Oslo'
];

const onSubmit = (): void => {
  isBookingSubmitted.value = true;
  console.log("formData", formData.value);
  submitMessage.value = "Booking successful!"
};

const onBlurOut = () => {
  isBookingSubmitted.value = false;
};

const formData: Ref<IFormData> = ref({
  from: '',
  to: '',
  date: '',
  adults: 0,
  children: 0,
  type: 1,
  returnDate: ''
});

const isBookingDisabled = (data: IFormData): boolean => {
  return Object.keys(data).some(key => {
    const val = data[key];
    if(key === 'children'){
      return false;
    }
    if(!val && key === 'returnDate') {
      return data.type === 2;
    }
    return !val;
  })
};

onMounted(() => {
  bookingDisabled.value = isBookingDisabled(formData.value);
})

watch(formData.value, (newValue) => {
  bookingDisabled.value = isBookingDisabled(newValue)
})
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
                <label class="radio">
                  <input type="radio" name="answer" v-model="formData.type" :value="1"/>
                  One-way
                </label>
                <label class="radio">
                  <input type="radio" name="answer" v-model="formData.type" :value="2"/>
                  Two-way
                </label>
              </div>
              <div class="control">
                <div class="select" :class="themeClass">
                  <select v-model="formData.from">
                    <option disabled value="">Travel from</option>
                    <template v-for="(city, index) in cities" :key="index">
                      <option v-if="city !== formData.to">{{ city }}</option>
                    </template>
                  </select>
                </div>
              </div>
              <div class="control">
                <div class="select" :class="themeClass">
                  <select v-model="formData.to">
                    <option disabled value="">Travel to</option>
                    <template v-for="(city, index) in cities" :key="index">
                      <option v-if="city !== formData.from">{{ city }}</option>
                    </template>
                  </select>
                </div>
              </div>
              <div class="control">
                <input
                  class="input"
                  :class="themeClass"
                  type="date"
                  placeholder="Enter date"
                  v-model="formData.date"
                />
              </div>
              <div class="control">
                <input
                  class="input"
                  :class="themeClass"
                  type="date"
                  placeholder="Enter return date"
                  v-model="formData.returnDate"
                  :disabled="formData.type === 1"
                />
              </div>
              <div class="control">
                <input
                  class="input"
                  :class="themeClass"
                  type="number"
                  placeholder="1 Adult"
                  v-model="formData.adults"
                />
              </div>
              <div class="control">
                <input
                  class="input"
                  :class="themeClass"
                  type="number"
                  placeholder="1 Child"
                  v-model="formData.children"
                />
              </div>
            </div>
          </form>
          <button
            class="button is-warning is-medium"
            :disabled="bookingDisabled"
            @click="onSubmit"
            @blur="onBlurOut"
          >
            {{ bookBtnContent }}
          </button>
          <div v-if="isBookingSubmitted" class="notification is-success">{{ submitMessage }}</div>
          <p v-else>To book a flight please fill in the above fields and click 'submit'</p>
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
.field {
  flex-wrap: wrap;
}
.control {
  margin-top: 10px;
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
