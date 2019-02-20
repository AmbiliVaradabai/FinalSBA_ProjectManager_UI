import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateuserComponent } from './User/Components/createuser.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/user/add',
    pathMatch: 'full'
  },
  {
    path: 'user/add',
    component:CreateuserComponent
  },
  {
    path:'project/add',
    component:CreateuserComponent
  },

  {
    path:'task/:add',
    component:CreateuserComponent
  },

  {
    path:'task/view',
    component:CreateuserComponent
  }
];

  




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
