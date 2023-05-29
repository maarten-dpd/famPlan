import {Injectable} from '@angular/core';
import {FirebaseAuthentication} from '@capacitor-firebase/authentication';
import {Router} from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithCredential, signInWithEmailAndPassword,
  signOut,
  Unsubscribe, updateProfile
} from '@angular/fire/auth';
import { GoogleAuthProvider,  User} from 'firebase/auth';
import {Capacitor} from '@capacitor/core';
import {BehaviorSubject} from 'rxjs';
import {FamilyService} from './family.service';
import {InformationModalPageComponent} from '../shared/information-modal-page/information-modal-page.component';
import {ModalController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public currentUser: BehaviorSubject<null | User> = new BehaviorSubject<null | User>(null);
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  #authUnsubscribe: Unsubscribe;

  constructor(private auth: Auth,
              private router: Router,
              private familyService:FamilyService,
              private modalController:ModalController
              ) {
    this.auth.onAuthStateChanged((user: User | null) => {
      if (user !== null) {
        this.setCurrentUser(user).then(()=>{
          console.log('current user set')
        });
        this.updateLoggedInState(true);
      }

    });

    this.#authUnsubscribe = this.auth.onAuthStateChanged(user => this.setCurrentUser(user));
  }

  updateLoggedInState(isLoggedIn: boolean): void {
    this.isLoggedInSubject.next(isLoggedIn);
  }

//methods to sign in and out
  signIn(email:string, password:string){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.presentLoginErrors(errorMessage,errorCode);
      });
  }
  async signInWithGoogle(): Promise<void> {
    const {credential} = await FirebaseAuthentication.signInWithGoogle();
    if (Capacitor.isNativePlatform() && credential?.idToken) {
      const newCredential = GoogleAuthProvider.credential(credential?.idToken);
      await signInWithCredential(this.auth, newCredential)
        .then(()=>this.router.navigate(['/home']));
    }
  }
  async signOut(): Promise<void> {
    await FirebaseAuthentication.signOut().then(()=>{
      console.log('user signed out')
      this.router.navigate(['/'])
    });

    if (Capacitor.isNativePlatform()) {
      await signOut(this.auth).then(()=>{
        console.log('user signed out')
      });
    }
  }
  signUp(email:string, password:string, firstName: string, lastName: string, familyId: string){
    const displayName = firstName + ' ' + lastName;
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        //Set Display Name
        updateProfile(user,{
          displayName:displayName
        }).then(()=>{
          console.log('display name set')
        }).then(()=>{
          this.familyService.createFamilyMember(firstName,lastName,email,user.uid,familyId);
        }).then(()=>{
          this.familyService.setCurrentAttributes(user.uid);
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.presentLoginErrors(errorMessage,errorCode);
      });
  }

//handle change of user login
  private async setCurrentUser(user: User | null): Promise<void> {
    this.currentUser.next(user);
    const isAuthenticated = user !== null;

    if (isAuthenticated) {
      this.familyService.setCurrentAttributes(this.currentUser.value?.uid)
      await this.router.navigate(['/home']);

    } else {
      this.familyService.resetFamilyService()
      await this.router.navigate(['/login']);
    }
  }

//show errors when login failed
  async presentLoginErrors(information:string[], infoType:string){
    const modal=await this.modalController.create({
      component: InformationModalPageComponent,
      componentProps:{
        information:information,
        infoType: infoType
      },
    });
    modal.onDidDismiss().then();
    return await modal.present();
  }
}
