<script lang="ts">
import { defineComponent } from 'vue';
import type { IFormData } from '@/types/common';
export default defineComponent({
  data() {
    return {
      bookBtnContent: 'Book a flight',
      title: 'Let your dreams take flight...',
      bookingDisabled: false,
      themeClass: 'is-link',
      textAlignment: 'has-text-centered',
      submitMessage: '',
      isBookingSubmitted: false,
      cities: [
        'Dubai',
        'Amsterdam',
        'Paris',
        'Copenhagen',
        'New Delhi',
        'New York',
        'Los Angeles',
        'London',
        'Oslo'
      ],
      formData: {
        from: '',
        to: '',
        date: '',
        adults: 0,
        children: 0,
        type: 1,
        returnDate: ''
      }
    };
  },
  emits: ['submit'],
  watch: {
    formData: {
      handler(newValue) {
        this.bookingDisabled = this.isBookingDisabled(newValue);
      },
      deep: true
    }
  },
  methods: {
    onSubmit() {
      this.isBookingSubmitted = true;
      console.log('formData', this.formData);
      this.submitMessage = 'Booking successful!';
      this.$emit('submit', { notificationDetails: { type: 'success', show: true, message: this.submitMessage } });
    },
    onBlurOut() {
      this.isBookingSubmitted = false;
    },
    isBookingDisabled(data: IFormData): boolean {
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
    }
  },
  mounted() {
    this.bookingDisabled = this.isBookingDisabled(this.formData);
  }
});
</script>
<template>
  <div :class="['container', textAlignment]">
    <h1 class="title is-1">{{ title }}</h1>
    <form class="form-wrapper">
      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <label class="radio">
            <input type="radio" name="answer" v-model="formData.type" :value="1" />
            One-way
          </label>
          <label class="radio">
            <input type="radio" name="answer" v-model="formData.type" :value="2" />
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
