const weatherService = require('../service/weather-service');
const ApiError = require('../exeptions/api-error');

class WeatherController {
  async weather(req, res, next) {
    try {
      const { city } = req.body;
      const weatherdata = await weatherService.weather(city);
      return res.json(weatherdata);
    } catch (e) {
      next(e)
    }
  }

  async forecast(req, res, next) {
    try {
      const { city } = req.body;
      const forecast = await weatherService.forecast(city);
      return res.json(forecast);
    } catch (e) {
      next(e)
    }
  }

  async search(req, res, next) {
    try {
      const { input } = req.body;
      const search = await weatherService.search(input);
      return res.json(search);
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new WeatherController();
