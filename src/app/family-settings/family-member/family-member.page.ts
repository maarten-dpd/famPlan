import { Component, OnInit } from '@angular/core';
import {FamilyService} from '../../services/family.service';

@Component({
  selector: 'app-family-member',
  templateUrl: './family-member.page.html',
  styleUrls: ['./family-member.page.scss'],
})
export class FamilyMemberPage implements OnInit {
  firstName: string = '';
  lastName: string = this.familySettingsService.getFamilyName();

  constructor(public familySettingsService: FamilyService) { }

  ngOnInit() {
  }

  handleCreate() {
    this.familySettingsService.addFamilyMember(this.firstName, this.lastName);
  }
}
