import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin()}
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'cookbook',
    loadChildren: () => import('./cookbook/cookbook.module').then( m => m.CookbookPageModule),
    canActivate: [AuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin()}
  },
  {
    path: 'family-settings',
    loadChildren: () => import('./family-settings/family-settings.module').then( m => m.FamilySettingsPageModule),
    canActivate: [AuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin()}
  },
  {
    path: 'labels',
    loadChildren: () => import('./labels/labels.module').then( m => m.LabelsPageModule),
    canActivate: [AuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin()}
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [AuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin()}
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
