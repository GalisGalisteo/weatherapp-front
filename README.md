# WeatherApp

![Logo](./public/logo.png)

## Description

This project serves as the frontend interface for the WeatherApp, enabling users to view detailed weather information for a specified location. Users can access current weather conditions, a 7-day forecast, and select from a map to view the weather for the 10 nearest locations. The frontend is developed using TypeScript with Next.js (a React framework) and styled with Tailwind CSS.

## Features

- Display current weather information.
- Show a 7-day weather forecast.
- Display and select nearby locations on a map.
- Refresh button to update the weather data.
- Responsive design using Tailwind CSS.
- The database records all weather search activities for tracking purposes.
  
## Core Features

**`Custom Hooks`**

**`Reusable and Customizable Components`**

**`Responsive Design`**

**`Error Handling`**

**`TypeScript`**

## Prerequisites

- Node.js (version 14.x or higher)
- npm (version 6.x or higher)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/galisgalisteo/weatherapp-front.git
   cd weatherapp-front
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```
4. Start the server and set up the database (follow instructions [here](https://github.com/galisgalisteo/weatherapp-back))

5. If you want to start the production build:
   ```sh
   npm run buld
   npm run start
   ```

6. Open your browser and navigate to \`http://localhost:3000\`.

## Project Structure

```
.
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── assets/
│   ├── loading.svg
│   └── logo.png
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── LoadingIcon.tsx
│   │   └── MainHeader.tsx
│   ├── ForecastWeather/
│   │   ├── ForecastItem.tsx
│   │   └── ForecastWeather.tsx
│   ├── CurrentWeather.tsx
│   └── Map.tsx
├── hooks/
│   ├── useFetchData.ts
│   └── useGetLocation.ts
├── types/
│   ├── locationInterfaces.ts
│   └── weatherInterfaces.ts
└── utils/
    ├── api.ts
    └── utils.ts
```

## Documentation

### Components

#### CurrentWeather.tsx

Displays the current weather information for a given location.

#### ForecastItem.tsx

Displays a single forecast item (day) in the weather forecast.

#### ForecastWeather.tsx

Displays a 7-day weather forecast.

#### MainHeader.tsx

Displays the main header whit the logo of the application.

#### MapNearbyLocations.tsx

Displays a map with markers for the 10 nearby locations.

### Hooks

#### useFetchData.ts

Custom hook to fetch data from an API.

#### useGetLocation.ts

Custom hook to get the user's current location using the Geolocation API.

### Pages

#### page.tsx

The main page of the application, displaying the current weather and forecast.

### Types

#### locations.ts

Defines TypeScript types for location-related data.

#### weatherInterfaces.ts

Defines TypeScript types for weather-related data.

### Utils

#### api.ts

Contains functions to make API calls to the backend.

#### utils.ts

Utility functions used throughout the application.

## Usage

### Fetching Weather Data

The application automatically fetches weather data based on the user's location. If the location is not available, it shows an error message.

### Refreshing Data

Users can refresh the weather data by clicking the "Refresh" button.

### Viewing Nearby Locations

The map displays nearby locations based on the user's current location. Clicking on a marker will show the city's name, and clicking into the name will set the location and update the weather data.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss changes.

## Contact

For questions or support, please open an issue on the repository.

## License

This project is licensed under the MIT License.
