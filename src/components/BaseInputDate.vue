<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    classes: {
      type: Array,
      default: () => ['input']
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
  },
  inject: ['themeClass'],
  data(){
    return {
      themeClass: this.themeClass
    }
  }
});
</script>
<template>
  <input
    :class="[...classes, themeClass]"
    type="date"
    :placeholder="placeholder"
    v-model="date"
  />
</template>
