import { TestBed, inject } from '@angular/core/testing';
import { ProjectService } from './project.service';
import { HttpClient, HttpClientModule,HttpHeaders, HttpParams } from '@angular/common/http';
import {
    HttpModule,
    XHRBackend,
    Response,
    ResponseOptions,
    RequestMethod
  } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

xdescribe('ProjectService', () => {
    const apiUrl = 'http://localhost:3000/projects';
    let service: ProjectService;
    let mockBackend: MockBackend;
      
      beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule,HttpClientModule],
            providers: [ProjectService,
                { provide: XHRBackend, useClass: MockBackend }]
        });
        
        service = TestBed.get(ProjectService);
        mockBackend = TestBed.get(XHRBackend);    
      });

    it('should be created', inject([ProjectService], (service: ProjectService) => {
        expect(service).toBeTruthy();
    }));

    it('should run #retrieveProjects()', () => {
        const ProjectList =[{Project:"Project1", Priority:1}, 
                            {Project:"Project2", Priority:2}] 
    
        mockBackend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toBe(RequestMethod.Get);
            expect(connection.request.url).toBe(apiUrl);
      
            connection.mockRespond(
              new Response(
                new ResponseOptions({
                  body: ProjectList
                })
              )
            );
          });
      
        service.retrieveProjects().subscribe(data => {
        expect(ProjectList.length).toEqual(2);
        });
      });  
    
      it('should run #createProject()', () => {
        const newProject ={Project:"Project1", Priority:1} 
    
        mockBackend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toBe(RequestMethod.Post);
            expect(connection.request.url).toBe(apiUrl);
      
            connection.mockRespond(
              new Response(
                new ResponseOptions({
                  body: newProject
                })
              )
            );
          });
      
        service.createProject(newProject).subscribe(data => {
        expect(newProject.Project).toEqual('Project1');
        });
      });  
    
      it('should run #getProjectByID()', () => {  
        mockBackend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toBe(RequestMethod.Post);
            expect(connection.request.url).toBe(apiUrl);
          });
        service.getProjectByID(2).subscribe(data => {
        //expect().toEqual('Ambili');
        });
      });  
        
    
      it('should run #updateProject()', () => { 
        const ProjectData = {Project:"Project1", Priority:1} 
        mockBackend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toBe(RequestMethod.Post);
            expect(connection.request.url).toBe(apiUrl);
          });
        service.updateProject(ProjectData).subscribe(data => {
        //expect().toEqual('Ambili');
        });
      });

      it('should run #suspendProject()', () => { 
        mockBackend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toBe(RequestMethod.Post);
            expect(connection.request.url).toBe(apiUrl);
          });
        service.suspendProject(2).subscribe(data => {
        //expect().toEqual('Ambili');
        });
      });      

});
