import { Injectable } from '@angular/core';
import { Member } from '../shared/member';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  membersRef: AngularFireList<any>;
  memberRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Create Member
  AddMember(member: Member) {
    this.membersRef.push({
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      mobileNumber: member.mobileNumber
    })
  }

  // Fetch Single Member Object
  GetMember(id: string) {
    this.memberRef = this.db.object('members-list/' + id);
    return this.memberRef;
  }

  // Fetch Members List
  GetMembersList() {
    this.membersRef = this.db.list('members-list');
    return this.membersRef;
  }

  // Update Member Object
  UpdateMember(member: Member) {
    this.memberRef.update({
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      mobileNumber: member.mobileNumber
    })
  }

  // Delete Member Object
  DeleteMember(id: string) {
    this.memberRef = this.db.object('members-list/'+id);
    this.memberRef.remove();
  }

}