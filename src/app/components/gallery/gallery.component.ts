import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let falls = document.querySelectorAll(".fall");
    falls.forEach( f =>{
      f.addEventListener("mouseover", ()=>{
        f.classList.toggle("flip");
      })
    })
    
		
  }

}
