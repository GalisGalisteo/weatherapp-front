import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { LocationInput, Location } from "@/types/locationInterfaces";

interface MapNearbyLocationsProps {
  locations: Location[];
  setLocation: (location: LocationInput) => void;
}

export default function Map({
  locations,
  setLocation,
}: MapNearbyLocationsProps) {
  return (
    <MapContainer
      attributionControl={false}
      center={[37.3024, -7.3429]}
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
