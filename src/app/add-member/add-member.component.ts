import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})

export class AddMemberComponent implements OnInit {
  public memberForm: FormGroup;

  constructor(
    public crudApi: CrudService,
    public fb: FormBuilder,
    public toastr: ToastrService
  ) { }


  ngOnInit() {
    this.crudApi.GetMembersList();
    this.studenForm();
  }

  studenForm() {
    this.memberForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  get firstName() {
    return this.memberForm.get('firstName');
  }

  get lastName() {
    return this.memberForm.get('lastName');
  }

  get email() {
    return this.memberForm.get('email');
  }

  get mobileNumber() {
    return this.memberForm.get('mobileNumber');
  }

  ResetForm() {
    this.memberForm.reset();
  }

  submitMemberData() {
    console.log(this.memberForm.value)
    this.crudApi.AddMember(this.memberForm.value);
    this.toastr.success(this.memberForm.controls['firstName'].value + ' successfully added!');
    this.ResetForm();
   };

}