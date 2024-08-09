import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { LocationInput, Location } from "@/types/locationInterfaces";

interface MapNearbyLocationsProps {
  locations: Location[];
  setLocation: (location: LocationInput) => void;
  userLocation: LocationInput | null;
}

export default function Map({
  locations,
  setLocation,
  userLocation,
}: MapNearbyLocationsProps) {
  if (!userLocation?.lat || !userLocation?.lon) {
    return (
      <div className="m-5 text-red-500">
        Cannot show the map. User location not found
      </div>
    );
  }
  const { lon, lat } = userLocation;
  return (
    <MapContainer
      attributionControl={false}
      center={[lat, lon]}
      zoom={13}
      className="w-screen"
      style={{ height: "400px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((location) => {
        const [lon, lat] = location.location.coordinates;
        return (
          <Marker key={location.id} position={[lat, lon]}>
            <Popup>
              <div
                className="cursor-pointer"
                onClick={() => setLocation({ lat, lon })}
              >
                {location.city}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
