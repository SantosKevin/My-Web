import { Component, OnInit } from '@angular/core';

import { Testimony } from 'src/app/models/testimony'
import { TestimonyService } from 'src/app/services/testimony.service'
import { Country } from 'src/app/models/country'
import { CountryService } from 'src/app/services/country.service';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SwiperConfigInterface, SwiperPaginationInterface  } from "ngx-swiper-wrapper";

@Component({
  selector: 'app-testimony',
  templateUrl: './testimony.component.html',
  styleUrls: ['./testimony.component.css'],
})
export class TestimonyComponent implements OnInit {

  testimony: Testimony;
  testimonies: Array<Testimony>;
  country: Country;
  countries: Array<Country>;
  imageSelected: string;

  //swiper
  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;
  //swiper
  config: SwiperConfigInterface;
  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };

  constructor(private tesService: TestimonyService,config: NgbModalConfig,private modalService: NgbModal, private cntService: CountryService) {
    this.testimony = new Testimony();
    this.testimonies = new Array<Testimony>();

    this.country = new Country();
    this.countries = new Array<Country>();
    this.refreshCountries();
    this.refreshTestimonies();

    //modal static
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    //swiper
    this.config = {
      grabCursor: true,
      slidesPerView: 2,
      slidesPerColumn: 2,
      spaceBetween: 30,
      pagination: this.pagination,
      
    };
  }

 
  
  public refreshTestimonies(){
    this.testimonies = this.tesService.getTestimonies();
  }

  addTestimony(){
    this.testimony.profile = this.imageSelected;
    this.testimony.datePosted = new Date();
    this.tesService.addTestimony(this.testimony);
    this.refreshTestimonies();
    this.testimony = new Testimony();
  }

  //selecct to edit a testimony
  selectToEdit(t: Testimony){
    this.testimony = t;
  }

  editTestimony(){
    this.tesService.editTestimony(this.testimony);
    this.testimony = new Testimony();
    this.refreshTestimonies();
  }


  deleteTestimony(testimony: Testimony){
    this.tesService.deleteTestimony(testimony);
  }

  //modal
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  //get countries
  public refreshCountries(){
    this.cntService.getCountries().subscribe( 
      (result) => {
          this.countries = new Array<Country>(); 
          result.forEach(element => {
            this.country = new Country(); 
            Object.assign(this.country,element);
            this.countries.push(this.country);
          });
      }, 
      error => { alert("Please reload the page. The service doesnt work for now."); } )
  }


  //image base64
  onFileChanges(files){
    console.log("File has changed:", files);
    this.imageSelected = files[0].base64;
  }
}
