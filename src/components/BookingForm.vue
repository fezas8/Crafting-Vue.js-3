<script setup lang="ts">
import { ref, watch, type Ref, onMounted } from 'vue';
import type { IFormData } from '@/types/common';
import BaseInputDate from './BaseInputDate.vue';

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

const emit = defineEmits(['submit']);

const onSubmit = (): void => {
  isBookingSubmitted.value = true;
  submitMessage.value = 'Booking successful!';
  console.log('formData', formData.value);
  emit('submit', {
    notificationDetails: { type: 'success', show: true, message: submitMessage.value }
  });
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
  return Object.keys(data).some((key) => {
    const val = data[key];
    if (key === 'children') {
      return false;
    }
    if (!val && key === 'returnDate') {
      return data.type === 2;
    }
    return !val;
  });
};

onMounted(() => {
  bookingDisabled.value = isBookingDisabled(formData.value);
});

watch(formData.value, (newValue) => {
  bookingDisabled.value = isBookingDisabled(newValue);
});
</script>
<template>
  <div :class="containerClasses">
    <h1 class="title is-1">{{ title }}</h1>
    <form class="form-wrapper has-background-white has-text-link-dark">
      <div class="field is-grouped is-grouped-centered">
        <div class="field">
          <div class="field-label">
            <label>Choose trip</label>
          </div>
          <div class="field-body">
            <div class="control">
              <label class="radio">
                <input
                  id="one-way"
                  name="one-way"
                  type="radio"
                  v-model="formData.type"
                  :value="1"
                />
                One-way
              </label>
              <label class="radio">
                <input
                  id="two-way"
                  name="two-way"
                  type="radio"
                  v-model="formData.type"
                  :value="2"
                />
                Two-way
              </label>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="field-label">
            <label for="from">Travel from</label>
          </div>
          <div class="field-body">
            <div class="control">
              <div class="select" :class="themeClass">
                <select id="from" name="from" v-model="formData.from">
                  <option disabled value="">Travel from</option>
                  <template v-for="(city, index) in cities" :key="index">
                    <option v-if="city !== formData.to">{{ city }}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="field-label">
            <label for="from">Travel to</label>
          </div>
          <div class="field-body">
            <div class="control">
              <div class="select" :class="themeClass">
                <select id="to" name="to" v-model="formData.to">
                  <option disabled value="">Travel to</option>
                  <template v-for="(city, index) in cities" :key="index">
                    <option v-if="city !== formData.from">{{ city }}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="field-label">
            <label for="start-date">Start date</label>
          </div>
          <div class="field-body">
            <div class="control">
              <BaseInputDate
                id="start-date"
                name="start-date"
                v-model="formData.date"
              ></BaseInputDate>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="field-label">
            <label for="return-date">Return date</label>
          </div>
          <div class="field-body">
            <div class="control">
              <BaseInputDate
                id="return-date"
                name="return-date"
                v-model="formData.returnDate"
                :disabled="formData.type === 1"
                placeholder="Enter return date"
              ></BaseInputDate>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="field-label">
            <label for="adults">Number of adults</label>
          </div>
          <div class="field-body">
            <div class="control">
              <input
                id="adults"
                name="adults"
                class="input"
                :class="themeClass"
                type="number"
                placeholder="1 Adult"
                v-model="formData.adults"
              />
            </div>
          </div>
        </div>
        <div class="field">
          <div class="field-label">
            <label for="children">Number of children</label>
          </div>
          <div class="field-body">
            <div class="control">
              <input
                id="children"
                name="children"
                class="input"
                :class="themeClass"
                type="number"
                placeholder="1 Child"
                v-model="formData.children"
              />
            </div>
          </div>
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
.form-wrapper {
  padding: 16px 0;
  border-radius: 10px;
}
.field {
  flex-wrap: wrap;
}
.field-label {
  text-align: start;
  margin-left: 10px;
}
.control {
  margin: 0 10px 10px 10px;
}
</style>
