import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees: Array<Employee>;

  constructor() { 

    this.employees = [ 
      { name: 'Radamel' , lastName: 'Falcao', description: 'Im front-end developer and Im about 5 years ago on this enterprise, I love what I do.' ,image: '../../../assets/images/face1.svg', linkedin: 'https://ar.linkedin.com/'},
      { name: 'Manuel' , lastName: 'Neuer', description: 'Hey Im back end developer, im working for this enterprise 4 years ago, Im the Best!!' ,image: '../../../assets/images/face2.svg', linkedin: 'https://ar.linkedin.com/'},
      { name: 'Arjen' , lastName: 'Robben', description: 'Im full stack developer and Im about 2 years ago on this enterprise, Im currently new.' ,image: '../../../assets/images/face3.svg', linkedin: 'https://ar.linkedin.com/'}
    ];

   }

   public getEmployees(){
    return this.employees;
  }
}
