import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { LoginService }  from '../../app/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: Array<User>;
  user: User;

  constructor(private lgnService: LoginService) { 
    this.users = this.lgnService.users;
    this.user = new User();
  }

  getIDavailable(){
    var maxid: number;
    maxid = 0;
    for ( var i = 0; i < this.users.length;i++){
      if(maxid < this.users[i].id){
      maxid = this.users[i].id;
      }
    }
    return (maxid + 1);
  }

  addUser(u: User){
    u.id = this.getIDavailable();
    this.users.push(u);
    this.lgnService.users = this.users; //update the login service array users
  }

}
