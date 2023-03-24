import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamilyMemberPageRoutingModule } from './family-member-routing.module';

import { FamilyMemberPage } from './family-member.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamilyMemberPageRoutingModule
  ],
  declarations: [FamilyMemberPage]
})
export class FamilyMemberPageModule {}
