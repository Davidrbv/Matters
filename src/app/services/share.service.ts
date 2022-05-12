import { Injectable } from "@angular/core";
import { SocialSharing } from "@awesome-cordova-plugins/social-sharing/ngx";

@Injectable({
  providedIn: "root"
})
export class ShareService {
  constructor(private socialSharing: SocialSharing) {}

  //TODO: Compartir fotos en redes
  sharePhoto(path: string) {
    const pathToFile = path;
    this.socialSharing.share("A ver que pasa..", null, pathToFile, null);
  }
}
