<script setup lang="ts">
import { ref, watch, type Ref, onMounted, inject } from 'vue';
import type { IFormData } from '@/types/common';
import BaseInputDate from './BaseInputDate.vue';

const submitBtnContent = 'Search hotels';
const bookingDisabled = ref(false);
const themeClass = inject<string>('themeClass');
const textAlignment = ref('has-text-centered');
const submitMessage = ref('');
const isFormSubmitted = ref(false);
const destRef = ref<HTMLSelectElement | null>(null);

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
    destRef.value?.focus();
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
                        <label for="destination">Destination</label>
                    </div>
                    <div class="field-body">
                        <div class="control">
                            <div class="select" :class="themeClass">
                                <select id="destination" name="destination" ref="destRef" v-model="formData.destination">
                                    <option disabled value="">Select a destination</option>
                                    <template v-for="(city, index) in cities" :key="index">
                                        <option>{{ city }}</option>
                                    </template>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <div class="field-label">
                        <label for="check-in">Check-in date</label>
                    </div>
                    <div class="field-body">
                        <div class="control">
                            <BaseInputDate
                                id="check-in"
                                name="check-in"
                                v-model="formData.checkinDate"
                            ></BaseInputDate>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <div class="field-label">
                        <label for="check-out">Check-out date</label>
                    </div>
                    <div class="field-body">
                        <div class="control">
                            <BaseInputDate
                                id="check-out"
                                name="check-out"
                                v-model="formData.checkoutDate"
                                placeholder="Enter check-out date"
                            ></BaseInputDate>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-grouped field-group-wrapper">
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
                <div class="field">
                    <div class="field-label">
                        <label>Choose room type</label>
                    </div>
                    <div class="field-body">
                        <div class="control">
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
                        </div>
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
