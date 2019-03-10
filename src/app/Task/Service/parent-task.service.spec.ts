import { TestBed, inject } from '@angular/core/testing';
import { ParentTaskService } from './parent-task.service';
import { HttpClient, HttpClientModule,HttpHeaders, HttpParams } from '@angular/common/http';
import {
    HttpModule,
    XHRBackend,
    Response,
    ResponseOptions,
    RequestMethod
  } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';


describe('ParentTaskService', () => {
    const apiUrl = 'http://localhost:3000/parenttasks';
    let service: ParentTaskService;
    let mockBackend: MockBackend;
    
      
      beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule,HttpClientModule],
            providers: [ParentTaskService,
                { provide: XHRBackend, useClass: MockBackend }]
        });
        
        service = TestBed.get(ParentTaskService);
        mockBackend = TestBed.get(XHRBackend);    
      });

    it('should be created', inject([ParentTaskService], (service: ParentTaskService) => {
        expect(service).toBeTruthy();
    }));

    it('should run #retrieveParentTasks()', () => {
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
      
        service.retrieveParentTasks().subscribe(data => {
        expect(TasksList.length).toEqual(2);
        });
    });  
    
      it('should run #createParentTask()', () => {
        const newTask ={ParentTask:"Task1", ProjectID:1} 
           
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
      
        service.createParentTask(newTask).subscribe(data => {
        expect(newTask.ParentTask).toEqual('Task1');
        });
      });  
    
      it('should run #getParentTaskById()', () => {  
        mockBackend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toBe(RequestMethod.Get);
            expect(connection.request.url).toBe(apiUrl);
          });
        service.getParentTaskById(2).subscribe(data => {
        //expect().toEqual('Ambili');
        });
      });      
});

