import { Component, OnInit } from '@angular/core';

import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-myteam',
  templateUrl: './myteam.component.html',
  styleUrls: ['./myteam.component.css']
})
export class MyteamComponent implements OnInit {


  emp: Employee;
  employees: Array<Employee>;

  constructor(private empService: EmployeeService) {
    this.emp = new Employee();
    this.employees = new Array<Employee>();
    this.getEmployees();
  }

  ngOnInit(): void {
  }

  public getEmployees(){
    this.employees = this.empService.getEmployees();
  }

}
