import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  id:any;
  employee:any;
  employee1:any;
  constructor( private _Activatedroute:ActivatedRoute, private empservice: ServiceService, private router: Router) { 
    //const id=this._Activatedroute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.id=this._Activatedroute.snapshot.params['id'];
    let emps= this.empservice.getEmployeeById(this.id).subscribe(
      (result) =>{
        console.log(result);
        this.employee=result;
      }
    )
    console.log(emps);
    /*this.employee=emps.find( (p: { id: any; }) =>p.id == this.id);
    this.employee1=emps.find( (p: { id: any; }) =>p.id == this.id);
    console.log(this.employee);*/
  }
  onSubmit(){
    this.empservice.updateEmployee(this.employee).subscribe(                    
      (result) =>{console.log(result);
      this.router.navigate(['/employees']);
    })
  }

}
