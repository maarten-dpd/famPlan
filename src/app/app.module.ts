import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {provideFirebaseApp, initializeApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {enableMultiTabIndexedDbPersistence, getFirestore, provideFirestore} from '@angular/fire/firestore';
import {ActivityService} from './services/activity.service';
import {FamilyService} from './services/family.service';
import {AuthService} from './services/auth.service';
import {LabelService} from './services/label.service';
import {PhotoService} from './services/photo.service';
import {PlanningService} from './services/planning.service';
import {RecipeService} from './services/recipe.service';
import {getStorage, provideStorage} from '@angular/fire/storage';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent],
  entryComponents:[],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    provideFirebaseApp(()=>initializeApp(environment.firebaseConfig)),
    provideAuth(()=>getAuth()),
    provideStorage(()=>getStorage()),
    provideFirestore(()=>{
      const firestore = getFirestore();
      enableMultiTabIndexedDbPersistence(firestore);
      return firestore;
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })

  ],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    ActivityService,
    FamilyService,
    AuthService,
    LabelService,
    PhotoService,
    PlanningService,
    RecipeService],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule {}
