import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from '../../Common/Service/message.service';
import { Router, ActivatedRoute  } from '@angular/router';
import { Project } from '../../Project/Model/project';
import { User } from '../../User/Model/usermodel';
import { Task, ParentTask } from '../Model/Task';
import { ParentTaskService } from '../Service/parent-task.service'
import { TaskService } from '../Service/task.service'

declare var $: any;
declare var jquery: any;

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  User             : User;

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

  constructor(private activateRoute : ActivatedRoute,
              private router        : Router,
              private _msgSrvc      : MessageService,
              private _ParntTskSrvc : ParentTaskService,
              private _taskSrvc     : TaskService) { }

  ngOnInit() {
    this.activateRoute.queryParams
      .subscribe(params => {
        this.taskId = params['taskId']
      });

    if (this.taskId) {
      this._taskSrvc.getTaskById(this.taskId)
        .subscribe(response => {
          this.task = response.Data;

          var startDateSource=moment(this.task.StartDate).toDate();
          this.stardate = {
            year: startDateSource.getFullYear(),
            month: startDateSource.getMonth() + 1, 
            day: startDateSource.getDate()
          };
        
          var endDateSource=moment(this.task.EndDate).toDate();
          this.enddate = {
            year: endDateSource.getFullYear(),
            month: endDateSource.getMonth() + 1, 
            day: endDateSource.getDate()+ 1
          };
        });
    }

  }

  reset(){
    this.stardate = {
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth() + 1, 
      day: (new Date()).getDate()
    };
  
    this.enddate = {
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth() + 1, 
      day: (new Date()).getDate() + 1
    };

    this.task = <Task>{
      Task: null,
      Priority: 0,
      StartDate: moment().format('DD/MM/YYYY'),
      EndDate: moment().add(1, 'days').format('DD/MM/YYYY')
    };
    this.isThisParent = false;
    this.taskId = null;
    $('#taskname').removeClass('ng-invalid'); 
  }

  //Calling from user search 
  onUserSelect(user: User) {
    this.task.User = user;
  }

  //Calling from Project search popup
  onProjectSelect(project: Project) {
  this.task.Project = project;
  } 

  //Calling from Parent Task search popup
  onParentTaskSelect(parent: ParentTask) {
    this.task.Parent = parent;
  } 
  
  createTask() {
    if (this.isThisParent) {
      const newParent = <ParentTask>{
        ParentTask  : this.task.Task,
        ProjectID   : this.task.Project.ProjectID
      };

      this._ParntTskSrvc.createParentTask(newParent)
        .subscribe(response => {
          if (response.Success == true) {
            this._msgSrvc.success('Parent Task added successfully!', 'success', 3000);
            this.reset();
          }
          else {
            this._msgSrvc.error(response.Message, 'Error', 3000);
          }
        });
    }
    else {
      this.task.StartDate = moment(this.stardate).add(-1, 'months').format("YYYY-MM-DD");
      this.task.EndDate = moment(this.enddate).add(-1, 'months').format("YYYY-MM-DD");
      this._taskSrvc.createTask(this.task)
        .subscribe(response => {
          if (response.Success == true) {
            this._msgSrvc.success('Task has been added successfuly!', 'Success', 3000);
            this.reset();
          }
          else {
            this._msgSrvc.error(response.Message, 'Error', 3000);
          }
        });
    }
  } 
  
 
  updateTask() {
    this.task.StartDate = moment(this.stardate).add(-1, 'months').format("YYYY-MM-DD");
    this.task.EndDate = moment(this.enddate).add(-1, 'months').format("YYYY-MM-DD");  
    this._taskSrvc.editTask(this.task)
      .subscribe(response => {
        if (response.Success == true) {
          this._msgSrvc.success('Task has been updated successfuly!', 'Success', 3000);
        }
        else {
          this._msgSrvc.error(response.Message, 'Error', 3000);
        }
      });
  } 

}
