import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Project } from '../Model/project'
import { MessageService } from '../../Common/Service/message.service';
import { User } from '../../User/Model/usermodel';
import { ProjectService } from '../Service/project.service'
import { UserServiceService } from '../../User/Service/user-service.service'

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  ProjectList         : Project[];
  ProjectAddEditForm  : FormGroup;
  UserAction          : string;
  setdate             : boolean;
  Manager             : User;
  SortKey             : string;
  SearchKey           : string;

  constructor(private formbuilder : FormBuilder,
              private _msgSrvc    : MessageService,
              private _ProjSrvc   : ProjectService,
              private _UserSrvc   : UserServiceService) { 
    this.createForm();
  }

  ngOnInit() {
    this.retrieveProjectList();    
    this.dateValidation() ;
  }


  createForm() {
    this.ProjectAddEditForm = this.formbuilder.group({
      projectname : ['', Validators.required],
      setdate     : false,
      startdate   : [{ value: '', disabled: true }],
      enddate     : [{ value: '', disabled: true }],
      priority    : 0,
      manager     : '',
      projectid   : ''
    });
  this.UserAction = 'Add';
  } 

  
  //set the initial values for start date and end date and display proper validation
  dateValidation() {
    this.ProjectAddEditForm.get('setdate').valueChanges.subscribe(
      (setdate: boolean) => {
        this.setdate = setdate;

        if (setdate) {
          var today = new Date();
          var startdate = <NgbDateStruct>{ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
          this.ProjectAddEditForm.get('startdate').setValidators([Validators.required]);
          this.ProjectAddEditForm.get('startdate').setValue(startdate);
          this.ProjectAddEditForm.get('startdate').enable({ emitEvent: true });
          var enddate = <NgbDateStruct>{ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() + 1 };
          this.ProjectAddEditForm.get('enddate').setValidators([Validators.required]);
          this.ProjectAddEditForm.get('enddate').setValue(enddate);
          this.ProjectAddEditForm.get('enddate').enable({ emitEvent: true });
        }
        else {
          this.ProjectAddEditForm.get('startdate').clearValidators();
          this.ProjectAddEditForm.get('startdate').setValue('');
          this.ProjectAddEditForm.get('startdate').disable({ emitEvent: true });
          this.ProjectAddEditForm.get('enddate').clearValidators();
          this.ProjectAddEditForm.get('enddate').setValue('');
          this.ProjectAddEditForm.get('enddate').disable({ emitEvent: true });
        }
    });

    this.ProjectAddEditForm.get('enddate').valueChanges.subscribe(
      (enddateSelected: Date) => {
        var startdateSelected = this.ProjectAddEditForm.get('startdate').value;
        var enddate = moment(enddateSelected).add(-1, 'months').toDate();
        var startdate = moment(startdateSelected).add(-1, 'months').toDate();
        if (startdate && enddate) {
          if (enddate < startdate) {
            this._msgSrvc.error('End date should be greater than start date', 'Error', 3000);
            this.ProjectAddEditForm.controls['enddate'].setErrors({ 'incorrect': true });
          }
        }
    });

    this.ProjectAddEditForm.get('startdate').valueChanges.subscribe(
      (startdateSelected: Date) => {
        var enddateSelected = this.ProjectAddEditForm.get('enddate').value;
        var enddate = moment(enddateSelected).add(-1, 'months').toDate();
        var startdate = moment(startdateSelected).add(-1, 'months').toDate();
        if (enddate && startdate) {
          if (startdate > enddate) {
            this._msgSrvc.error('End date should be greater than start date', 'Error', 3000);            
            this.ProjectAddEditForm.controls['startdate'].setErrors({ 'incorrect': true });
          }
        }
    });
  }

  //Below function will be invoked while submitting form and based on user action, corresponding actions will be performed.
  addOrEditProject() {
    if (this.ProjectAddEditForm.valid) {
      if (this.UserAction == 'Add') {
        this.createProject();
      }
      else {
        this.updateProject();
      }
    }
  }

  //Function to create a new project 
  createProject(){
    const newProject = <Project>{
      Project: this.ProjectAddEditForm.controls['projectname'].value,
      Priority: this.ProjectAddEditForm.controls['priority'].value
    };
    if (this.Manager) {
      newProject.ManagerID = this.Manager.UserID;
    }
    if (this.setdate) {
        newProject.StartDate = moment(this.ProjectAddEditForm.controls['startdate'].value).add(-1, 'months').toDate();
        newProject.EndDate = moment(this.ProjectAddEditForm.controls['enddate'].value).add(-1, 'months').toDate();
    }  
    this._ProjSrvc.createProject(newProject)
      .subscribe(response => {
        if (response.Success == true) {
          this._msgSrvc.success('The Project has been added successfully.', 'Success', 3000);
          this.retrieveProjectList();
          this.reset();
        }
        else {
          this._msgSrvc.error(response.Message, 'Error', 3000);
        }
      });    
  }

  //Function to rest the create/update project form
  reset() {
    this.ProjectAddEditForm.reset();
    this.UserAction = 'Add';
    this.ProjectAddEditForm.get('priority').setValue(0);    
    this.Manager = null;  
    this.setdate = false;      
  }
    
  //Calling from manager search 
  onManagerSelect(manager: User) {
    this.Manager = manager;
    this.ProjectAddEditForm.get('manager').setValue(`${this.Manager.FirstName} ${this.Manager.LastName}`);
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

  //Search by name
  search(searchValue: string) {
    this.SearchKey = searchValue;
    this.retrieveProjectList();
  } 

  //Sort user based on name / id
  sortProjects(sortKey: string){
    if(sortKey=='StartDate')
    this.SortKey = 'StartDate';
    else if(sortKey=='EndDate')
    this.SortKey = 'EndDate';
    else if(sortKey=='Priority')
    this.SortKey = 'Priority';
    else if(sortKey=='CompletedTasks')
    this.SortKey = 'CompletedTasks';    
    this.retrieveProjectList();
  }

  //To update the Project details. This will be invoked while clicking update button in the edit/update form.
  updateProject() {
    const ProjectDetails = <Project>{
      ProjectID : this.ProjectAddEditForm.controls['projectid'].value,
      Project   : this.ProjectAddEditForm.controls['projectname'].value,
      Priority  : this.ProjectAddEditForm.controls['priority'].value
    };
    if (this.Manager) {
      ProjectDetails.ManagerID = this.Manager.UserID;
    }
    if (this.setdate) {
      ProjectDetails.StartDate = moment(this.ProjectAddEditForm.controls['startdate'].value).add(-1, 'months').toDate();
      ProjectDetails.EndDate   = moment(this.ProjectAddEditForm.controls['enddate'].value).add(-1, 'months').toDate();
    }
    this._ProjSrvc.updateProject(ProjectDetails)
      .subscribe(response => {
        console.log(response);
        if (response.Success == true) {
          this._msgSrvc.success('Project has been updated successfully!', 'Success', 3000);
          this.reset();
          this.retrieveProjectList();
        }
        else
          this._msgSrvc.error(response.Message, 'Error', 3000);
    });
  }
  
  //This function will be invoked while clicking the "Update" button in the project list.Function loads the selected data to the form
  LoadProjectDetails(projectID) {
    this.reset();
    this._ProjSrvc.getProjectByID(projectID)
      .subscribe(response => {
        if (response.Success == true) {
          console.log(response.Data)
          this.ProjectAddEditForm.controls["projectname"].setValue(response.Data.Project);
          this.ProjectAddEditForm.controls["projectid"].setValue(response.Data.ProjectID);          
          this.ProjectAddEditForm.controls["priority"].setValue(response.Data.Priority);
          this.ProjectAddEditForm.controls["projectname"].setValidators(Validators.required);       
          var ProjstartDate, ProjendDate;
          
          if (response.Data.StartDate || response.Data.EndDate) {
            this.ProjectAddEditForm.controls["setdate"].setValue(true);
            let newStarDate = new Date(response.Data.StartDate)
            let newEndDate  = new Date(response.Data.EndDate)

            ProjstartDate = <NgbDateStruct>{
              year  : newStarDate.getFullYear(),
              month : newStarDate.getMonth() + 1, 
              day   : newStarDate.getDate()
            };

            ProjendDate = <NgbDateStruct>{
              year  : newEndDate.getFullYear(),
              month : newEndDate.getMonth() + 1, 
              day   : newEndDate.getDate()
            };
            this.ProjectAddEditForm.controls["startdate"].setValue(ProjstartDate);
            this.ProjectAddEditForm.controls["enddate"].setValue(ProjendDate);
          }
          else {
            this.ProjectAddEditForm.controls["setdate"].setValue(false);
          }
          if (response.Data.ManagerID) {
            this._UserSrvc.getUserByID(response.Data.ManagerID)
              .subscribe(response => {
                this.Manager = response.Data;
                if (response.Data) {
                  this.ProjectAddEditForm.controls["manager"].setValue(`${this.Manager.FirstName} ${this.Manager.LastName}`);
                }
              });
          }
          this.UserAction = 'Update';
        }
        else {
          this._msgSrvc.error(response.Message, 'Error', 3000);
        }
      });
  }

  //Code to suspend the project 
  suspendProject(projectID) {
    this._ProjSrvc.suspendProject(projectID)
      .subscribe(response => {
        if (response.Success == true) {
          this._msgSrvc.success('Project is suspended successfully!', 'Success', 3000);
          this.retrieveProjectList();
        }
        else {
          this._msgSrvc.error(response.Message, 'Error', 3000);
        }
    });
  }



}
