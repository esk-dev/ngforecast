const ApiError = require("../exeptions/api-error");
const axios = require('axios');
class WeatherService {
  async weather(city) {
    const URL = `${process.env.WEATHER_API}${process.env.API_KEY}&q=${city}&aqi=yes`;
    const weatherData = axios.get(URL)
      .then(
        (response) => {
        return response.data;
        }
      )
      .catch((error) => {
        throw ApiError.BadRequest('Server broken', error);
      })
    return weatherData;
  }

  async forecast(city) {
    const URL = `${process.env.FORECAST_API}${process.env.API_KEY}&q=${city}&days=10&aqi=no&alerts=no`;
    const foreacstData = axios.get(URL)
      .then(
        (response) => {
        return response.data;
        }
      )
      .catch((error) => {
        throw ApiError.BadRequest('Server broken', error);
      })
    return foreacstData;
  }

   async search(value) {
    const URL = `${process.env.SEARCH_API}${process.env.API_KEY}&q=${value}`;
    const searchData = axios.get(URL)
      .then(
        (response) => {
        return response.data;
        }
      )
      .catch((error) => {
        throw ApiError.BadRequest('Server broken', error);
      })
    return searchData;
  }
}

module.exports = new WeatherService();
