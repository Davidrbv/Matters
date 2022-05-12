import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/model/user";
import { HttpClient } from "@angular/common/http";
import { Module } from "src/app/interfaces/module";
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
import { Storage } from "@capacitor/storage";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private fireStore: Firestore
  ) {}

  /* Modulos que ha adquirido el cliente/usuario */

  getModules(): Observable<Module[]> {
    return this.http.get<Module[]>("../assets/modules.json");
  }

  /* Get one User */
  getUser(id: string): Observable<User> {
    return docData(
      doc(
        this.fireStore,
        `users/${this.authService.getCurrentUser().uid}/user/${id}`
      ),
      {
        idField: "userId"
      }
    ) as Observable<User>;
  }

  /* Get the only user in getCurrent User's Firebase */
  getUsers(): Observable<User[]> {
    return collectionData(
      collection(
        this.fireStore,
        `users/${this.authService.getCurrentUser().uid}/user`
      ),
      {
        idField: "userId"
      }
    ) as Observable<User[]>;
  }

  /* Add User */
  async addUser(user: User) {
    await addDoc(
      collection(
        this.fireStore,
        `users/${this.authService.getCurrentUser().uid}/user`
      ),
      user
    );
  }

  /* Delete User */
  async deleteUser(id: string) {
    await deleteDoc(
      doc(
        this.fireStore,
        `users/${this.authService.getCurrentUser().uid}/user/${id}`
      )
    );
  }

  // TODO: Aliminación usuario
  // /* Full delte user */
  // async deleteUser(uid:string) {
  //   await deleteDoc(doc(this.fireStore, `users/${uid}`));
  // }

  /* Update User */
  async updateUser(user: User) {
    await setDoc(
      doc(
        this.fireStore,
        `users/${this.authService.getCurrentUser().uid}/user/${user.userId}`
      ),
      user
    );
  }

  async saveDateIntoStorage(): Promise<Boolean> {
    const date = new Date();
    await Storage.set({
      key: "date",
      value: date.toString()
    });
    return true;
  }

  async getDateFromStorage(): Promise<String> {
    const tc = await Storage.get({ key: "date" });
    return tc.value.toString() ? tc.value.toString() : "Welcome human!!";
  }
}
