import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchtaskComponent } from './searchtask.component';
import { HttpClientModule } from '@angular/common/http';
import { ParentTaskService } from '../Service/parent-task.service'
import { Component, Directive } from '@angular/core';
import { MessageService  } from '../../Common/Service/message.service';
import { ServerResponse } from '../../Common/Model/commonresponse';
import { ParentTask } from '../Model/Task';
import { Observable, Subject, pipe, of } from 'rxjs';
import { NgbDateStruct,NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

declare var $ :any;

class MockParentTaskService {
    ParentTasksList       : ParentTask[];
    constructor(){
     this.ParentTasksList =<ParentTask[]>[{ParentTaskID: 1, ParentTask:"Varada",ProjectID:173729}, 
                                        {ParentTaskID: 1, ParentTask:"Varada",ProjectID:173729}
                        ];
    }

    retrieveParentTasks(searchKey?: string, sortKey?: string): Observable<ServerResponse<ParentTask[]>> {
      var response = <ServerResponse<ParentTask[]>>{Success:true, Data:this.ParentTasksList};
      return of(response);
    }
  
    getParentTaskById(parentId: number): Observable<ServerResponse<ParentTask>> {
      var response = <ServerResponse<ParentTask>>{Success:true}
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
  
  xdescribe('SearchtaskComponent', () => {
    let component: SearchtaskComponent;
    let fixture: ComponentFixture<SearchtaskComponent>;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
            SearchtaskComponent
        ],
        imports:[ HttpClientModule, NgbModule.forRoot()],
        providers: [
          {provide: ParentTaskService, useClass: MockParentTaskService},
          {provide: MessageService, useClass: MockMessageService},
        ]
      }).compileComponents();
      fixture = TestBed.createComponent(SearchtaskComponent);
      component = fixture.debugElement.componentInstance;
    });
  
    it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async(() => {
    const result = component.ngOnInit();
    expect(component.ParentTasksList.length===2).toEqual(true);
  }));

  it('should run #retrieveParentTasks()', async(() => {
    const result = component.retrieveParentTasks();
    expect(component.ParentTasksList.length===2).toEqual(true);
  }));

  it('should run #searchParentTask()', async(() => {
    const result = component.searchParentTask("NewProj"); 
    expect(component.ParentTasksList.length===2).toEqual(true);
  }));  

  it('should run #selectParentTask()', async(() => {
    component.AddButtonEnable=false
    const result = component.selectParentTask(2);
    expect(component.AddButtonEnable =true).toEqual(true);  
  }));  

  it('should run #addParentTask()', async(() => {
    //const result = component.addParentTask();
  })); 

});
