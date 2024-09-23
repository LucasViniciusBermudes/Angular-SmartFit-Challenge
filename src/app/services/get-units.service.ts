import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnitResponse } from '../types/units-response.interface';
import { appLocation } from '../types/location.interface';

@Injectable({
  providedIn: 'root'
})
export class GetUnitsService {
  readonly apiurl = "https://test-frontend-developer.s3.amazonaws.com/data/locations.json";

  //propriedade que pode ser observada pelas mudanças... inicia como array vazio / muda de estado
  private allUnitsSubject: BehaviorSubject<appLocation[]> = new BehaviorSubject<appLocation[]>([]);
  private allUnits$: Observable<appLocation[]> = this.allUnitsSubject.asObservable(); //allunits se torna um observable, observables tem 0 $ para ser mais facil de visualizar8
  //allunits$ pode ser observado pelos outros, toda vez que o valor dele muda, as pessoas são avisadas
  private filteredUnits: appLocation[] = [];

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<UnitResponse>(this.apiurl).subscribe(data => {
      this.allUnitsSubject.next(data.locations);
      this.filteredUnits = data.locations;
    });
    //retorna o Observable
   }

  getAllUnits(): Observable<appLocation[]> {
    return this.allUnits$;
  }

  getFilteredUnits(){
    return this.filteredUnits;
  }

  setFilterUnits(value: appLocation[]) {
    this.filteredUnits = value;
  }
}
