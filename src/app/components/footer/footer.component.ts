import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
      //btn ripples
    const buttons = document.querySelectorAll(".btn-ripples");
    buttons.forEach( btn => {
      btn.addEventListener("click", function(e:MouseEvent){
        let e2 = e.target as HTMLInputElement;
        let rect = e2.getBoundingClientRect();
        let d = Math.max(e2.clientWidth, e2.clientHeight);
        let x = e.clientX - rect.left - d/2 + 30;
        let y = e.clientY - rect.top - d/2 + 30; 
        
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

}
