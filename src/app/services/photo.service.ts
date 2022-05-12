import { Injectable } from "@angular/core";
import { finalize } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  deleteDoc,
  setDoc,
  docData
} from "@angular/fire/firestore";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Observable } from "rxjs";
import { Photo } from "../model/photo";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class PhotoService {
  pathToPhotos = `users/${this.authService.getCurrentUser().uid}/photos`;

  constructor(
    private fireStore: Firestore,
    private authService: AuthService,
    private storage: AngularFireStorage
  ) {}

  /* Take Picture */
  async addPicture() {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt
    });
    const blob = await fetch(image.webPath).then(i => i.blob());
    return blob;
  }

  /* Save Photo in Storage */

  uploadFile(file: any, path: string): Promise<string> {
    const nameIdPhoto =
      this.authService.getCurrentUser().uid + "/" + Date.now().toString();
    return new Promise(resolve => {
      const filePath = `${path}/${nameIdPhoto}`;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            ref.getDownloadURL().subscribe(res => {
              const downloadURL = res;
              resolve(downloadURL);
              return;
            });
          })
        )
        .subscribe();
    });
  }

  /* Get one Photo of database */
  getPhoto(id: string): Observable<Photo> {
    return docData(doc(this.fireStore, `${this.pathToPhotos}/${id}`), {
      idField: "photoId"
    }) as Observable<Photo>;
  }

  /* Get All Photo of database */
  getPhotos(): Observable<Photo[]> {
    return collectionData(collection(this.fireStore, this.pathToPhotos), {
      idField: "photoId"
    }) as Observable<Photo[]>;
  }

  /* Add Photo in database */
  async addPhoto(photo: Photo) {
    await addDoc(collection(this.fireStore, this.pathToPhotos), photo);
  }

  /* Delete Photo in database */
  async deletePhoto(id: string) {
    await deleteDoc(doc(this.fireStore, `${this.pathToPhotos}/${id}`));
  }

  /* Update Photo in database */
  async updatePhoto(photo: Photo) {
    await setDoc(
      doc(this.fireStore, `${this.pathToPhotos}/${photo.photoId}`),
      photo
    );
  }
}
