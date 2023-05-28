import {Injectable} from '@angular/core';
import {Camera, CameraResultType, CameraSource, PermissionStatus, Photo} from '@capacitor/camera';
import {Filesystem} from '@capacitor/filesystem';
import {ActionSheetController} from '@ionic/angular';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  Firestore,
  query,
  setDoc,
  where
} from '@angular/fire/firestore';
import {Preferences} from '@capacitor/preferences';
import {Capacitor} from '@capacitor/core';
import {Foto} from '../../datatypes/foto';
import {decode} from 'base64-arraybuffer';
import {getDownloadURL, ref, Storage, uploadBytes} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  // photoObject: {dataUrl: string} = {dataUrl: ''};
  readonly #photos: Photo[]=[];
  readonly #key = 'photos';

  #photoURIs:string[] = [];
  #permissionGranted: PermissionStatus={camera:'prompt', photos:'prompt'};
  constructor(private actionSheetCtrl: ActionSheetController,
              private fireStore:Firestore,
              private storage:Storage) { }

  getPhotoById(photoId:string){
    return collectionData<Foto>(
      query<Foto>(
        this.#getCollectionRef('photos'),
        where('id','==',photoId)
      ),
      {idField: 'id'}
    )
  }

  async getPhotoSaveInStorageReturnUrl(): Promise<string | undefined> {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Base64
      });

      if (photo.base64String != null) {
        const blob = new Blob([new Uint8Array(decode(photo.base64String))], {
          type: `image/${photo.format}`
        });

        const fileName = `${new Date().getTime()}.${photo.format}`;
        const storageRef = ref(this.storage, `photos/${fileName}`);
        await uploadBytes(storageRef, blob);
        const photoUrl = await getDownloadURL(storageRef);

        return photoUrl;
      }

      return undefined;
    } catch (error) {
      console.error('Error getting and saving photo:', error);
      return undefined;
    }
  }

  async #retrievePhotoURIs(): Promise<void> {
    const uris = await Preferences.get({key: this.#key});
    if (typeof uris.value === 'string') {
      this.#photoURIs = uris ? JSON.parse(uris.value) : [];
    }
  }

  async #persistPhotoURIs(): Promise<void> {
    await Preferences.set({
      key: this.#key,
      value: JSON.stringify(this.#photoURIs)
    });
    console.log(Preferences)
  }
  async #requestPermissions(): Promise<void> {
    try {
      this.#permissionGranted = await Camera.requestPermissions({permissions: ['photos', 'camera']});
    } catch (error) {
      console.error(`Permissions aren't available on this device: ${Capacitor.getPlatform()} platform.`);
    }
  }

  async #retrievePermissions(): Promise<void> {
    try {
      this.#permissionGranted = await Camera.checkPermissions();
    } catch (error) {
      console.error(`Permissions aren't available on this device: ${Capacitor.getPlatform()} platform.`);
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
  async #takePhotoNative() {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Base64,
      saveToGallery: this.#havePhotosPermission(),
      source: this.#determinePhotoSource()
    });
    return await this.#saveImageToFileSystem(image);
  }
  async #takePhotoPWA() {
    console.log('take photo pwa execute')
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });

    console.log (image)
    return await this.#saveImageToFileSystem(image);
  }
  async #saveImageToFileSystem(photo: Photo){
    console.log('saveImageToFileSystem entered')
    let newPhotoId = '';
    if (!photo.base64String) {
      throw new Error(`Can't write the photo to the filesystem because there is no base64 data.`)
    }
    await this.createPhotoAndReturnNewPhotoId(photo).then((res)=>{
      console.log(res);
      newPhotoId = res;
    })
    return newPhotoId;
    // const fileName = `${new Date().getTime()}.${photo.format}`;
    // const savedFile = await Filesystem.writeFile({
    //   path: fileName,
    //   data: photo.base64String,
    //   directory: Directory.Data
    // });
    // console.log(savedFile)
    // return savedFile.uri;
  }
  async createPhotoAndReturnNewPhotoId(photo: Photo){
    const newPhoto ={
      photo: photo.base64String,
      format: photo.format,
      id:''
    };
    const docRef = await addDoc(
      this.#getCollectionRef<Foto>('photos'),
      newPhoto
    );
    newPhoto.id=docRef.id;
    await setDoc(docRef, newPhoto);
    return newPhoto.id;
  }
  async takePhoto() {
    let newPhotoId = '';
    if (!this.#haveCameraPermission() || !this.#havePhotosPermission()) {
      await this.#requestPermissions();
    }

    if (Capacitor.isNativePlatform()) {
      console.log('takePhotoNative entered')
      await this.#takePhotoNative().then((res)=>{
        newPhotoId = res;
      });
    } else {
      console.log('takePhotoPWA entered')
      await this.#takePhotoPWA().then((res)=>{
        newPhotoId=res;
      });
    }
    await this.#persistPhotoURIs();
    console.log('photourispersisted')
    return newPhotoId;
  }
  async #loadPhotos(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      await this.#loadPhotosNative();
    } else {
      await this.#loadPhotosPWA();
    }
  }
  #getPhotoFormat(uri: string): string {
    const splitUri = uri.split('.');
    return splitUri[splitUri.length - 1];
  }
  async #loadPhotosNative(): Promise<void> {
    for (const uri of this.#photoURIs) {
      this.#photos.push({
        path: uri,
        format: this.#getPhotoFormat(uri),
        webPath: Capacitor.convertFileSrc(uri),
        saved: this.#havePhotosPermission()
      });
    }
  }
  async #loadPhotosPWA(): Promise<void> {
    for (const uri of this.#photoURIs) {

      const data = await Filesystem.readFile({
        path: uri
      });

      const format = this.#getPhotoFormat(uri);
      this.#photos.push({
        dataUrl: `data:image/${format};base64,${data.data}`,
        format,
        path: uri,
        saved: false
      });
    }
  }
  async #loadData(): Promise<void> {
    await this.#retrievePhotoURIs();
    await this.#retrievePermissions();
    await this.#loadPhotos();
  }
  #getCollectionRef<T>(collectionName: string): CollectionReference<T> {
    return collection(this.fireStore, collectionName) as CollectionReference<T>;
  }
  // #getDocumentRef<T>(collectionName: string, id: string): DocumentReference<T> {
  //   return doc(this.fireStore, `${collectionName}/${id}`) as DocumentReference<T>;
  // }
}
