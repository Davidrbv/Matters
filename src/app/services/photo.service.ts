import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, deleteDoc, setDoc, docData } from '@angular/fire/firestore';
import { Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import { Observable } from 'rxjs';
import { Photo } from '../model/photo';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {

  pathToPhotos = `users/${this.authService.getCurrentUser().uid}/photos`;

  constructor(private fireStore : Firestore,
              private authService : AuthService) {}

  async addPicture() {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos, //Para que pregunte que quieres hacer, usar camara o coger de galeria. PROMPT
    });

    return image;
  }

  /* Get one Photo */
  getPhoto(id : string): Observable<Photo>{
    return docData(doc(this.fireStore,`${this.pathToPhotos}/${id}`),{
      idField: 'photoId',
    }) as Observable<Photo>
  }

  /* Get All Photo */
  getPhotos(): Observable<Photo[]>{
    return collectionData(collection(this.fireStore, this.pathToPhotos), {
      idField: 'photoId',
    }) as Observable<Photo[]>;
  }

  /* Add Photo */
  async addPhoto(photo : Photo){
    await addDoc(collection(this.fireStore, this.pathToPhotos),photo);
  }

  /* Delete Photo */
  async deletePhoto(id: string){
    await deleteDoc(doc(this.fireStore,`${this.pathToPhotos}/${id}`));
  }

  /* Update Photo */
  async updatePhoto(photo : Photo){
    await setDoc(doc(this.fireStore,`${this.pathToPhotos}/${photo.photoId}`),photo)
  }
}
