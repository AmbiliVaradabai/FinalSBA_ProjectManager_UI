import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateuserComponent } from './User/Components/createuser.component'
import { CreateProjectComponent } from  './Project/Component/create-project.component'
import { CreateTaskComponent } from './Task/Component/create-task.component'
import { ViewTaskComponent } from './Task/Component/view-task.component'

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
    component:CreateProjectComponent
  },

  {
    path:'task/add',
    component:CreateTaskComponent
  },

  {
    path:'task/view',
    component:ViewTaskComponent
  }
];

  




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
