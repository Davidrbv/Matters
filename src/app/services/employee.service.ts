import { Injectable } from "@angular/core";
import { Employee } from "../model/employee";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  setDoc
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class DataService {
  pathToEmployees = `users/${this.authService.getCurrentUser().uid}/employees`;

  constructor(private authService: AuthService, private fireStore: Firestore) {}

  /* Get one Employee */
  getEmployee(id: string): Observable<Employee> {
    return docData(doc(this.fireStore, `${this.pathToEmployees}/${id}`), {
      idField: "employeeId"
    }) as Observable<Employee>;
  }

  /* Get All Employees */
  getEmployees(): Observable<Employee[]> {
    return collectionData(collection(this.fireStore, this.pathToEmployees), {
      idField: "employeeId"
    }) as Observable<Employee[]>;
  }

  /* Add Employee */
  async addEmployee(employee: Employee) {
    await addDoc(collection(this.fireStore, this.pathToEmployees), employee);
  }

  /* Delete Employee */
  async deleteEmployee(id: string) {
    await deleteDoc(doc(this.fireStore, `${this.pathToEmployees}/${id}`));
  }

  /* Update Employee */
  async updateEmployee(employee: Employee) {
    await setDoc(
      doc(this.fireStore, `${this.pathToEmployees}/${employee.employeeId}`),
      employee
    );
  }
}
