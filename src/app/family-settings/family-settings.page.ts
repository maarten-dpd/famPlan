import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FamilyService} from '../services/family.service';
import {FamilyMember} from '../../datatypes/familyMember';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-family-settings',
  templateUrl: './family-settings.page.html',
  styleUrls: ['./family-settings.page.scss'],
})
export class FamilySettingsPage implements OnInit {
  fabIsVisible = true;
  familyName = this.familyService.getFamilyName();
  #familymemberSub!:Subscription;
  familyMembers: FamilyMember[]=[];

  constructor(public familyService: FamilyService,
              private cdr: ChangeDetectorRef) {  }

  ngOnInit() {
    this.#familymemberSub = this.familyService.getFamilyMembersByFamilyId()
      .subscribe((res=>{
          this.familyMembers = res;
          this.familyMembers.sort();
          this.cdr.detectChanges();
        })
      )
  }
  ngOnDestroy(){
    if(this.#familymemberSub){
      this.#familymemberSub.unsubscribe();
    }
  }
}
