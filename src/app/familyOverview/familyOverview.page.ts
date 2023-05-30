import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FamilyService} from '../services/family.service';
import {FamilyMember} from '../../datatypes/familyMember';
import {firstValueFrom} from 'rxjs';


@Component({
  selector: 'app-familyOverview',
  templateUrl: './familyOverview.page.html',
  styleUrls: ['./familyOverview.page.scss'],
})

export class FamilyOverviewPage implements OnInit {
//attributes
  fabIsVisible = true;
  familyName = this.familyService.getFamilyName();
  familyMembers: FamilyMember[]=[];

//constructor
  constructor(public familyService: FamilyService,
              private cdr: ChangeDetectorRef) {  }

//On Init/destroy
  async ngOnInit() {
    this.familyMembers = await firstValueFrom(this.familyService.getFamilyMembersByFamilyId());
    this.familyMembers.sort((a,b) => a.firstName.localeCompare(b.firstName));
  }
  ngOnDestroy(){
  }
}
