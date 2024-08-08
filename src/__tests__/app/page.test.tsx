import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "@/app/page";
import useFetchData from "@/hooks/useFetchData";
import useGetLocation from "@/hooks/useGetLocation";
import { LocationInput } from "@/types/locationInterfaces";

jest.mock("@/hooks/useFetchData");
jest.mock("@/hooks/useGetLocation");
jest.mock("@/utils/api");

const mockUseFetchData = useFetchData as jest.Mock;
const mockUseGetLocation = useGetLocation as jest.Mock;

describe("Home component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("displays loading icon when loading", () => {
    mockUseGetLocation.mockReturnValue({
      userLocation: null,
      error: null,
      loading: true,
    });
    mockUseFetchData.mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: jest.fn(),
    });

    render(<Home />);
    expect(screen.getByAltText("Loading...")).toBeInTheDocument();
  });

  test("displays error message when there is an error", () => {
    const errorMessage = "Failed to fetch location";
    mockUseGetLocation.mockReturnValue({
      userLocation: null,
      error: errorMessage,
      loading: false,
    });
    mockUseFetchData.mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<Home />);
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  test("displays weather data and map when data is fetched", async () => {
    const mockUserLocation: LocationInput = { lat: 41.3851, lon: 2.1734 };
    const mockData = {
      weather: {
        current: {
          temp: 20,
          feels_like: 20,
          humidity: 60,
          weather: [{ main: "Clear", icon: "01d" }],
        },
        daily: [
          {
            dt: 1620928800,
            temp: { min: 15, max: 25 },
            weather: [{ icon: "10d" }],
          },
        ],
      },
      locations: [
        {
          id: 1,
          city: "Barcelona",
          location: { type: "Point", coordinates: [2.1734, 41.3851] },
        },
      ],
    };

    mockUseGetLocation.mockReturnValue({
      userLocation: mockUserLocation,
      error: null,
      loading: false,
    });
    mockUseFetchData.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<Home />);

    await waitFor(() => {
      const cityElements = screen.getAllByText("Barcelona");
      expect(cityElements.length).toBeGreaterThan(0);
      cityElements.forEach((element) => expect(element).toBeInTheDocument());

      const tempElements = screen.getAllByText("20º");
      expect(tempElements.length).toBeGreaterThan(0);
      tempElements.forEach((element) => expect(element).toBeInTheDocument());

      const clearElements = screen.getAllByText("Clear");
      expect(clearElements.length).toBeGreaterThan(0);
      clearElements.forEach((element) => expect(element).toBeInTheDocument());

      const tempIconElements = screen.getAllByAltText("temperature icon");
      expect(tempIconElements.length).toBeGreaterThan(0);
      tempIconElements.forEach((element) =>
        expect(element).toBeInTheDocument()
      );
    });
  });

  test("calls refetch when refresh button is clicked", async () => {
    const mockRefetch = jest.fn();
    const mockUserLocation: LocationInput = { lat: 41.3851, lon: 2.1734 };
    const mockData = {
      weather: {
        current: {
          temp: 20,
          feels_like: 20,
          humidity: 60,
          weather: [{ main: "Clear", icon: "01d" }],
        },
        daily: [
          {
            dt: 1620928800,
            temp: { min: 15, max: 25 },
            weather: [{ icon: "10d" }],
          },
        ],
      },
      locations: [
        {
          id: 1,
          city: "Barcelona",
          location: { type: "Point", coordinates: [2.1734, 41.3851] },
        },
      ],
    };

    mockUseGetLocation.mockReturnValue({
      userLocation: mockUserLocation,
      error: null,
      loading: false,
    });
    mockUseFetchData.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<Home />);

    await waitFor(() => {
      const refreshButtons = screen.getAllByText("Refresh");
      expect(refreshButtons.length).toBeGreaterThan(0);
    });

    const refreshButtons = screen.getAllByText("Refresh");
    fireEvent.click(refreshButtons[0]);
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });
});
