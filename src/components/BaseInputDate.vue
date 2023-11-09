<script setup lang="ts">
import { computed, inject } from 'vue';

const themeClass = inject<string>('themeClass');

const props = defineProps({
  classes: {
    type: Array,
    default: () => [ 'input' ]
  },
  placeholder: {
    type: String,
    default: 'Enter date'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: String,
    required: true
  }
});
const emit = defineEmits(['update:modelValue']);

const date = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit('update:modelValue', value);
  }
});
</script>
<template>
  <input
    :class="[...props.classes, themeClass]"
    type="date"
    :placeholder=props.placeholder
    :disabled="disabled"
    v-model="date"
  />
</template>
