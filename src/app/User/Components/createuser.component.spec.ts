import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateuserComponent } from './createuser.component';
import { UserServiceService } from '../Service/user-service.service'
import { Component, Directive } from '@angular/core';
import { MessageService  } from '../../Common/Service/message.service';
import { ServerResponse } from '../../Common/Model/commonresponse';
import { User } from '../Model/usermodel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormControl, Validators,} from '@angular/forms';
import { Observable, Subject, pipe, of } from 'rxjs';

class MockUserServiceService {
  UsersList: User[];
  constructor(){
   this.UsersList =<User[]>[{FirstName:"Ambili", LastName:"Varada",EmployeeID:173729}, 
                       {FirstName:"Hari", LastName:"Haran",EmployeeID:123456}
                      ];
  }
  retrieveUsers(searchKey:string, sortKey:string):Observable<ServerResponse<User[]>>{
    var response = <ServerResponse<User[]>>{Success:true, Data:this.UsersList};
    return of(response);
  }

  addUser(newUser: User): Observable<ServerResponse<User>> {
    var response = <ServerResponse<User>>{Success:true};
    return of(response);
  } 

  getUserByID(userId: number): Observable<ServerResponse<User>> {
    var response = <ServerResponse<User>>{Success:true}
    return of(response);
  }

  updateUser(UserData: User): Observable<ServerResponse<User>>{
    var response = <ServerResponse<User>>{Success:true}
    return of(response);
  }

  deleteUser(userId: number): Observable<ServerResponse<User>>{
    var response = <ServerResponse<User>>{Success:true}
    return of(response);
  }  

}

class MockMessageService {
  error(message: string, title:string,timeout:number, keepAfterRouteChange = false) {
    //console.log("Error")
  }

  success(message: string, title:string,timeout:number, keepAfterRouteChange = false) {
    //console.log(message)
  }
}

xdescribe('CreateuserComponent', () => {
  let fixture;
  let component:CreateuserComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateuserComponent
      ],
      imports:[FormsModule, ReactiveFormsModule],
      providers: [
        {provide: UserServiceService, useClass: MockUserServiceService},
        FormBuilder,
        {provide: MessageService, useClass: MockMessageService},
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(CreateuserComponent);
    component = fixture.debugElement.componentInstance;
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run #createForm()', async(() => {
    const result = component.createForm();
    expect(component.UserAddEditForm.controls["firstname"].value=="");
  }));

  it('should run #ngOnInit()', async(() => {
    const result = component.ngOnInit();
    expect(component.UsersList.length===2).toEqual(true);
  }));


  it('should run #retrieveUserList()', async(() => {
    const result = component.retrieveUserList();
    expect(component.UsersList.length===2).toEqual(true);
  }));

  it('should run #addUser()', async(() => {
    component.UserAddEditForm.controls['firstname'].setValue("Anjaly");
    component.UserAddEditForm.controls['lastname'].setValue("Varada");
    component.UserAddEditForm.controls['employeeId'].setValue("222333");
    component.UserAction="test"
    const result = component.addUser();
    expect(component.UserAction ==="Add").toEqual(true);   
  })); 

  it('should run #reset()', async(() => {
    component.UserAction="test"
    const result = component.reset();
    expect(component.UserAction ==="Add").toEqual(true);   
  })); 

  it('should run #addOrEditUser()', async(() => {
    component.UserAction="Add"
    const result = component.addOrEditUser();
    expect(component.UserAction ==="Add").toEqual(true);   
  })); 


  it('should run #editUser()', async(() => {
    component.UserAddEditForm.controls['firstname'].setValue("Anjaly");
    component.UserAddEditForm.controls['lastname'].setValue("Varada");
    component.UserAddEditForm.controls['employeeId'].setValue("222333");
    component.UserAddEditForm.controls['userid'].setValue("2")
    component.UserAction="Update"   
    //const result = component.editUser(2);
    expect(component.UserAction ==="Update").toEqual(true);      
  })); 

  it('should run #updateUser()', async(() => {
    component.UserAddEditForm.controls['firstname'].setValue("Anjaly");
    component.UserAddEditForm.controls['lastname'].setValue("Varada");
    component.UserAddEditForm.controls['employeeId'].setValue("222333");
    component.UserAddEditForm.controls['userid'].setValue("2");
    component.UserAction="Update"
    const result = component.updateUser();
    expect(component.UserAction ==="Add").toEqual(true);   
  })); 

  it('should run #deleteUser()', async(() => {
    const result = component.deleteUser(2); 
    expect(component.UsersList.length===2).toEqual(true);
  }));  

  it('should run #SearchUser()', async(() => {
    const result = component.SearchUser("Ambili"); 
    expect(component.UsersList.length===2).toEqual(true);
  }));  
  
  it('should run #sortUsers()', async(() => {
    const result = component.sortUsers("firstname"); 
    expect(component.UsersList.length===2).toEqual(true);
  }));  


});
