<script setup lang="ts">
import { ref, provide } from 'vue';
import NavBar from '@/components/NavBar.vue';
import BookingForm from '@/components/BookingForm.vue';
import BookingFormHotel from '@/components/BookingFormHotel.vue';
import BaseNotification from '@/components/BaseNotification.vue';
import BaseTabs from '@/components/BaseTabs.vue';

const themeClass = ref('is-dark');
provide('themeClass', themeClass);
const submitDetails = ref({
  formData: {},
  onwardFlightData: null,
  returnFlightData: null
});
const title = ref<string>('Where do you want to fly?');

const tabs = [
  { icon: 'fas fa-plane', label: 'Flight' },
  { icon: 'fas fa-hotel', label: 'Hotel' }
];

const activeTab = ref(tabs[0].label);

const OnTabClick = (label: string) => {
  activeTab.value = label;
  console.log('activeTab', activeTab.value);
};
const onFormSubmit = (event: any) => {
  submitDetails.value = event;
  console.log('submitDetails', submitDetails.value);
};
</script>

<template>
  <main>
    <section class="hero" :class="themeClass">
      <div class="hero-head">
        <NavBar active-page="Home"></NavBar>
      </div>
      <div class="hero-body">
        <div class="container">
          <div class="content-wrapper">
            <h1 class="title is-1">{{ title }}</h1>
            <p class="subtitle">Let your dreams take flight</p>

            <div class="forms">
              <BaseTabs :tabs="tabs" @on-click="OnTabClick"> </BaseTabs>
              <!-- <KeepAlive
                ><BookingForm v-if="activeTab.toLowerCase() === 'flight'" @submit="onFormSubmit"
              /></KeepAlive>
              <KeepAlive
                ><BookingFormHotel
                  v-if="activeTab.toLowerCase() === 'hotel'"
                  @submit="onFormSubmit"
                ></component>
              </KeepAlive> -->
              <KeepAlive>
                <component
                  :is="activeTab.toLowerCase() === 'flight' ? BookingForm : BookingFormHotel"
                  @submit="onFormSubmit"
                ></component>
              </KeepAlive>
            </div>
            <div class="has-background-white has-text-dark results">
              <div v-if="submitDetails.onwardFlightData">
                <ul v-for="item in submitDetails.onwardFlightData?.flights" :key="item.id">
                  <li>Flight Number: {{ item.flightNumber }}</li>
                  <li>Airport: {{ item.airport.name }}</li>
                  <li>Airline: {{ item.airline.name }}</li>
                  <li>Departure Date: {{ item.departure }}</li>
                  <li>Arrival Date: {{ item.arrivalTime }}</li>
                  <li>Transit time: {{ item.transitTime }}</li>
                  <li>Price: {{ item.price }}</li>
                  <li>-------------</li>
                </ul>
              </div>
              <div v-if="submitDetails.returnFlightData">
                <ul v-for="item in submitDetails.returnFlightData?.flights" :key="item.id">
                  <li>{{ item.flightNumber }}</li>
                  <li>{{ item.departureDate }}</li>
                  <li>{{ item.departureTime }}</li>
                  <li>{{ item.arrivalDate }}</li>
                  <li>{{ item.arrivalTime }}</li>
                  <li>{{ item.price }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<style scoped>
.hero {
  background-image: url('../assets/aircraft.jpg');
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100vh;
}
.forms {
  margin-bottom: 32px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.results {
  margin-top: 32px;
  padding: 16px;
}
</style>
