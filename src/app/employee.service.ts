import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable, BehaviorSubject } from 'rxjs';
import { Employee } from './employee';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _employees = new BehaviorSubject<Employee[]>([]);
  private dataStore: { employees: Employee[] } = { employees: [] };
  readonly employees = this._employees.asObservable();

  private _emp = new BehaviorSubject<Employee>(null);
  private empStore: { emp: Employee } = { emp: null };
  readonly emp = this._emp.asObservable();

  constructor(private http: HttpClient) { }

  getEmployee(id: any): Observable<any> {
    var result = this.dataStore.employees.filter(x=>x.id == id);
    this.empStore.emp = result[0];
    this._emp.next(Object.assign({}, this.empStore).emp);
    return this._emp.asObservable();
  }

  createEmployee(employee: Employee): Observable<Object> {
    employee.id = uuidv4();
    this.dataStore.employees.push(employee);
    this._employees.next(Object.assign({}, this.dataStore).employees);
    return this._employees.asObservable();
  }

  updateEmployee(id: any, value: any): Observable<Object> {
    let index = this.dataStore.employees.findIndex(x=>x.id == id);
    if(index!=-1)
      this.dataStore.employees[index] = value;
    
    this._employees.next(Object.assign({}, this.dataStore).employees);
    return this._employees.asObservable();
  }

  deleteEmployee(id: any): Observable<any> {
    let index = this.dataStore.employees.findIndex(x=>x.id == id);
    if(index!=-1)
      this.dataStore.employees.splice(index,1);
    
    this._employees.next(Object.assign({}, this.dataStore).employees);
    return this._employees.asObservable();
  }

  getEmployeesList(): Observable<any> {
    return this._employees.asObservable();
  }
}
