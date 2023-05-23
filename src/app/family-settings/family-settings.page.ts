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
  familyName = this.familySettingsService.getFamilyName();
  allfamilyMembers:FamilyMember[]=[];
  #familymemberSub!:Subscription;
  familyMembers: FamilyMember[]=[];

  constructor(public familySettingsService: FamilyService,
              private cdr: ChangeDetectorRef)
  {

  }

  ngOnInit() {

    // this.#familymemberSub = this.familySettingsService.getFamilyMembers()
    //   .subscribe((res=>{
    //     console.log(res);
    //     this.allfamilyMembers = res;
    //     this.familyMembers=this.allfamilyMembers.filter(x=>x.familyId === " fDtZDxeGMRSUm74z7r67");
    //     this.cdr.detectChanges();
    //   })
    //   )

    this.#familymemberSub = this.familySettingsService.getFamilyMembersByFamilyId(' fDtZDxeGMRSUm74z7r67')
      .subscribe((res=>{
        console.log(res);
          this.allfamilyMembers = res;
          this.cdr.detectChanges();
        })
      )
    // console.log(this.familyMembers);
    // this.familyMembers=this.allfamilyMembers.filter(x=>x.familyId === 'fDtZDxeGMRSUm74z7r67');
    // console.log(this.allfamilyMembers);

  }

  ngOnDestroy(){

    if(this.#familymemberSub){
      this.#familymemberSub.unsubscribe();
    }
  }

  logfamilymembers() {
    console.log(this.allfamilyMembers);
  }
  logFilterdmembers(){

    console.log(this.familyMembers);
  }
}
