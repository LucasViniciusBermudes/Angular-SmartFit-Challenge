import { Injectable } from '@angular/core';
import { appLocation } from '../types/location.interface';

const OPERNING_HOURS = {
  morning: {
    first: '06',
    last: '12'
  },
  afternoon: {
    first: '12',
    last: '18'
  },
  night: {
    first: '18',
    last: '23'
  }
}

type HOUR_INDEXES = 'morning' | 'afternoon' | 'night'

@Injectable({
  providedIn: 'root'
})
export class FilterUnitsService {

  constructor() { }

  transformWeekday(weekday: number) {
    switch (weekday) {
      case 0:
        return 'Dom.'
      case 6:
        return 'Sáb.'
      default:
        return 'Seg. à Sex.'
    }
  }

  filterUnits(unit: appLocation, open_hour: string, close_hour: string) {
    if (!unit.schedules) return true;
    let open_hour_filter = parseInt(open_hour, 10);//transforma open_hour em int
    let close_hour_filter = parseInt(close_hour, 10);
    let todays_weekday = this.transformWeekday(new Date().getDay());

    for (let i = 0; i < unit.schedules.length; i++) {
      let schedule_hour = unit.schedules[i].hour;
      let schedule_weekday = unit.schedules[i].weekdays;

      if (todays_weekday === schedule_weekday){
        if (schedule_hour !== 'Fechada') {
          let [unit_open_hour, unit_close_hour] = schedule_hour.split(' às ')
          let unit_open_hour_int = parseInt(unit_open_hour.replace('h', ''), 10);
          let unit_close_hour_int = parseInt(unit_close_hour.replace('h', ''), 10);
          //se a hora de abertura for maior que a hora de abertura do filtro e a hora de fechar for maior que a hora de fechar do filtro => true
          if (unit_open_hour_int <= open_hour_filter && unit_close_hour_int >= close_hour_filter) return true
          else return false
        }
      }
    }
    return false;
  }

  filter(results: appLocation[], showClosed: boolean, hour: string ) {
    let intermidiateResults = results;


    if (!showClosed) { //se eu não quiser mostrar os fechados, senão vai mostrar todos
      intermidiateResults = results.filter(location => location.opened === true);
    }
    if (hour) {
      //o valor do OPEN_HOUR vai ser de um dos valores OPERNING_HOURS do tipo HOUR_INDEXES
      const OPEN_HOUR = OPERNING_HOURS[hour as HOUR_INDEXES].first
      const CLOSE_HOUR = OPERNING_HOURS[hour as HOUR_INDEXES].last
      //filteredResults recebe o valor filtrado de results onde as localizações abertas são true
      return intermidiateResults.filter(location => this.filterUnits(location, OPEN_HOUR, CLOSE_HOUR));
    } else {
      return intermidiateResults;
    }
  }
}
