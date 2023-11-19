<script setup lang="ts">
import type { IFlight } from '@/types/common';
const props = defineProps({
  flightList: {
    type: Array as () => IFlight[],
    required: true
  }
});
const formatDateTime = (dateTime: string): string => {
    const d = new Date(dateTime);
    const options = { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    return d.toLocaleDateString(undefined, options);
};
</script>
<template>
  <div class="box">
    <table class="table is-hoverable is-full-width">
      <thead>
        <tr>
          <th>Flight Number</th>
          <th>Airport</th>
          <th>Airline</th>
          <th>Departure Date</th>
          <th>Arrival Date</th>
          <th>Transit time</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in props.flightList" :key="item.flightNumber">
          <td>{{ item.flightNumber }}</td>
          <td>{{ item.airport.name }}</td>
          <td>{{ item.airline.name }}</td>
          <td>{{ formatDateTime(item.departure) }}</td>
          <td>{{ formatDateTime(item.arrivalTime) }}</td>
          <td>{{ item.transitTime }} h</td>
          <td><strong>{{ item.price }}</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
.box {
  overflow: auto;
}
</style>
