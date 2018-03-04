import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WeatherService } from '../services/weather.service';
import { Observable } from 'rxjs/Observable';
import { IWeatherItem } from '../models/weather';
import { tap } from 'rxjs/operators/tap';
import { Subscription } from 'rxjs/Subscription';

const IDEAL_MALE_TEMPERATURE = 21;
const IDEAL_FEMALE_TEMPERATURE = 22;
const IDEAL_HUMIDITY = 50;

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
  sexs: any[] = [
    {value: 'male', viewValue: 'Male'},
    {value: 'female', viewValue: 'Female'},
  ];
  form: FormGroup;
  subs: Subscription[] = [];

  inProgress = false;
  isEmpty = false;
  bestPlaces$: Observable<IWeatherItem[]>;

  constructor(
    private _weatherService: WeatherService,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this._fb.group({
      temp: [IDEAL_MALE_TEMPERATURE],
      humidity: [IDEAL_HUMIDITY],
      sex: ['male']
    });
    this.subs.push(this.form.get('sex').valueChanges.subscribe(val => {
      const temp = this.form.get('temp');
      if (val === 'male') {
        temp.setValue(IDEAL_MALE_TEMPERATURE);
      } else {
        temp.setValue(IDEAL_FEMALE_TEMPERATURE);
      }
    }));
  }

  getBestPlaces(value: any) {
    this.inProgress = true;
    this.isEmpty = false;
    this.bestPlaces$ = this._weatherService.getWeather(value.temp, value.humidity)
      .pipe(tap(list => {
        this.isEmpty = list.length === 0;
        this.inProgress = false;
      }));
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

}
