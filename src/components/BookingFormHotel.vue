<script setup lang="ts">
import { ref, watch, type Ref, onMounted, inject } from 'vue';
import type { IFormData } from '@/types/common';
import BaseInputDate from './BaseInputDate.vue';
import BaseFieldWrapper from './BaseFieldWrapper.vue';
import BaseSelectCities from './BaseSelectCities.vue';

const submitBtnContent = 'Search hotels';
const bookingDisabled = ref(false);
const themeClass = inject<string>('themeClass');
const textAlignment = ref('has-text-centered');
const submitMessage = ref('');
const isFormSubmitted = ref(false);

const emit = defineEmits(['submit']);

const onSubmit = (): void => {
  isFormSubmitted.value = true;
  submitMessage.value = 'Hotel Search Form submitted';
  console.log('formData', formData.value);
  emit('submit', {
    notificationDetails: { type: 'success', show: true, message: submitMessage.value }
  });
};

const onBlurOut = () => {
  isFormSubmitted.value = false;
};

const formData: Ref<IFormData> = ref({
  destination: '',
  checkinDate: '',
  persons: 1,
  type: 1,
  checkoutDate: ''
});

const isBookingDisabled = (data: IFormData): boolean => {
  return Object.keys(data).some((key) => {
    const val = data[key];
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
  <div :class="textAlignment" class="form-wrapper has-background-white has-text-dark">
    <form>
      <div class="field is-grouped field-group-wrapper">
        <BaseFieldWrapper label="Destination">
          <BaseSelectCities
            idName="destination"
            label="Select a destination"
            v-model="formData.destination"
          ></BaseSelectCities>
        </BaseFieldWrapper>
        <BaseFieldWrapper label="Check-in date">
          <BaseInputDate
            id="check-in"
            name="check-in"
            v-model="formData.checkinDate"
          ></BaseInputDate>
        </BaseFieldWrapper>
        <BaseFieldWrapper label="Check-out date">
          <BaseInputDate
            id="check-out"
            name="check-out"
            v-model="formData.checkoutDate"
          ></BaseInputDate>
        </BaseFieldWrapper>
      </div>
      <div class="field is-grouped field-group-wrapper">
        <BaseFieldWrapper label="Persons">
          <input
            id="persons"
            name="persons"
            class="input"
            :class="themeClass"
            type="number"
            placeholder="1 Person"
            v-model="formData.persons"
          />
        </BaseFieldWrapper>
        <BaseFieldWrapper label="Choose room type">
          <label class="radio">
            <input
              id="single-room"
              name="single-room"
              type="radio"
              v-model="formData.type"
              :value="1"
            />
            Single room
          </label>
          <label class="radio">
            <input
              id="double-room"
              name="double-room"
              type="radio"
              v-model="formData.type"
              :value="2"
            />
            Double room
          </label>
        </BaseFieldWrapper>
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
