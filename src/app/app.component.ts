import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'practica2';

  constructor() { }

  ngOnInit() {
    //loader
    window.addEventListener('load', () => {
      document.getElementById('loading').classList.toggle('loader2');
    })

    let gotTop = document.querySelector('.go-top') as HTMLElement;

    window.addEventListener('scroll', () => {
      //show and hide scroll styles
      let up = window.pageYOffset;
      if (up <= 600) {
        gotTop.style.left = " 110%";
      }
      else {
        gotTop.style.left = "95%";
        gotTop.style.transition = "0.5s";
      }
    })
   //on click
    gotTop.addEventListener('click', ()=>{
      document.body.scrollTop = 0; //this is for safari
      document.documentElement.scrollTop = 0;
      
  })

  }


}
