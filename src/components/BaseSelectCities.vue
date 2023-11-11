<script setup lang="ts">
import { inject, computed } from 'vue';
const themeClass = inject<string>('themeClass');
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
const props = defineProps({
  filterCity: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  idName: {
    type: String,
    required: true
  }
});
const emit = defineEmits(['update:modelValue']);

const toCity = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit('update:modelValue', value);
  }
});
</script>

<template>
  <div class="select" :class="themeClass">
    <select :id="idName" :name="idName" v-model="toCity">
      <option disabled value="">{{ props.label }}</option>
      <template v-for="(city, index) in cities" :key="index">
        <option v-if="city !== props.filterCity">{{ city }}</option>
      </template>
    </select>
  </div>
</template>
