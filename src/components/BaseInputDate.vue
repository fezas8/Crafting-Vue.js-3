<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  classes: {
    type: Array,
    default: () => ['is-link', 'input']
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
    class="input"
    :class="props.classes"
    type="date"
    :placeholder=props.placeholder
    :disabled="disabled"
    v-model="date"
  />
</template>
