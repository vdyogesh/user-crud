import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { Member } from '../shared/member';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})

export class MemberListComponent implements OnInit {
  p: number = 1;
  Member: Member[];
  hideWhenNoMember: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;


  constructor(
    public crudApi: CrudService,
    public toastr: ToastrService
    ){ }


  ngOnInit() {
    this.dataState();
    let s = this.crudApi.GetMembersList();
    s.snapshotChanges().subscribe(data => {
      this.Member = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Member.push(a as Member);
      })
    })
  }

  dataState() {
    this.crudApi.GetMembersList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoMember = false;
        this.noData = true;
      } else {
        this.hideWhenNoMember = true;
        this.noData = false;
      }
    })
  }

  DeleteMember(member) {
    if (window.confirm('Are sure you want to delete this member ?')) {
      this.crudApi.DeleteMember(member.$key)
      this.toastr.success(member.firstName + ' successfully deleted!');
    }
  }

}