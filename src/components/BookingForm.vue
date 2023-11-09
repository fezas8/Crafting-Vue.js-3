<script setup lang="ts">
import { ref, watch, type Ref, onMounted, inject } from 'vue';
import type { IFormData } from '@/types/common';
import BaseInputDate from './BaseInputDate.vue';

const submitBtnContent = 'Search flights';
const bookingDisabled = ref(false);
const themeClass = inject<string>('themeClass');
const textAlignment = ref('has-text-centered');
const submitMessage = ref('');
const isFormSubmitted = ref(false);
const fromRef = ref<HTMLSelectElement | null>(null);

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
  isFormSubmitted.value = true;
  submitMessage.value = 'Flight search form submitted';
  console.log('formData', formData.value);
  emit('submit', {
    notificationDetails: { type: 'success', show: true, message: submitMessage.value }
  });
};

const onBlurOut = () => {
  isFormSubmitted.value = false;
};

const formData: Ref<IFormData> = ref({
  from: '',
  to: '',
  date: '',
  persons: 1,
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
  fromRef.value?.focus();
});

watch(formData.value, (newValue) => {
  bookingDisabled.value = isBookingDisabled(newValue);
});
</script>
<template>
  <div :class="textAlignment" class="form-wrapper has-background-white has-text-dark">
    <form>
      <div class="field is-grouped field-group-wrapper">
        <div class="field">
          <div class="field-label">
            <label for="from">Travel from</label>
          </div>
          <div class="field-body">
            <div class="control">
              <div class="select" :class="themeClass">
                <select id="from" name="from" ref="fromRef" v-model="formData.from">
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
      </div>
      <div class="field is-grouped field-group-wrapper">
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
            <label for="persons">Persons</label>
          </div>
          <div class="field-body">
            <div class="control">
              <input
                id="persons"
                name="persons"
                class="input"
                :class="themeClass"
                type="number"
                placeholder="1 Person"
                v-model="formData.persons"
              />
            </div>
          </div>
        </div>
        <!-- <div class="field">
          <div class="field-label">
            <label for="children">Child</label>
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
        </div> -->
      </div>
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
    </form>
    <button
        class="button is-info is-large"
        :disabled="bookingDisabled"
        @click="onSubmit"
        @blur="onBlurOut"
      >
        {{ submitBtnContent }}
      </button>
  </div>
</template>
<style scoped>
.button {
  margin: 24px;
}
.form-wrapper {
  padding: 16px;
  border-radius: 10px;
  width: fit-content;
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
