import { Component, OnInit } from '@angular/core';

import AOS from 'aos';

import { SwiperConfigInterface, SwiperPaginationInterface  } from "ngx-swiper-wrapper"; 
// core version + navigation, pagination modules

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
    //swiper
    this.config = {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      coverflowEffect: {
        rotate: 50,
        stretch: 10,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: this.pagination,
      breakpoints: {
        // when window width is > 767px
        768: {
            slidesPerView: 1.5
        }
    }
    };
    //aos
    AOS.init();
    //particles
    this.myStyle = {
      'position': 'relative',
      'width': '100%',
      'height': '100%',
      'z-index': 9,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
      
    };

    this.myParams = {
          particles: {
              number: {
                  value: 20,
                  density: {
                    enable: true,
                    value_area: 800
                  }
              },
              color: {
                  value: '#fff'
              },
              shape: {
                  type: 'circle',
                  polygon: {
                    nb_sides: 5
                  },
              },
              size: {
                value: 30,
                random: true,
                anim: {
                  enable: false,
                  speed: 40,
                  size_min: 0.1,
                  sync: false
                }
              },
              line_linked: {
                enable: false,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
              },
              move: {
                enable: true,
                speed: 6,
                direction: "bottom-right",
                random: false,
                straight: false,
                out_mode: "out",
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200
                }
              }, 
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "repulse"
              },
              onclick: {
                enable: true,
                mode: "push"
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1
                }
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
              },
              repulse: {
                distance: 150
              },
              push: {
                particles_nb: 4
              },
              remove: {
                particles_nb: 2
              }
            }
          },
    };
    
    //btn ripples
    const buttons = document.querySelectorAll(".btn-ripples");
    buttons.forEach( btn => {
      btn.addEventListener("click", function(e:MouseEvent){
        let e2 = e.target as HTMLInputElement;
        let rect = e2.getBoundingClientRect();
        let d = Math.max(e2.clientWidth, e2.clientHeight);
        let x = e.clientX - rect.left - d/2 + 90;
        let y = e.clientY - rect.top - d/2 + 90; 
        
        let rpples = document.createElement("span");
        rpples.style.left = x + "px";
        rpples.style.top = y + "px";
        e2.appendChild(rpples);
        setTimeout( ()=>{
          rpples.remove();
        }, 600)
      })
    })
  };


  public navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
  }
}

  
