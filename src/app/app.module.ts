import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {provideFirebaseApp, initializeApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {enableMultiTabIndexedDbPersistence, getFirestore, provideFirestore} from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  provideFirebaseApp(()=>initializeApp(environment.firebaseConfig)),
  provideAuth(()=>getAuth()),
    provideFirestore(()=>{
      const firestore = getFirestore();
      enableMultiTabIndexedDbPersistence(firestore);
      return firestore;
    })
  ],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule {}
