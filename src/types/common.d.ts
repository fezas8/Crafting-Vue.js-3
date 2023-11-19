export interface IFormData {
  [key: string]: any;
}
export interface IFlight {
  airline: {
    name: string;
    iataTypeCode: string;
  };
  flightNumber: string;
  airport: {
    name: string;
    iataCode: string;
  };
  price: number;
  departure: string;
  transitTime: number;
  arrivalTime: string;
}
