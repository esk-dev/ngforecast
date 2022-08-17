export interface weather {
  shortWeather: {
    location: string;
    icon: string;
    condition: string;
    temperature: number;
    wind: number;
    humidity: number;
    feelslike: number;
  };
  todayHighlights: {
    isDay: number;
    pressure: number;
    windDir: number;
    windSpeed: number;
    uv: number;
    visibility: number;
    airQuality: {
      co: number;
      no: number;
      o: number;
      so: number;
      pm25: number;
      pm10: number;
    };
  };
}
export interface dailyWeather {}

export interface params {
  lat: number;
  lon: number;
}
