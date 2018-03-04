export interface IWeatherResponse {
  cod: number;
  calctime: number;
  cnt: number;
  list: IWeatherItem[];
}

export interface IWeatherItem {
  id: number;
  dt: number;
  name: string;
  main: IMetrics;
}

export interface IMetrics {
  temp: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}
