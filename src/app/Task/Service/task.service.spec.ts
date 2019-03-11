import { TestBed, inject } from '@angular/core/testing';
import { TaskService } from './task.service';
import { HttpClient, HttpClientModule,HttpHeaders, HttpParams } from '@angular/common/http';
import {
    HttpModule,
    XHRBackend,
    Response,
    ResponseOptions,
    RequestMethod
  } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

describe('TaskService', () => {
    const apiUrl = 'http://localhost:3000/tasks';
    let service: TaskService;
    let mockBackend: MockBackend;
    
      
      beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule,HttpClientModule],
            providers: [TaskService,
                { provide: XHRBackend, useClass: MockBackend }]
        });
        
        service = TestBed.get(TaskService);
        mockBackend = TestBed.get(XHRBackend);    
      });

    it('should be created', inject([TaskService], (service: TaskService) => {
        expect(service).toBeTruthy();
    }));

    it('should run #retrieveProjects()', () => {
        const TasksList =[{Project:"Project1", Priority:1}, 
                            {Project:"Project2", Priority:2}] 

        mockBackend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toBe(RequestMethod.Get);
            expect(connection.request.url).toBe(apiUrl);
      
            connection.mockRespond(
              new Response(
                new ResponseOptions({
                  body: TasksList
                })
              )
            );
          });
      
        service.retrieveTasks().subscribe(data => {
        expect(TasksList.length).toEqual(2);
        });
    });  
    
      it('should run #createTask()', () => {
        const newTask ={Task:"Task1", Priority:1} 
           
        mockBackend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toBe(RequestMethod.Post);
            expect(connection.request.url).toBe(apiUrl);
      
            connection.mockRespond(
              new Response(
                new ResponseOptions({
                  body: newTask
                })
              )
            );
          });
      
        service.createTask(newTask).subscribe(data => {
        expect(newTask.Task).toEqual('Task1');
        });
      });  
    
      it('should run #getTaskById()', () => {  
        mockBackend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toBe(RequestMethod.Get);
            expect(connection.request.url).toBe(apiUrl);
          });
        //service.getTaskById(2).subscribe(data => {
        //expect().toEqual('Ambili');
        //});
      });      
    
      it('should run #editTask()', () => { 
        const newTask ={Task:"Task1", Priority:1} 
        mockBackend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toBe(RequestMethod.Post);
            expect(connection.request.url).toBe(apiUrl);
          });
        //service.editTask(newTask).subscribe(data => {
        //expect().toEqual('Ambili');
        //});
      });

      it('should run #endTask()', () => { 
        mockBackend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toBe(RequestMethod.Get);
            expect(connection.request.url).toBe(apiUrl);
          });
        //service.endTask(2).subscribe(data => {
        //expect().toEqual('Ambili');
        //});
      });      

});

