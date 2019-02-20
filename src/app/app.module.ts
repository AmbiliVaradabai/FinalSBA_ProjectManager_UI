//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule,ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//routing
import { AppRoutingModule } from './app-routing.module';

//Components
import { AppComponent } from './app.component';
import { CreateuserComponent } from './User/Components/createuser.component';

//Services
import { UserServiceService } from './User/Service/user-service.service';
import { MessageService } from './Common/Service/message.service';


@NgModule({
  declarations: [
    AppComponent,
    CreateuserComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()

  ],
  providers: [UserServiceService, 
              MessageService,
              ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
