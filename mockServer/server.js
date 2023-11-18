import { createServer, Model, Factory } from 'miragejs';
import { faker } from '@faker-js/faker';

export function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    models: {
      flight: Model
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
          return 'USD ' + faker.commerce.price();
        },

        departure() {
          return faker.date.future();
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
      })
    },
    seeds(server) {
      server.createList('flight', 3);
    },

    routes() {
      this.namespace = 'api';

      this.get('/flights', (schema) => {
        return schema.flights.all();
      });

      //get flights by departure date
      this.get('/flights', (schema, request) => {
        const queryParams = request.queryParams;
        return schema.flights.where((flight) => {
          return new Date(flight.departure) >= new Date(queryParams.departure);
        });
      });
    }
  });

  return server;
}
