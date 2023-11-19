import { createServer, Model, Factory } from 'miragejs';
import { faker } from '@faker-js/faker';

export function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    models: {
      flight: Model,
      hotel: Model
    },

    factories: {
      flight: Factory.extend({
        airline() {
          return faker.airline.airline();
        },

        flightNumber() {
          return faker.airline.flightNumber();
        },

        airport() {
          return faker.airline.airport();
        },

        price() {
          return "$ " + Math.floor(faker.commerce.price());
        },

        departure() {
          //date 3 months from now
          const date = new Date();
          date.setMonth(date.getMonth() + 3);
          return faker.date.between(new Date(), date);
        },

        transitTime() {
          return Math.floor(Math.random() * 2 + 1);
        },

        arrivalTime() {
          return new Date(
            new Date(this.departure).setHours(
              new Date(this.departure).getHours() +
                this.transitTime +
                Math.floor(Math.random() * 2 + 1)
            )
          );
        }
      }),
      hotel: Factory.extend({
        name() {
          return "Hotel " + faker.company.name();
        },

        address() {
          return faker.location.streetAddress();
        },

        price() {
          //price in dollars with no decimals
          return "$ " + Math.floor(faker.commerce.price());
        },

        rating() {
          return Math.floor(Math.random() * 100) / 10;
        },

        stars() {
          return Math.floor(Math.random() * 5 + 1);
        },

        rooms() {
          return Math.floor(Math.random() * 3 + 1);
        }
      })
    },
    seeds(server) {
      server.createList('flight', 5);
      server.createList('hotel', 8);
    },

    routes() {
      this.namespace = 'api';

      this.get('/flights', (schema, request) => {
        const queryParams = request.queryParams;
        if (!Object.keys(queryParams).length) return schema.flights.all();
        switch (true) {
          case queryParams.departure:
            return schema.flights.where(
              (flight) => new Date(flight.departure) >= new Date(queryParams.departure)
            );
          case queryParams.price:
            return schema.flights.where((flight) => flight.price <= queryParams.price);
          case queryParams.transitTime:
            return schema.flights.where((flight) => flight.transitTime <= queryParams.transitTime);
          default:
            return schema.flights.all();
        }
      });

      this.get('/hotels', (schema, request) => {
        const queryParams = request.queryParams;
        if (!Object.keys(queryParams).length) return schema.hotels.all();
        switch (true) {
          case queryParams.rating:
            return schema.hotels.where((hotel) => hotel.rating >= queryParams.rating);
          case queryParams.stars:
            return schema.hotels.where((hotel) => hotel.stars >= queryParams.stars);
          case queryParams.price:
            return schema.hotels.where((hotel) => hotel.price <= queryParams.price);
          default:
            return schema.hotels.all();
        }
      });
    }
  });

  return server;
}
