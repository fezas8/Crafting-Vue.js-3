export interface IFormData {
  [key: string]: any;
}
export interface IFlight {
  airline: string;
  flightNumber: string;
  airport: string;
  price: number;
  departure: Date;
  transitTime: number;
  arrivalTime: Date;
}
