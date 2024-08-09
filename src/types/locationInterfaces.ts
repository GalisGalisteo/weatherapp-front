export interface LocationInput {
  lon: number | null;
  lat: number | null;
}

export interface Location {
  id: number;
  city: string;
  country: string;
  iso2: string;
  iso3: string;
  location: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  cityAscii: string;
}
