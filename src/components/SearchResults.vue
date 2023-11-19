<script setup lang="ts">
import type { TSubmitFormDetails } from '@/types/common';
import FlightPriceCard from './FlightPriceCard.vue';
import HotelPriceCard from './HotelPriceCard.vue';
import { type PropType } from 'vue';
defineProps({
  submitDetails: {
    type: Object as PropType<TSubmitFormDetails>,
    required: true
  }
});
</script>
<template>
  <div>
    <div v-if="submitDetails?.onwardFlightData">
      <h2 class="is-size-3">Onward Journey</h2>
      <FlightPriceCard :flightList="submitDetails.onwardFlightData?.flights"></FlightPriceCard>
    </div>
    <div v-if="submitDetails?.returnFlightData">
      <h2 class="is-size-3">Return Journey</h2>
      <FlightPriceCard :flightList="submitDetails.returnFlightData?.flights"></FlightPriceCard>
    </div>
    <div v-if="submitDetails?.hotelDetails">
      <h2 class="is-size-3">Hotels</h2>
      <HotelPriceCard :hotelList="submitDetails.hotelDetails?.hotels"></HotelPriceCard>
    </div>
  </div>
</template>
