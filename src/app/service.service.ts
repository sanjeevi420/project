import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url ='http://localhost:8080/';

  constructor( private httpClient: HttpClient ) { }
 /*getEmployeeList(): Observable<Object>{
    return this.httpClient.get(`${this.url}`);
  }*/

  getEmployeeList():Observable<any>{
    /*let emps= JSON.parse(localStorage.getItem('employee') || '[]' );
    return emps;*/
    return this.httpClient.get(`${this.url}`+'employee');
  }

  getEmployeeById(id:any):Observable<any>{
    /*let emps= JSON.parse(localStorage.getItem('employee') || '[]' );
    return emps;*/
    return this.httpClient.get(`${this.url}`+'employee',id);
  }

  sample(): Observable<any> {
    return this.httpClient.get(`${this.url}`+'employee/1267');
  }

  /*createEmployee(emp:any){
    return this.httpClient.get(`${this.url}`+'employees');
  }*/
  
  createEmployee(emp:any){
    let emps= JSON.parse(JSON.stringify(emp));
   /* //if(emp)
    emps.push(emp);
    localStorage.setItem('employee', JSON.stringify(emps))
    console.log(emp)*/
    return this.httpClient.post(`${this.url}`+'employees',emps);
  } 

  deleteEmployee(id:any){
    /*let emps= JSON.parse(localStorage.getItem('employee') || '[]');
    for(let i=0; i< emps.length;i++){
      if(emps[i].id==id){
      emps.splice(i,1)
      }
    }
    localStorage.setItem('employee', JSON.stringify(emps))*/
    return this.httpClient.delete(`${this.url}/employee/${1234}`);
   
  }
  
  updateEmployee(oldEmp:any, newEmp:any){
    let emps= JSON.parse(localStorage.getItem('employee') || '[]')
     for(let i=0; i <emps.length; i++ ){
        if(emps[i].id== oldEmp.id){
          emps[i]=newEmp;
        }
     }
     localStorage.setItem('employee', JSON.stringify(emps))
  }
}
