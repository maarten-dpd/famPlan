import { Component, OnInit } from '@angular/core';
import {FamilyService} from '../services/family.service';

@Component({
  selector: 'app-family-settings',
  templateUrl: './family-settings.page.html',
  styleUrls: ['./family-settings.page.scss'],
})
export class FamilySettingsPage implements OnInit {
  fabIsVisible = true;
  familyName = this.familySettingsService.getFamilyName();
  familyMembers = this.familySettingsService.getFamilyMembers();

  constructor(public familySettingsService: FamilyService) { }

  ngOnInit() {

  }

}
