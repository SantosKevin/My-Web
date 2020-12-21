import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private _http: HttpClient) { }

  public getCountries():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'X-RapidAPI-Host':  'ajayakv-rest-countries-v1.p.rapidapi.com', 
        'X-RapidAPI-Key': 'bf67f65719msh6affec69b7a1f00p13f481jsnd03b9f288ed8'
      })
    };
    return this._http.get("https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all", httpOptions);
  }
}
