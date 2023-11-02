<script lang="ts">
import { defineComponent } from 'vue';
import type { IFormData } from '@/types/common';
import BaseInputDate from './BaseInputDate.vue';
export default defineComponent({
  components: { BaseInputDate },
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
      this.$emit('submit', {
        notificationDetails: { type: 'success', show: true, message: this.submitMessage }
      });
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
    (this.$refs.fromRef as HTMLSelectElement)?.focus();
  }
});
</script>
<template>
  <div :class="['container', textAlignment]">
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
