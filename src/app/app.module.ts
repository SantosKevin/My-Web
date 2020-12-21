import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ParticlesModule } from 'angular-particle';
import { SwiperModule } from 'ngx-swiper-wrapper'

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { MyteamComponent } from './components/myteam/myteam.component';
import { TestimonyComponent } from './components/testimony/testimony.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';

import { HourComment } from './pipes/hour-comment';
import { CovidComponent } from './components/covid/covid.component';

import { LoginService } from './services/login.service';
import { RattingComponent } from './components/ratting/ratting.component';
import { GalleryComponent } from './components/gallery/gallery.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    MyteamComponent,
    TestimonyComponent,
    HourComment,
    CovidComponent,
    RattingComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ParticlesModule,
    SwiperModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    AlifeFileToBase64Module
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
