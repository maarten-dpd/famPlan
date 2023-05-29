import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FamilyService} from '../services/family.service';
import {FamilyMember} from '../../datatypes/familyMember';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-familyOverview',
  templateUrl: './familyOverview.page.html',
  styleUrls: ['./familyOverview.page.scss'],
})

export class FamilyOverviewPage implements OnInit {
//attributes
  fabIsVisible = true;
  familyName = this.familyService.getFamilyName();
  #familymemberSub!:Subscription;
  familyMembers: FamilyMember[]=[];

//constructor
  constructor(public familyService: FamilyService,
              private cdr: ChangeDetectorRef) {  }

//On Init/destroy
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
