import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users: Array<User>;
  userLoggedIn: boolean = false;
  userLogged: User;

  constructor(private _http: HttpClient) {
    this.users = new Array<User>();
    this.createUsers();
    this.getUserLoged();
  }

  //get user loged
  getUserLoged() {
    if (localStorage.getItem('user') !== null) {
      this.userLogged = JSON.parse(localStorage.getItem('user'));
      this.userLoggedIn = true;
    }
  }

  //create users by default
  public createUsers() {
    this.users = [
      { id: 1, username: "neuer", password: "user123", email: "neuer@gmail.com", name: "Neuer" },
      { id: 2, username: "falcao", password: "user123", email: "falcao@gmail.com", name: "Falcao" },
      { id: 3, username: "lewan", password: "user123", email: "lewan@gmail.com", name: "Lewan" }
    ];
  }

  public login(username: string, password: string): User {
    let existent: User;
    this.users.forEach(element => {
      if (element.username == username && element.password == password)
        return existent = element;
    });
    return existent;
  }

  public logout() {
    // reset properties
    this.userLogged = new User();
    this.userLoggedIn = false;
  }
}
