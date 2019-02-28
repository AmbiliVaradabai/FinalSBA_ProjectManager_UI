import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../Model/project';
import { ProjectService } from '../Service/project.service';

declare var $ :any;
declare var jquery:any;

@Component({
  selector: 'app-search-project',
  templateUrl: './search-project.component.html',
  styleUrls: ['./search-project.component.css']
})
export class SearchProjectComponent implements OnInit {
  @Input()  name: string;
  @Output() projectSelected = new EventEmitter<Project>();

  ProjectList       : Project[];
  SortKey           : string;
  SearchKey         : string;
  AddButtonEnable   : boolean; 
  SelectedProjectID : number;  

  constructor(private _ProjSrvc: ProjectService) { }

  ngOnInit() {
    this.retrieveProjectList()
  }

  //Code to retrieve the project list 
  retrieveProjectList(){
    this._ProjSrvc.retrieveProjects(this.SearchKey, this.SortKey)
    .subscribe(response => {
      if (response.Success == true) {
        this.ProjectList = response.Data;     
      }
    });   
  }

  //Search Projects
  searchProject(searchValue: string) {
    this.SearchKey = searchValue;
    this.retrieveProjectList();
  }

  //While Selecting  Project
  selectProject(projectID: number){
    this.SelectedProjectID = projectID;
    this.AddButtonEnable = true;
  }

  addProject(){
    this._ProjSrvc.getProjectByID(this.SelectedProjectID)
      .subscribe(response =>{
          if(response.Success==true)
          {
            this.projectSelected.emit(response.Data);
            $('#projectSearch').modal('toggle');
          }
      });
  }  

}
