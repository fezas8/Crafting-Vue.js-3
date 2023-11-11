<script setup lang="ts">
import { ref, watch, type Ref, onMounted, inject } from 'vue';
import type { IFormData } from '@/types/common';
import BaseInputDate from './BaseInputDate.vue';
import BaseFieldWrapper from './BaseFieldWrapper.vue';
import BaseSelectCities from './BaseSelectCities.vue';

const submitBtnContent = 'Search flights';
const bookingDisabled = ref(false);
const themeClass = inject<string>('themeClass');
const textAlignment = ref('has-text-centered');
const submitMessage = ref('');
const isFormSubmitted = ref(false);

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
});

watch(formData.value, (newValue) => {
  bookingDisabled.value = isBookingDisabled(newValue);
});
</script>
<template>
  <div :class="textAlignment" class="form-wrapper has-background-white has-text-dark">
    <form>
      <div class="field is-grouped field-group-wrapper">
        <BaseFieldWrapper label="Travel from">
          <BaseSelectCities
            idName="from"
            label="Travel from"
            v-model="formData.from"
          ></BaseSelectCities>
        </BaseFieldWrapper>
        <BaseFieldWrapper label="Travel to">
          <BaseSelectCities
            idName="to"
            label="Travel to"
            :filterCity="formData.from"
            v-model="formData.to"
          ></BaseSelectCities>
        </BaseFieldWrapper>
        <BaseFieldWrapper label="Travel date">
          <BaseInputDate
            id="travel-date"
            name="travel-date"
            v-model="formData.date"
          ></BaseInputDate>
        </BaseFieldWrapper>
      </div>
      <div class="field is-grouped field-group-wrapper">
        <BaseFieldWrapper label="Return date">
          <BaseInputDate
            id="return-date"
            name="return-date"
            v-model="formData.returnDate"
            :disabled="formData.type === 1"
          ></BaseInputDate>
        </BaseFieldWrapper>
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
      </div>
      <BaseFieldWrapper label="Choose trip">
        <label class="radio">
          <input id="one-way" name="one-way" type="radio" v-model="formData.type" :value="1" />
          One-way
        </label>
        <label class="radio">
          <input id="two-way" name="two-way" type="radio" v-model="formData.type" :value="2" />
          Two-way
        </label>
      </BaseFieldWrapper>
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
</style>
