import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

import { UserService } from 'src/app/services/user.service';

import AOS from 'aos';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userform: User;
  returnUrl: string;
  msglogin: string;

  //singup
  userAdd: User;

  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService, private userService: UserService) {
    this.userform = new User();
    this.userAdd = new User();
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    const buttons = document.querySelectorAll(".btn-ripples");
    buttons.forEach(btn => {
      btn.addEventListener("click", function (e: MouseEvent) {
        let e2 = e.target as HTMLInputElement;
        let rect = e2.getBoundingClientRect();
        let d = Math.max(e2.clientWidth, e2.clientHeight);
        let x = e.clientX - rect.left - d / 2 + 170;
        let y = e.clientY - rect.top - d / 2 + 190;

        let rpples = document.createElement("span");
        rpples.style.left = x + "px";
        rpples.style.top = y + "px";
        e2.appendChild(rpples);
        setTimeout(() => {
          rpples.remove();
        }, 600)
      })
    })

    //aos
    AOS.init();
  }

  login() {
    let ok = this.loginService.login(this.userform.username, this.userform.password)
    console.log(ok)
    if (ok != undefined) {
      //vbles to show or hide on the header
      this.loginService.userLoggedIn = true;
      this.loginService.userLogged = ok;
      //redirect to the page
      this.router.navigateByUrl(this.returnUrl);

      localStorage.setItem("user", JSON.stringify(ok));
    } else {
      //user doesnt exists
      this.msglogin = "Wrongs Credentials...";
    }
  }

  //sing up

  addUser(){
    this.userService.addUser(this.userAdd);
    this.userAdd = new User();
  }
}
