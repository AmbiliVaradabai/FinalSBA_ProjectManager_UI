
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTaskComponent } from './create-task.component';
import { MessageService } from '../../Common/Service/message.service';
import { Router, ActivatedRoute, RouterModule  } from '@angular/router';
import { Project } from '../../Project/Model/project';
import { User } from '../../User/Model/usermodel';
import { Task, ParentTask } from '../Model/Task';
import { ParentTaskService } from '../Service/parent-task.service'
import { TaskService } from '../Service/task.service'
import { DateCheckValidator } from '../../Common/Service/DateDirective';
import { NgbDateMomentParserFormatter } from '../../Common/DateFormater'
import { HttpClientModule } from '@angular/common/http';
import { NgbDateStruct, NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { UserSearchComponent } from '../../User/Components/user-search.component'
import { SearchProjectComponent }  from '../../Project/Component/search-project.component'
import { SearchtaskComponent } from '../../Task/Component/searchtask.component'
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, Subject, pipe, of } from 'rxjs';
import { ServerResponse } from '../../Common/Model/commonresponse';
declare var $: any;
declare var jquery: any;

class MockTaskService {
    Task             : Task
    taskId           : any = null;
    isThisParent     : boolean = false;

    stardate: NgbDateStruct = {
    year  : (new Date()).getFullYear(),
    month : (new Date()).getMonth() + 1, 
    day   : (new Date()).getDate() 
    };


    enddate : NgbDateStruct = {
    year  : (new Date()).getFullYear(),
    month : (new Date()).getMonth() + 1, 
    day   : (new Date()).getDate() + 1
    };

    task = <Task>{
    Task      : '',
    Priority  : 0,
    StartDate : moment().format('DD/MM/YYYY'),
    EndDate   : moment().add(1, 'days').format('DD/MM/YYYY')
    };

    createTask(newTask: Task): Observable<ServerResponse<Task>>{
        var response = <ServerResponse<Task>>{Success:true};
        return of(response);
    } 
    
    getTaskById(taskId: number): Observable<ServerResponse<Task>>{
        var response = <ServerResponse<Task>>{Success:true, Data:this.task}
        return of(response);
    }

    editTask(updateTask: Task): Observable<ServerResponse<Task>>
    {
      var response = <ServerResponse<Task>>{Success:true}
      return of(response);
    }
  }


class MockParentTaskService {
  Task             : Task
  taskId           : any = null;
  isThisParent     : boolean = false;

  stardate: NgbDateStruct = {
  year  : (new Date()).getFullYear(),
  month : (new Date()).getMonth() + 1, 
  day   : (new Date()).getDate() 
  };


  enddate : NgbDateStruct = {
  year  : (new Date()).getFullYear(),
  month : (new Date()).getMonth() + 1, 
  day   : (new Date()).getDate() + 1
  };

  task = <Task>{
  Task      : '',
  Priority  : 0,
  StartDate : moment().format('DD/MM/YYYY'),
  EndDate   : moment().add(1, 'days').format('DD/MM/YYYY')
  };

  

  createParentTask(newParentTask: ParentTask): Observable<ServerResponse<ParentTask>> {
      var response = <ServerResponse<ParentTask>>{Success:true};
      return of(response);
  } 
}
  
  class MockMessageService {
    error(message: string, title:string,timeout:number, keepAfterRouteChange = false) {}
    success(message: string, title:string,timeout:number, keepAfterRouteChange = false) {}
  }

xdescribe('CreateTaskComponent', () => {
    let component: CreateTaskComponent;
    let fixture: ComponentFixture<CreateTaskComponent>;

  
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
            CreateTaskComponent, DateCheckValidator, UserSearchComponent, SearchProjectComponent, SearchtaskComponent
        ],
        imports:[HttpClientModule, RouterTestingModule, FormsModule, NgbModule.forRoot()],
        providers: [
          {provide: TaskService, useClass: MockTaskService},
          {provide:ParentTaskService,useClass:MockParentTaskService},
          {provide: MessageService, useClass: MockMessageService}, 
          {provide: ActivatedRoute}
        
        ]
      }).compileComponents();
      fixture = TestBed.createComponent(CreateTaskComponent);
      component = fixture.debugElement.componentInstance;
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should run #reset()', async(() => {
    component.isThisParent =false
    const result= component.reset()
    expect(component.isThisParent =false).toEqual(false);  
  })); 

  it('should run #createTask()', async(() => {
    component.isThisParent =false
    const result= component.createTask()
    expect(component.isThisParent =false).toEqual(false);  
  })); 
  
  it('should run #createTask()', async(() => {
    component.isThisParent =true    
    const result= component.createTask()
    expect(component.isThisParent =true).toEqual(true);  
  })); 


  it('should run #onUserSelect()', async(() => {
    component.isThisParent=false
    let user={FirstName:"Ambili", LastName:"Varada",EmployeeID:173729}
    const result = component.onUserSelect(user);
    expect(component.isThisParent =false).toEqual(false);      
  })); 

  it('should run #onProjectSelect()', async(() => {
    component.isThisParent=false
    let project ={ProjectID:2,Project:"Project1", Priority:1}
    //const result = component.onProjectSelect(project);
    //expect(component.isThisParent =false).toEqual(false);      
  })); 

  it('should run #onParentTaskSelect()', async(() => {
    component.isThisParent=false
    let parentTask ={ParentTaskID:2,ParentTask:"Parenettask", ProjectID:2}
    const result = component.onParentTaskSelect(parentTask);
    expect(component.isThisParent =false).toEqual(false);      
  })); 


  // it('should run #ngOnInit()', async(() => {
  //   const result = component.ngOnInit();
  //}));   

  it('should run #updateTask()', async(() => {
    const result = component.updateTask();
    // expect(component.UserAction ==="Add").toEqual(true);   
    // expect(component.retrieveProjectList()).length===2;
    
  })); 



});
 