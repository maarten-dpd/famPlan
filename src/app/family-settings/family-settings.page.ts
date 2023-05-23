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
  familyMembers:FamilyMember[]=[];
  #familymemberSub!:Subscription;

  constructor(public familySettingsService: FamilyService,
              private cdr: ChangeDetectorRef)
  {

  }

  ngOnInit() {

    this.#familymemberSub = this.familySettingsService.getFamilyMembers()
      .subscribe((res=>{
        this.familyMembers = res;
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
