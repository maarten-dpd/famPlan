import {Injectable} from '@angular/core';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {Directory, Filesystem} from '@capacitor/filesystem';
import {ActionSheetController} from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  photoObject: {dataUrl: string} = {dataUrl: ''};
  constructor(private actionSheetCtrl: ActionSheetController) { }

  async selectOrTakePhoto(): Promise<{dataUrl:string | undefined}>{
    let takePhotoSelected = false;
    const buttons = [
      {
        text: 'Take picture',
        icon: 'camera',
        handler: () => {
          takePhotoSelected = true;
          return true;
        }
      },
      {
        text:'choose picture',
        icon: 'image',
        handler: ()=>{
          takePhotoSelected=false;
          return true;
        }
      },
      {
        text:'cancel',
        role:'cancel'
      }
    ];
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select or take Photo',
      buttons: buttons
    })
    await actionSheet.present();
    if(takePhotoSelected){
      return this.takePhoto();
    }
    else{
      return this.choosePhoto();
    }
    return new Promise<{ dataUrl: string }>((resolve, reject) => {
      actionSheet.onDidDismiss().then(() => {
        resolve(this.photoObject);
      });
    });

  }
  async takePhoto(){
    const capturedPhoto = await Camera.getPhoto({resultType: CameraResultType.DataUrl,
    source:CameraSource.Camera});
    if (capturedPhoto.dataUrl != null) {
      this.photoObject.dataUrl = capturedPhoto.dataUrl;
    }
      return {dataUrl: capturedPhoto.dataUrl}
  }

  async choosePhoto(): Promise<{ dataUrl: string }> {
    const image = await Camera.getPhoto({
      source: CameraSource.Photos,
      resultType: CameraResultType.Uri,
    });

    if(!image.path){
      throw new Error('Unable to get file path');
    }
    const file = await Filesystem.readFile({
      path: image.path,
      directory: Directory.Data,
    });

    return { dataUrl: `data:image/jpeg;base64,${file.data}` };
  }
}
