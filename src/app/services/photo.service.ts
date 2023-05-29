import {Injectable} from '@angular/core';
import {Camera, CameraResultType, CameraSource, PermissionStatus} from '@capacitor/camera';
import {ActionSheetController} from '@ionic/angular';
import {Firestore} from '@angular/fire/firestore';
import {Capacitor} from '@capacitor/core';
import {decode} from 'base64-arraybuffer';
import {getDownloadURL, ref, Storage, uploadBytes} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})

export class PhotoService {

  #permissionGranted: PermissionStatus={camera:'prompt', photos:'prompt'};
  constructor(private actionSheetCtrl: ActionSheetController,
              private fireStore:Firestore,
              private storage:Storage) { }

  //method to take a photo (can be selected from existing) and save it in googleStorage as a blob
  //then create a url to retrieve the photo and return the url
  async getPhotoSaveInStorageReturnUrl(): Promise<string | undefined> {
    try {
      let photo;
      if (Capacitor.isNativePlatform()) {
        photo = await Camera.getPhoto({
          quality:90,
          resultType: CameraResultType.Base64,
          source: this.#determinePhotoSource()
        });
      }
      else {
        photo = await Camera.getPhoto({
          quality:90,
          resultType: CameraResultType.Base64,
          source: CameraSource.Camera
        });
      }
      if (photo.base64String != null) {
        const blob = new Blob([new Uint8Array(decode(photo.base64String))], {
          type: `image/${photo.format}`
        });

        const fileName = `${new Date().getTime()}.${photo.format}`;
        const storageRef = ref(this.storage, `photos/${fileName}`);
        await uploadBytes(storageRef, blob);
        return await getDownloadURL(storageRef);
      }
      return undefined;
    } catch (error) {
      console.error('Error getting and saving photo:', error);
      return undefined;
    }
  }

  #haveCameraPermission(): boolean {
    return this.#permissionGranted.camera === 'granted';
  }
  #havePhotosPermission(): boolean {
    return this.#permissionGranted.photos === 'granted';
  }
  #determinePhotoSource(): CameraSource {
    if (this.#havePhotosPermission() && this.#haveCameraPermission()) {
      return CameraSource.Prompt;
    } else {
      return this.#havePhotosPermission() ?
        CameraSource.Photos : CameraSource.Camera;
    }
  }
}
