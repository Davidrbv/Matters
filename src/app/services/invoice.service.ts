import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../model/invoice';
import { AuthService } from './auth.service';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  pathToInvoices = `users/${this.authService.getCurrentUser().uid}/invoices`;

  constructor(private authService: AuthService, private fireStore: Firestore) {}

  /* Get one Invoice */
  getInvoice(id: string): Observable<Invoice> {
    return docData(doc(this.fireStore, `${this.pathToInvoices}/${id}`), {
      idField: 'invoiceId',
    }) as Observable<Invoice>;
  }

  /* Get All Invoices */
  getInvoices(): Observable<Invoice[]> {
    return collectionData(collection(this.fireStore, this.pathToInvoices), {
      idField: 'invoiceId',
    }) as Observable<Invoice[]>;
  }

  /* Add Invoice */
  async addInvoice(invoice: Invoice) {
    await addDoc(collection(this.fireStore, this.pathToInvoices), invoice);
  }

  /* Delete Invoice */
  async deleteInvoice(id: string) {
    await deleteDoc(doc(this.fireStore, `${this.pathToInvoices}/${id}`));
  }

  /* Update Invoice */
  async updateInvoice(invoice: Invoice) {
    await setDoc(doc(this.fireStore, `${this.pathToInvoices}/${invoice.invoiceId}`), invoice);
  }
}
