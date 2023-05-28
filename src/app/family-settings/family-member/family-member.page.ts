import { Component, OnInit } from '@angular/core';
import {FamilyService} from '../../services/family.service';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {FamilyMember} from '../../../datatypes/familyMember';

@Component({
  selector: 'app-family-member',
  templateUrl: './family-member.page.html',
  styleUrls: ['./family-member.page.scss'],
})

export class FamilyMemberPage implements OnInit {
//attributes
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  userId: string ='';
  id:string | null='';

//constructor
  constructor(public familyService: FamilyService,
              public activatedRoute:ActivatedRoute,
              public navController: NavController) { }

//on init/destroy/setData
  ngOnInit() {
    this.setData();
  }
  private setData(){
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.id === null){
      return
    }
    else {
      this.familyService.getFamilymemberById(this.id).subscribe(familyMembers =>{
        if(familyMembers && familyMembers.length>0){
          const familyMember = familyMembers[0];
          this.firstName = familyMember.firstName;
          this.lastName = familyMember.lastName;
          this.email = familyMember.email;
          if(familyMember.userId){
            this.userId = familyMember.userId
          }
        }
      })
    }
  }

//create and update
  handleCreateAndUpdate() {
    if (this.id) {
      this.updateFamilyMember();
    } else {
      this.createFamilyMember();
    }
    this.navController.back();
  }
  private createFamilyMember() {
    this.familyService.createFamilyMember(this.firstName, this.lastName, this.email, this.userId).then(()=>{
      console.log('family member created')
    });
  }
  private updateFamilyMember() {
    if(this.id){
      const familyMemberToUpdate : FamilyMember={
        id:this.id,
        firstName:this.firstName,
        lastName:this.lastName,
        email:this.email,
        userId:this.userId,
        familyId:this.familyService.currentFamilyId
      }
      this.familyService.updateFamilyMember(this.id,familyMemberToUpdate).then(()=>{
        console.log('family member updated')
      })
    }
    else{
      console.log('FamilyMember has no id field and can not be updated')
      //replace by modal to give user warning
    }
  }
}
