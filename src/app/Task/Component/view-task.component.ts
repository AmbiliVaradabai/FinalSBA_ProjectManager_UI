import { Component, OnInit } from '@angular/core';
import { Project } from '../../Project/Model/project';
import { Task } from '../../Task/Model/Task';
import { TaskService } from '../Service/task.service';
import { MessageService } from '../../Common/Service/message.service';
import { Router, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  project     : Project;
  TasksList   : Task[];
  SortKey     : string;

  constructor(private _taskSrvc   : TaskService, 
              private router      : Router,
              private _msgSrvc    : MessageService,
              private route       : ActivatedRoute
    ) { }

  ngOnInit() {
  }

  //callback from Project search popup
  onProjectSelect(project: Project) {
    this.project = project;
    this.retrieveTasks();
  }

  //Retrieve all tasks for the selected project
  retrieveTasks() {
    this._taskSrvc.retrieveTasks(this.project.ProjectID, this.SortKey)
    .subscribe(response => {
      if (response.Success == true) {
        if (response.Data.length == 0) {
          this._msgSrvc.error('No taks found under the project:' + this.project.Project, 'Warning', 3000);
        }
        this.TasksList = response.Data;
        }
      else {
        this._msgSrvc.error('Error occured while retrieving tasks of the project:' + this.project.Project, 'Error', 3000);
      }
    });
  }

  //Sort tasks based on the sort criteia passed
  sortTasks(sortKey: string) {
    this.SortKey = sortKey;
    this._taskSrvc.retrieveTasks(this.project.ProjectID, sortKey)
      .subscribe(response => {
        if (response.Success == true) {
          this.TasksList = response.Data;
        }
        else {
          this._msgSrvc.error(response.Message, 'Error', 3000);
        }
      });
  } 

  endTask(taskId: number) {
    this._taskSrvc.endTask(taskId)
      .subscribe(response => {
        if (response.Success == true) {
          this.retrieveTasks();
          this._msgSrvc.success('Task ended successfully!', 'Success', 3000);
        }
        else {
          this._msgSrvc.error(response.Message, 'Error', 3000);
        }
      });
  }

  editTask(taskId: number) {
    this._taskSrvc.getTaskById(taskId)
      .subscribe(response => {
        if (response.Success == true) {
          this.router.navigate(['/task/add'], { queryParams: { taskId: taskId } });
        }
        else {
          this._msgSrvc.error(response.Message, 'Error', 3000);
        }
      });
  }

}
