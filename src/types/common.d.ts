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

export interface IHotel {
  name: string; 
  address: string;
  price: number;
  rating: number;
  stars: number;
}

export type TSubmitFormDetails = {
  formData: any;
  onwardFlightData?: {
    flights: IFlight[];
  };
  returnFlightData?: {
    flights: IFlight[];
  };
  hotelDetails?: {
    hotels: IHotel[];
  };
};

