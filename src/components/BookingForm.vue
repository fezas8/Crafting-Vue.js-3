<script setup lang="ts">
import { ref, watch, type Ref, onMounted } from 'vue';
import type { IFormData } from '@/types/common';

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
        </div>
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
</style>