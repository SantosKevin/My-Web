import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';

import { Covid } from 'src/app/models/covid'
import { CovidService } from 'src/app/services/covid.service'

import { Country } from 'src/app/models/country'
import { CountryService } from 'src/app/services/country.service';

import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

import * as moment from 'moment';

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css']
})
export class CovidComponent implements OnInit {
  country: Country;
  countries: Array<Country>;

  covid: Covid;
  dataLatestsTotals: Array<Number>;
  labelLatestsTotals: Array<String>;

  covidByCountry: Covid;
  dataByCountry: Array<Number>;
  labelByCountry: Array<String>;
  arrayDates: Array<string>;

  //calendar
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  minDate: Object;
  maxDate: Object;

  //loading
  loading = true;

  constructor(private covidService: CovidService, private countryService: CountryService,private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    this.country = new Country();
    this.countries = new Array<Country>();
    this.refreshCountries();
    
    //calendar
    this.fromDate = calendar.getPrev(calendar.getToday(), 'd', 4);
    this.toDate = calendar.getToday();
    this.maxDate = this.toDate;
    this.minDate = {year: 2019, month: 9, day: 1};
    //finish calendar

    this.covid = new Covid();
    this.dataLatestsTotals = new Array<Number>();
    this.labelLatestsTotals = new Array<String>();
    this.refreshDataLastestTotals();

    this.covidByCountry = new Covid();
    this.dataByCountry = new Array<Number>();
    this.labelByCountry = new Array<String>();
    this.refreshDataByCountry("esp");

  }



  ngOnInit(): void {

  }

  //calendar
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  //get countries
  public refreshCountries(){
    this.countryService.getCountries().subscribe( 
      (result) => {
          this.countries = new Array<Country>(); 
          result.forEach(element => {
            this.country = new Country(); 
            Object.assign(this.country,element);
            this.countries.push(this.country);
          });
          this.country.name = "Russia"; //initialize a country by default
      }, 
      error => { alert("Please reload the page. The service doesnt work for now."); } )
  }

  //graphic data
  public refreshDataLastestTotals() {
    this.covidService.getLatestsTotals().subscribe(
      (result) => {
        result.forEach(e => {
          this.covid.confirmed = e["confirmed"];
          this.covid.critical = e["critical"];
          this.covid.deaths = e["deaths"];
          this.covid.recovered = e["recovered"];
        })
        this.prepareDataLatestTotals();
      },
      error => { alert("Please reload the page. The service doesnt work for now."); }
    )
  }

  public prepareDataLatestTotals() {
    this.dataLatestsTotals = Object.values(this.covid);
    for (var key in this.covid) {
      if (this.covid[key] != undefined) this.labelLatestsTotals.push(key);
    }
    this.graphicLatestTotals();
  }

  public graphicLatestTotals() {
    var myChart = new Chart("graphicCovid", {
      type: 'bar',
      data: {
        labels: this.labelLatestsTotals,
        datasets: [
          {
            label: 'Latests Totals',
            data: this.dataLatestsTotals,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }


  //data by coutry and dates
  public prepareDates(){
    this.arrayDates = new Array<string>();
    let dtFrom = moment(this.fromDate.year + "-" + this.fromDate.month + "-" + this.fromDate.day, "YYYY-MM-DD");
    let dtTo = moment(this.toDate.year + "-" + this.toDate.month + "-" + this.toDate.day, "YYYY-MM-DD");
    let diff = dtTo.diff(dtFrom,"days");
    this.arrayDates.push(dtFrom.format("YYYY-MM-DD")); //add the first date
    for(var i=0; i<diff; i++){
      dtFrom = dtFrom.add(1,"day");
      this.arrayDates.push(dtFrom.format("YYYY-MM-DD"));
    }
  }

  public refreshDataByCountry(country:string) {
    this.prepareDates();
    let datas = new Array<Covid>();
    this.loading = true;
    this.arrayDates.forEach(elementDate => {
      this.covidService.getDailyReportByCountryName(elementDate, country).subscribe(
        (result) => {
          this.covidByCountry = new Covid();
          result["data"].forEach(element => {
            this.covidByCountry.active = element["active"];
            this.covidByCountry.confirmed = element["confirmed"];
            this.covidByCountry.deaths = element["deaths"];
            this.covidByCountry.recovered = element["recovered"];
            datas.push(this.covidByCountry);
            if(datas.length == this.arrayDates.length){
              this.loading = false;
              this.prepareDataByCountry(datas);}
          });

        },
        error => { alert("Please reload the page. The service doesnt work for now."); }
      )
    });

  }

  public prepareDataByCountry(datas: Array<Covid>) {
    let arrayMajor = [];
    for (var i = 0; i < datas.length; i++) {
      arrayMajor[i] = Object.values(datas[i]);
    }

    this.graphicByCountry(arrayMajor);
  }

  //generate the array to Datasets of the graphic
  public generateDataSet(array: Array<any>){
    let dataset = [];
    for(var i=0; i< array.length; i++){
      let colorGenerated = this.colorRGB();
      let obj =  {
        label: this.arrayDates[i],
        data: array[i],
        backgroundColor: [
          colorGenerated + ", 0.3)"
        ],
        borderColor: [
          colorGenerated + ")"
        ],
        borderWidth: 1
      }
      dataset.push(obj);
    }
    return dataset;
  }

  public graphicByCountry(array: Array<any>) {
    let dataset = this.generateDataSet(array);
    var myChartByCountry = new Chart("graphicCovidByCountry", {
      type: 'line',
      data: {
        labels: ["confirmed", "recovered","deaths", "active"],
        datasets: dataset
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  //generate random color
  public generateNumber(numero: number){
    return (Math.random()*numero).toFixed(0);
  }
  
  public colorRGB(){
    var color = "("+ this.generateNumber(255)+"," + this.generateNumber(255) + "," + this.generateNumber(255);
    return "rgb" + color;
  }
}
