import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private _http: HttpClient) { }

  public getLatestsTotals():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'X-RapidAPI-Host':  'covid-19-data.p.rapidapi.com', 
        'X-RapidAPI-Key': 'bf67f65719msh6affec69b7a1f00p13f481jsnd03b9f288ed8'
      })
    };
    return this._http.get("https://covid-19-data.p.rapidapi.com/totals", httpOptions);
  }

  public getDailyReportByCountryName(date: string,country: string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'X-RapidAPI-Host':  'covid-19-statistics.p.rapidapi.com', 
        'X-RapidAPI-Key': 'bf67f65719msh6affec69b7a1f00p13f481jsnd03b9f288ed8'
      })
    };
    return this._http.get("https://covid-19-statistics.p.rapidapi.com/reports?date=" + date + "&iso=" + country, httpOptions);
  }
}
