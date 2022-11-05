// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: 'http://localhost:7000/api',
  WEATHER_API: 'https://api.weatherapi.com/v1/current.json?key=',
  SEARCH_API: 'https://api.weatherapi.com/v1/search.json?key=',
  FORECAST_API: 'https://api.weatherapi.com/v1/forecast.json?key=',
  API_KEY: ' df9ea22d929543f6927163438222504',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
