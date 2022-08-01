export interface shortWeather {
    location: string;
    icon: string;
    condition: string;
    temperature: number;
    wind: number;
    humidity: number;
    feelslike: number;
}
export interface dailyWeather {}
export interface todayHighlights {
    devPoint: number;
    pressure: number;
    windDeg: number;
    windSpeed: number;
    sunrise: number;
    sunset: number;
    uvi: number;
    visibility: number;
}

export interface params {
    lat: number;
    lon: number;
}
