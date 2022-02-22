import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Injectable({
  providedIn: 'root',
})
export class ShareService {

  constructor(private socialSharing: SocialSharing) {}

  sharePhoto(path: string) {
    const pathToFile = path;
    this.socialSharing.share('A ver que pasa..', null, pathToFile, null);
  }
}
