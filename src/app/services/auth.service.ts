import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  User,
  signOut,
} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  /* Log with Firebase */
  login(email: string, password: string): Promise<boolean> {
    return signInWithEmailAndPassword(this.auth, email, password).then(
      () => true,
      () => false
    );
  }

  /* Log out current user */
  logOut() {
    signOut(this.auth);
  }

  /* Return current user */
  getCurrentUser(): User {
    return getAuth().currentUser;
  }

  registerUser(email: string, password: string): Promise<boolean> {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      () => true,
      () => false
    );
  }

  async recoveryPass(email: string): Promise<void> {
    return await sendPasswordResetEmail(this.auth, email);
  }

  
}
