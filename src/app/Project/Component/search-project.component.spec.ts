import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchProjectComponent } from './search-project.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from '../Service/project.service'
import { Component, Directive } from '@angular/core';
import { MessageService  } from '../../Common/Service/message.service';
import { ServerResponse } from '../../Common/Model/commonresponse';
import { Project } from '../Model/project';
import { Observable, Subject, pipe, of } from 'rxjs';
import { NgbDateStruct,NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
declare var $ :any;



class MockProjectService {
  ProjectList: Project[];
  constructor(){
   this.ProjectList =<Project[]>[{Project:"Project1", Priority:1}, 
                       {Project:"Project2", Priority:2}
                      ];
  }
  retrieveProjects(searchKey:string, sortKey:string):Observable<ServerResponse<Project[]>>{
    var response = <ServerResponse<Project[]>>{Success:true, Data:this.ProjectList};
    return of(response);
  }
  getProjectByID(projectId: number): Observable<ServerResponse<Project>>  {
    var response = <ServerResponse<Project>>{Success:true}
    return of(response);
  }
}

class MockMessageService {
  error(message: string, title:string,timeout:number, keepAfterRouteChange = false) {}
  success(message: string, title:string,timeout:number, keepAfterRouteChange = false) {}
}

xdescribe('SearchProjectComponent', () => {
  let component: SearchProjectComponent;
  let fixture: ComponentFixture<SearchProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchProjectComponent
      ],
      imports:[ HttpClientModule, NgbModule.forRoot()],
      providers: [
        {provide: ProjectService, useClass: MockProjectService},
        {provide: MessageService, useClass: MockMessageService},
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(SearchProjectComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async(() => {
    const result = component.ngOnInit();
    expect(component.ProjectList.length===2).toEqual(true);
  }));

  it('should run #retrieveProjectList()', async(() => {
    const result = component.retrieveProjectList();
    expect(component.ProjectList.length===2).toEqual(true);
  }));

  it('should run #searchProject()', async(() => {
    const result = component.searchProject("NewProj"); 
    expect(component.ProjectList.length===2).toEqual(true);
  }));  

  it('should run #selectProject()', async(() => {
    component.AddButtonEnable=false
    const result = component.selectProject(2);
    expect(component.AddButtonEnable =true).toEqual(true);  
  }));  

  it('should run #addProject()', async(() => {
    //const result = component.addProject(2);
  })); 
 

});
