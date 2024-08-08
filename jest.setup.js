/* eslint-disable @next/next/no-img-element */
import "@testing-library/jest-dom";

jest.mock("next/image", () => {
  return function Image({ src, alt, ...props }) {
    return <img src={src} alt={alt} {...props} />;
  };
});

jest.mock("react-leaflet", () => {
  return {
    MapContainer: ({ children, ...props }) => (
      <div data-testid="map-container" {...props}>
        {children}
      </div>
    ),
    TileLayer: () => <div data-testid="tile-layer" />,
    Marker: ({ children, ...props }) => (
      <div data-testid="marker" {...props}>
        {children}
      </div>
    ),
    Popup: ({ children, ...props }) => (
      <div data-testid="popup" {...props}>
        {children}
      </div>
    ),
  };
});

global.console = {
  ...console,
  error: jest.fn(),
  log: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};
