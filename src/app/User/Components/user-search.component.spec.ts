import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSearchComponent } from './user-search.component';
import { UserServiceService } from '../Service/user-service.service'
import { Component, Directive } from '@angular/core';
import { MessageService  } from '../../Common/Service/message.service';
import { ServerResponse } from '../../Common/Model/commonresponse';
import { User } from '../Model/usermodel';
import { Observable, Subject, pipe, of } from 'rxjs';
declare var $ :any;

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

  getUserByID(userId: number): Observable<ServerResponse<User>> {
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

xdescribe('UserSearchComponent', () => {
    let fixture;
    let component:UserSearchComponent;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
            UserSearchComponent
        ],
        providers: [
          {provide: UserServiceService, useClass: MockUserServiceService},
          {provide: MessageService, useClass: MockMessageService},
        ]
      }).compileComponents();
      fixture = TestBed.createComponent(UserSearchComponent);
      component = fixture.debugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should run #ngOnInit()', async(() => {
    const result = component.ngOnInit();
    expect(component.UsersList.length===2).toEqual(true);
  }));


  it('should run #retrieveUsers()', async(() => {
    const result = component.retrieveUsers();
    expect(component.UsersList.length===2).toEqual(true);
  }));

  it('should run #searchUser()', async(() => {
    const result = component.searchUser("Ambili"); 
    expect(component.UsersList.length===2).toEqual(true);
  }));  
  
  it('should run #selectUser()', async(() => {
    component.enableAdd=false;
    const result = component.selectUser(1); 
    expect(component.enableAdd =true).toEqual(true);  
  })); 

  it('should run #addUser()', async(() => {
   // const result = component.addUser(); 
    }));  

});
