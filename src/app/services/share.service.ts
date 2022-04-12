import { Injectable } from '@angular/core';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Injectable({
  providedIn: 'root',
})
export class ShareService {

  constructor(private socialSharing: SocialSharing) {}


  //TODO: Afinar esto. No funciona. Ver métodos en .share(ctrl+click)
  sharePhoto(path: string) {
    const pathToFile = path;
    this.socialSharing.share('A ver que pasa..', null, pathToFile, null);
  }
}
