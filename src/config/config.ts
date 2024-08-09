import dotenv from "dotenv";

dotenv.config();

const nodeEnv = process.env.NODE_ENV;

export const getBackUrl = () => {
  if (nodeEnv === "development") {
    return "http://localhost:4000";
  } else {
    return "https://api-weatherapp-4e636462236d.herokuapp.com";
  }
};
