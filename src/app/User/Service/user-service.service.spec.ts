import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpClientModule,HttpHeaders, HttpParams } from '@angular/common/http';
import {
    HttpModule,
    XHRBackend,
    Response,
    ResponseOptions,
    RequestMethod
  } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { UserServiceService } from './user-service.service';

describe('UserServiceService', () => {
const apiUrl = 'http://localhost:3000/users';
let service: UserServiceService;
let mockBackend: MockBackend;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpModule,HttpClientModule],
        providers: [UserServiceService,
            { provide: XHRBackend, useClass: MockBackend }]
    });
    
    service = TestBed.get(UserServiceService);
    mockBackend = TestBed.get(XHRBackend);    
  });

  it('should be created', inject([UserServiceService], (service: UserServiceService) => {
    expect(service).toBeTruthy();
  }));

  it('should run #retrieveUsers()', () => {
    const UserList =[{FirstName:"Ambili", LastName:"Varada",EmployeeID:173729}, 
    {FirstName:"Hari", LastName:"Haran",EmployeeID:123456}] 

    mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.url).toBe(apiUrl);
  
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              body: UserList
            })
          )
        );
      });
  
    service.retrieveUsers().subscribe(data => {
    expect(UserList.length).toEqual(2);
    });
  });  

  it('should run #addUser()', () => {
    const newUser ={FirstName:"Ambili", LastName:"Varada",EmployeeID:173729} 

    mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        expect(connection.request.url).toBe(apiUrl);
  
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              body: newUser
            })
          )
        );
      });
  
    service.addUser(newUser).subscribe(data => {
    expect(newUser.FirstName).toEqual('Ambili');
    });
  });  

  it('should run #getUserByID()', () => {  
    mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        expect(connection.request.url).toBe(apiUrl);
      });
    service.getUserByID(2).subscribe(data => {
    //expect().toEqual('Ambili');
    });
  });  
    

  it('should run #updateUser()', () => { 
    const UserData ={FirstName:"Ambili", LastName:"Varada",EmployeeID:173729} 
    mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        expect(connection.request.url).toBe(apiUrl);
      });
    service.updateUser(UserData).subscribe(data => {
    //expect().toEqual('Ambili');
    });
  });  
  
});
