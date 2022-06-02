import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from "@angular/router"
 @Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees:any = [];
  deleteMessage=false;
  file:any;
  employee_headers = [
    "EMP ID",
    "EMP NAME",
  "EMAIL ID",
  "BIRTHDAY",
  "PHONE NO",
  "GENDER",
  "SALARY",
  "LOCATION",
  "ASSET",
  "UNIT",
  "PROJECT CODE",
  "Action",
  ]

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

  generateExcel(){
    this.employeeservice.downloadExcel().subscribe(Data => {
      console.log(Data);
      this.downloadFile(Data);
      alert("Downloaded successfully"); 
    })
  }

  downloadFile(data:any){
    const blob: any = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });      
    let link = document.createElement("a");  
    if (link.download !==undefined) {          
      let url = URL.createObjectURL(blob);    
      link.setAttribute("href",url);         
      link.setAttribute("download",'employeeList');        
      document.body.appendChild( link) ;    
      link.click() ;                   
      document.body.removeChild(link);
     }
   }

  uploadExcel(file:any){
    this.file=file.target.files[0];
    console.log(this.file);
  }

  submitExcel(){
    this.employeeservice.uploadExcel(this.file).subscribe( data =>{
     alert("Uploaded successfully");
    })
  }
}
