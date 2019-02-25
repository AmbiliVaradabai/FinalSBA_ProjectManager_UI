//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule,ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

//routing
import { AppRoutingModule } from './app-routing.module';

//Components
import { AppComponent } from './app.component';
import { CreateuserComponent } from './User/Components/createuser.component';
import { CreateProjectComponent } from './Project/Component/create-project.component';
import { UserSearchComponent } from './User/Components/user-search.component'

//Services
import { UserServiceService } from './User/Service/user-service.service';
import { MessageService } from './Common/Service/message.service';
import { ProjectService } from './Project/Service/project.service';



@NgModule({
  declarations: [
    AppComponent,
    CreateuserComponent,
    CreateProjectComponent,
    UserSearchComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [UserServiceService, 
              MessageService,
              ToastrService,
              ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
