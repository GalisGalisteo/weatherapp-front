import { render, screen, fireEvent } from "@testing-library/react";
import Map from "@/components/Map";
import { Location } from "@/types/locationInterfaces";

const mockLocations: Location[] = [
  {
    id: 1,
    city: "Test City",
    country: "Test Country",
    iso2: "TC",
    iso3: "TST",
    location: {
      type: "Point",
      coordinates: [-7.3429, 37.3024],
    },
    cityAscii: "TestCity",
  },
];

const mockSetLocation = jest.fn();

describe("Map component", () => {
  beforeEach(() => {
    render(
      <Map
        locations={mockLocations}
        setLocation={mockSetLocation}
        userLocation={{ lat: 37.3024, lon: -7.3429 }}
      />
    );
  });

  test("renders the map container", () => {
    const mapContainer = screen.getByTestId("map-container");
    expect(mapContainer).toBeInTheDocument();
  });

  test("renders the tile layer", () => {
    const tileLayer = screen.getByTestId("tile-layer");
    expect(tileLayer).toBeInTheDocument();
  });

  test("renders markers for each location", () => {
    const markers = screen.getAllByTestId("marker");
    expect(markers).toHaveLength(mockLocations.length);
  });

  test("renders popups with city names", () => {
    const popup = screen.getByTestId("popup");
    expect(popup).toBeInTheDocument();
    expect(popup).toHaveTextContent("Test City");
  });

  test("calls setLocation with correct coordinates when popup is clicked", () => {
    const popup = screen.getByText("Test City");
    fireEvent.click(popup);
    expect(mockSetLocation).toHaveBeenCalledWith({
      lat: 37.3024,
      lon: -7.3429,
    });
  });
});
