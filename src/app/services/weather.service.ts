import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, filter } from 'rxjs/operators';
import { IWeatherItem, IWeatherResponse, IMetrics } from '../models/weather';

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/box/city';
const BBOX_EARTH_COORDINATES = '-171.210938,-61.773123,191.953125,84.231947';
const API_KEY = '04238f523084b68074a9d74a876094c3';

@Injectable()
export class WeatherService {

  constructor(private _http: HttpClient) { }

  static isIdealConditions(item: IMetrics, iTemp: number, iHumidity: number): boolean {
    return item.temp === iTemp && item.humidity === iHumidity;
  }

  getWeather(temp: number, humidity: number): Observable<IWeatherItem[]> {
    let params = new HttpParams();
    params = params.append('APPID', API_KEY);
    params = params.append('units', 'metric');
    params = params.append('bbox', BBOX_EARTH_COORDINATES);
    return this._http.get<IWeatherResponse>(WEATHER_API_URL, { params })
      .pipe(
        map(res => res.list),
        map(list =>
          list.filter(item => WeatherService.isIdealConditions(item.main, temp, humidity)))
      );
  }

}
