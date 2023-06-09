import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LabelsPageRoutingModule } from './labels-routing.module';

import { LabelsPage } from './labels.page';
import {NewLabelModalComponent} from './new-label-modal/new-label-modal.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LabelsPageRoutingModule,
        SharedModule
    ],
  declarations: [LabelsPage, NewLabelModalComponent]
})
export class LabelsPageModule {}
