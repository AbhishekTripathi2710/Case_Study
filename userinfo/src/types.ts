export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    latitude: number;
    longitude: number;
  }
  
  export interface Profile {
    id: number;
    name: string;
    photo: string;
    description: string;
    address: Address;
    email: string;
    phone: string;
    interests: string[];
  }
  
  