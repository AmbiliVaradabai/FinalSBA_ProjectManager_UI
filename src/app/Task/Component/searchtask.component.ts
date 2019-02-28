import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { ParentTaskService } from '../Service/parent-task.service';
import { ParentTask } from '../Model/Task';
declare var $ :any;
declare var jquery:any;


@Component({
  selector: 'app-searchtask',
  templateUrl: './searchtask.component.html',
  styleUrls: ['./searchtask.component.css']
})
export class SearchtaskComponent implements OnInit {
  @Input()  name: string;
  @Output() parentTaskSelected = new EventEmitter<ParentTask>();

  ParentTasksList       : ParentTask[];
  SortKey               : string;
  SearchKey             : string;
  AddButtonEnable       : boolean; 
  SelectedparentTaskID  : number;  

  constructor(private _parntTaskSrvc: ParentTaskService) { }

  ngOnInit() {
    this.retrieveParentTasks();
  }

  retrieveParentTasks(){
    this._parntTaskSrvc.retrieveParentTasks(this.SearchKey)
      .subscribe(response => {
        if (response.Success == true) {
          this.ParentTasksList = response.Data;
        }
      });
      this.AddButtonEnable = false;
  }

  
  searchParentTask(searchValue: string) {
    this.SearchKey = searchValue;
    this.retrieveParentTasks();
  }

  selectParentTask(parentID: number){
    this.SelectedparentTaskID = parentID;
    this.AddButtonEnable = true;
  }

  addParentTask(){
    this._parntTaskSrvc.getParentTaskById(this.SelectedparentTaskID)
      .subscribe(response =>{
          if(response.Success==true)
          {
            this.parentTaskSelected.emit(response.Data);
            $('#ParenttaskSearch').modal('toggle');
          }
      });
  }
}
