<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    classes: {
      type: Array,
      default: () => ['is-link', 'input']
    },
    placeholder: {
      type: String,
      default: 'Enter date'
    },
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  computed: {
    date: {
      get() {
        return this.modelValue;
      },
      set(value: string) {
        this.$emit('update:modelValue', value);
      }
    }
  }
});
</script>
<template>
  <input
    class="input"
    :class="classes"
    type="date"
    :placeholder="placeholder"
    v-model="date"
  />
</template>
