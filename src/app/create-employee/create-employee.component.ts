import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../employee';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee : Employee = new Employee();

  constructor(private empService: ServiceService, private router:Router ) { }
  dtTrigger: Subject<any>= new Subject();
  @ViewChild('f') form :any;

  ngOnInit(){
    this.onSubmit();
  }

  onSubmit(){
   this.empService.createEmployee(this.employee).subscribe(data=>{console.log(data)});
  }

}
