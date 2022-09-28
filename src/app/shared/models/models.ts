export interface ShortWeather {
  location: string;
  icon: string;
  condition: string;
  temperature: number;
  wind: number;
  humidity: number;
  feelslike: number;
}
export interface TodayHighlights {
  is_day: number;
  pressure: number;
  wind_dir: number;
  wind_speed: number;
  uv: number;
  visibility: number;
}

export interface Forecast {
  date: number;
  icon: string;
  temperature: number;
}

export interface params {
  lat: number;
  lon: number;
}
