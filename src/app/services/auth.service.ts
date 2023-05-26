import {Injectable} from '@angular/core';
import {FirebaseAuthentication} from '@capacitor-firebase/authentication';
import {Router} from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithCredential, signInWithEmailAndPassword,
  signOut,
  Unsubscribe
} from '@angular/fire/auth';
import { GoogleAuthProvider,  User} from 'firebase/auth';
import {Capacitor} from '@capacitor/core';
import {BehaviorSubject} from 'rxjs';
import {FamilyService} from './family.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: BehaviorSubject<null | User> = new BehaviorSubject<null | User>(null);
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  #authUnsubscribe: Unsubscribe;

  constructor(private auth: Auth,
              private router: Router,
              public familyService:FamilyService,
              ) {
    this.auth.onAuthStateChanged((user: User | null) => {

      if (user !== null) {

        this.setCurrentUser(user);

        this.updateLoggedInState(true);

      }

    });

    this.#authUnsubscribe = this.auth.onAuthStateChanged(user => this.setCurrentUser(user));
  }
  updateLoggedInState(isLoggedIn: boolean): void {
    this.isLoggedInSubject.next(isLoggedIn);
  }
  async signOut(): Promise<void> {
    await FirebaseAuthentication.signOut().then(()=>{
      this.router.navigate(['/'])
    });

    if (Capacitor.isNativePlatform()) {
      await signOut(this.auth).then(()=>{
        // this.router.navigate(['/'])
      });
    }
  }
  async signInWithGoogle(): Promise<void> {
    const {credential} = await FirebaseAuthentication.signInWithGoogle();
    if (Capacitor.isNativePlatform() && credential?.idToken) {
      // A credential can be generated for each supported provider,
      // however, the signature of these methods is varied.
      // Make sure to check the Firebase JavaScript SDK docs to find the required parameters.
      // https://firebase.google.com/docs/auth/web/google-signin
      const newCredential = GoogleAuthProvider.credential(credential?.idToken);
      await signInWithCredential(this.auth, newCredential)
        .then(()=>this.router.navigate(['/home']));
    }
  }
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
  signUp(email:string, password:string, displayName: string){
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

  }
  signIn(email:string, password:string){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  getCurrentUserId(){
    return this.currentUser.value?.uid;
  }
}
