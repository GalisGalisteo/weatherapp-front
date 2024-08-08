import { render, waitFor } from "@testing-library/react";
import useGetLocation from "@/hooks/useGetLocation";

const TestComponent = () => {
  const { userLocation, error, loading } = useGetLocation();
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <p>
          Location: {userLocation.lat}, {userLocation.lon}
        </p>
      )}
    </div>
  );
};

describe("useGetLocation", () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn(),
  };

  beforeAll(() => {
    Object.defineProperty(global.navigator, "geolocation", {
      value: mockGeolocation,
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get user location successfully", async () => {
    const mockPosition = {
      coords: {
        latitude: 2.1734,
        longitude: 41.3851,
      },
    };

    mockGeolocation.getCurrentPosition.mockImplementationOnce((success) =>
      success(mockPosition)
    );

    const { getByText } = render(<TestComponent />);

    await waitFor(() =>
      expect(getByText("Location: 2.1734, 41.3851")).toBeInTheDocument()
    );
  });

  it("should handle geolocation error", async () => {
    const mockError = {
      message: "User denied Geolocation",
    };

    mockGeolocation.getCurrentPosition.mockImplementationOnce(
      (success, error) => error(mockError)
    );

    const { getByText } = render(<TestComponent />);

    await waitFor(() =>
      expect(
        getByText(
          "An error occurred while getting your location. Please try again."
        )
      ).toBeInTheDocument()
    );
  });

  it("should handle geolocation not supported", async () => {
    Object.defineProperty(global.navigator, "geolocation", {
      value: undefined,
      writable: true,
    });

    const { getByText } = render(<TestComponent />);

    await waitFor(() =>
      expect(
        getByText("Geolocation is not supported by your browser")
      ).toBeInTheDocument()
    );
  });
});
