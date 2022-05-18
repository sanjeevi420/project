import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from "@angular/router"
 @Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees:any = {};
  deleteMessage=false;
  constructor( private employeeservice: ServiceService, private router:Router ) { }

  ngOnInit(): void {
    this.getEmployee();
  }
  
  getEmployee(){
    this.employeeservice.getEmployeeList().subscribe(
      (result) => {
        this.employees = result;
      }
    );
  
  }
  updateEmployee(id:any){
    this.router.navigate(['update-employee', id])
  }
  deleteEmployee(id:any){
    console.log(id);
    this.employeeservice.deleteEmployee(id).subscribe(
      data => {
        console.log(data);
        this.deleteMessage=true;
        this.employeeservice.getEmployeeList().subscribe(
          (result) => {
            this.employees = result;
          })
      });
  }
}
