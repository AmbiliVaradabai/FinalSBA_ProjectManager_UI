import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateProjectComponent } from './create-project.component';
import { ProjectService } from '../Service/project.service'
import { Component, Directive } from '@angular/core';
import { MessageService  } from '../../Common/Service/message.service';
import { ServerResponse } from '../../Common/Model/commonresponse';
import { Project } from '../Model/project';
import { User } from '../../User/Model/usermodel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormControl, Validators,FormGroup} from '@angular/forms';
import { Observable, Subject, pipe, of } from 'rxjs';
import * as moment from 'moment';
import { NgbDateStruct,NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { UserSearchComponent } from '../../User/Components/user-search.component'
import { HttpClientModule } from '@angular/common/http';

class MockProjectService {
    ProjectList: Project[];
    project :Project

    constructor(){
     this.ProjectList =<Project[]>[{ProjectID:2,Project:"Project1", Priority:1}, 
                                   {ProjectID:3,Project:"Project2", Priority:2}
                        ];
     this.project = <Project>{ProjectID:2,Project:"Project1", Priority:1}
     }

    retrieveProjects(searchKey:string, sortKey:string):Observable<ServerResponse<Project[]>>{
      var response = <ServerResponse<Project[]>>{Success:true, Data:this.ProjectList};
      return of(response);
    }
  
    createProject(newProject: Project): Observable<ServerResponse<Project>>{
      var response = <ServerResponse<Project>>{Success:true};
      return of(response);
    } 
  
    getProjectByID(projectId: number): Observable<ServerResponse<Project>>  {
      var response = <ServerResponse<Project>>{Success:true, Data:this.project}
      return of(response);
    }
  
    updateProject(ProjectData: Project): Observable<ServerResponse<Project>>{
      var response = <ServerResponse<Project>>{Success:true}
      return of(response);
    }
  
    suspendProject(ProjectID: number): Observable<ServerResponse<Project>>{
      var response = <ServerResponse<Project>>{Success:true}
      return of(response);
    }  
  
  }
  
  class MockMessageService {
    error(message: string, title:string,timeout:number, keepAfterRouteChange = false) {}
    success(message: string, title:string,timeout:number, keepAfterRouteChange = false) {}
  }
  
describe('CreateProjectComponent', () => {
  let component: CreateProjectComponent;
  let fixture: ComponentFixture<CreateProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateProjectComponent,UserSearchComponent
      ],
      imports:[FormsModule, ReactiveFormsModule,HttpClientModule, NgbModule.forRoot()],
      providers: [
        {provide: ProjectService, useClass: MockProjectService},
        FormBuilder,
        {provide: MessageService, useClass: MockMessageService},
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(CreateProjectComponent);
    component = fixture.debugElement.componentInstance;
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run #createForm()', async(() => {
    const result = component.createForm();
    expect(component.ProjectAddEditForm.controls["projectname"].value=="");
    expect(component.UserAction ==="Add").toEqual(true);     
  }));

  it('should run #ngOnInit()', async(() => {
    const result = component.ngOnInit();
    expect(component.ProjectList.length===2).toEqual(true);
  }));

  it('should run #retrieveProjectList()', async(() => {
    const result = component.retrieveProjectList();
    expect(component.ProjectList.length===2).toEqual(true);
  }));
  
  let setdate = true
  if (setdate) {
    it("if setdate is true", function () {
      var today = new Date();
      var startdate = <NgbDateStruct>{ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
      var enddate = <NgbDateStruct>{ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() + 1 };
      const result = component.dateValidation();
      component.ProjectAddEditForm.controls['setdate'].setValue(setdate);
      expect(component.ProjectAddEditForm.controls["startdate"].value==startdate)
      expect(component.ProjectAddEditForm.controls["enddate"].value==enddate) 
      expect(component).toBeTruthy();  
      expect(component.setdate = setdate).toEqual(true);    
    });
  } else {
    it("if setdate is false", function () {
      component.setdate=false
      const result = component.dateValidation();
      component.ProjectAddEditForm.controls['setdate'].setValue(false);      
      expect(component.ProjectAddEditForm.controls["startdate"].value=="")
      expect(component.ProjectAddEditForm.controls["enddate"].value=="")
      expect(component).toBeTruthy();  
      expect(component.setdate = setdate).toEqual(true);  
    });
  }

  var today = new Date();
  var startdate  = <NgbDateStruct>{ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
  var enddate = <NgbDateStruct>{ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() + 1 };
  if (startdate && enddate){
    it('should run #dateValidation when end date is changed', async(() => {
      const result = component.dateValidation();
      component.ProjectAddEditForm.controls['setdate'].setValue(true);
      component.ProjectAddEditForm.controls['enddate'].setValue(enddate);    
      component.ProjectAddEditForm.controls['startdate'].setValue(startdate);  
      expect(component.ProjectAddEditForm.controls["enddate"].value==enddate)    
    }));
  }

  var today = new Date();
  var enddate = <NgbDateStruct>{ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
  var startdate = <NgbDateStruct>{ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() + 1 };
  if (startdate && enddate){
    it('should run #dateValidation when end date is changed', async(() => {
      const result = component.dateValidation();
      component.ProjectAddEditForm.controls['setdate'].setValue(true);
      component.ProjectAddEditForm.controls['enddate'].setValue(enddate);    
      component.ProjectAddEditForm.controls['startdate'].setValue(startdate);  
      expect(component.ProjectAddEditForm.controls["enddate"].value==enddate)    
    }));
  }


  it('should run #addOrEditProject() - for add project ', async(() => {
    component.UserAction="Add";
    const result = component.addOrEditProject();
    expect(component.UserAction ==="Add").toEqual(true);  
  }));

  it('should run #addOrEditProject() - for edit project ', async(() => {
    component.UserAction="Update"
    const result = component.addOrEditProject();
    expect(component.UserAction ==="Update").toEqual(false);  
  })); 
  

  it('should run #createProject()', async(() => {
    component.ProjectAddEditForm.controls['projectname'].setValue("Newproj");
    component.ProjectAddEditForm.controls['priority'].setValue(1);
    component.UserAction="test"
    const result = component.createProject();
    expect(component.UserAction ==="Add").toEqual(true);  
    expect(component.retrieveProjectList()).length===2; 
  })); 

  it('should run #reset()', async(() => {
    component.UserAction="test"
    const result = component.reset();
    expect(component.UserAction ==="Add").toEqual(true);   
  })); 

  it('should run #search()', async(() => {
    const result = component.search("Proj1"); 
    expect(component.ProjectList.length===2).toEqual(true);
  }));  
  
  it('should run #sortProjects()', async(() => {
    const result = component.sortProjects('Priority'); 
    const result11 = component.sortProjects('StartDate'); 
    const result1 = component.sortProjects('EndDate'); 
    const result2 = component.sortProjects('CompletedTasks'); 
    expect(component.ProjectList.length===2).toEqual(true);
  }));  

  
  it('should run #updateProject()', async(() => {
    component.ProjectAddEditForm.controls['projectid'].setValue(1);
    component.ProjectAddEditForm.controls['projectname'].setValue("Newproj");
    component.ProjectAddEditForm.controls['priority'].setValue(1);

    var today = new Date();
    var startdate  = <NgbDateStruct>{ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    var enddate = <NgbDateStruct>{ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() + 1 };

    component.ProjectAddEditForm.controls['enddate'].setValue(enddate);    
    component.ProjectAddEditForm.controls['startdate'].setValue(startdate);  
         
    component.UserAction="Update"
    const result = component.updateProject();
    expect(component.UserAction ==="Add").toEqual(true);   
    expect(component.retrieveProjectList()).length===2;
    
  })); 

  it('should run #suspendProject()', async(() => {
    const result = component.suspendProject(2); 
    expect(component.ProjectList.length===2).toEqual(true);
  }));  

  it('should run #LoadProjectDetails()', async(() => {
    component.ProjectAddEditForm.controls['projectname'].setValue("Newproj");
    component.ProjectAddEditForm.controls['priority'].setValue(1);
    component.UserAction="Update"   
    const result = component.LoadProjectDetails(2);
    expect(component.UserAction ==="Update").toEqual(true);      
  })); 
 
  it('should run #onManagerSelect()', async(() => {
    component.UserAction="Update"   
    //const result = component.onManagerSelect(2);
    expect(component.UserAction ==="Update").toEqual(true);      
  })); 
});
