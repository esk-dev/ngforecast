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
  isDay: number;
  pressure: number;
  windDir: number;
  windSpeed: number;
  uv: number;
  visibility: number;
}

export interface DailyWeather {
  date: number;
  icon: string;
  temperature: number;
}

export interface params {
  lat: number;
  lon: number;
}
