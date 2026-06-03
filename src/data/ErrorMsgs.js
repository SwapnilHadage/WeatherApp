export const ERROR_MESSAGES = {
  ERR_NETWORK: "No internet connection. Check your network and try again.",

  ECONNABORTED: "The request timed out. Please try again.",

  400: "The request could not be processed.",

  401: "Authentication failed. Please try again later.",

  403: "Access to weather data is currently unavailable.",

  404: "Weather data is not available for this location.",

  429: "Too many requests. Please wait a moment and try again.",

  500: "The weather service is temporarily unavailable.",

  502: "The weather service is temporarily unavailable.",

  503: "The weather service is temporarily unavailable.",

  504: "The weather service took too long to respond. Please try again.",

  DEFAULT: "Unable to load weather data. Please try again."
};

export const getErrorMessage = (error) => {
  if (error.code === "ERR_NETWORK") {
    return ERROR_MESSAGES.ERR_NETWORK;
  }

  if (error.code === "ECONNABORTED") {
    return ERROR_MESSAGES.ECONNABORTED;
  }

  return (
    ERROR_MESSAGES[error.response?.status] ||
    ERROR_MESSAGES.DEFAULT
  );
};