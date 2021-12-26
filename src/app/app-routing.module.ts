import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { AddMemberComponent } from './add-member/add-member.component';
import { MemberListComponent } from './member-list/member-list.component';
import { EditMemberComponent } from './edit-member/edit-member.component';

const routes: Routes = [
  { path: '', redirectTo: '/register-member', pathMatch: 'full' },
  { path: 'register-member', component: AddMemberComponent },
  { path: 'view-members', component: MemberListComponent },
  { path: 'edit-member/:id', component: EditMemberComponent }
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule { }
