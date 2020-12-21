import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //efects scroll
  prevScrollPos: number = window.pageYOffset; //the window return the value in pixels on the scroll in vertical
  
  constructor(private router: Router,public loginService: LoginService) { }

  ngOnInit(): void {
    window.onscroll = ()=>{
      let currentScrollPos = window.pageYOffset;
      let containerMenu = document.querySelector('.navbar') as HTMLElement;
      //show and hide menu
      if(this.prevScrollPos > currentScrollPos){
          containerMenu.style.top = "0";
          containerMenu.style.transition = "0.5s";
      }
      else{
          containerMenu.style.top = "-70px";
          containerMenu.style.transition = "0.5s";
      }

      this.prevScrollPos = currentScrollPos;
      //show and hide scroll styles
      let up = window.pageYOffset;

      if(up <= 600){
        containerMenu.style.borderBottom = "none";
          //gotTop.style.right = "-100%";
      }
      else{
          containerMenu.style.borderBottom = "4px solid #DF0000";
          //gotTop.style.right = "0";
          //gotTop.style.transition = "0.5s";
      }

    }
     //btn ripples
     const buttons = document.querySelectorAll(".btn-ripples-red");
     buttons.forEach( btn => {
       btn.addEventListener("click", function(e:MouseEvent){
         let e2 = e.target as HTMLInputElement;
         let rect = e2.getBoundingClientRect();
         let d = Math.max(e2.clientWidth, e2.clientHeight);
         let x = e.clientX - rect.left - d/2 + 50;
         let y = e.clientY - rect.top - d/2 + 50; 
         
         let rpples = document.createElement("span");
         rpples.style.left = x + "px";
         rpples.style.top = y + "px";
         e2.appendChild(rpples);
         setTimeout( ()=>{
           rpples.remove();
         }, 600)
       })
     })
  }


  public navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
  }
  
  logout(){
    this.loginService.logout();
    localStorage.removeItem("user");
  }
  

}
