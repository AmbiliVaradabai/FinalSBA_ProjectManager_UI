import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserServiceService } from '../Service/user-service.service'
import { User } from '../Model/usermodel';
import { MessageService } from '../../Common/Service/message.service'

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
  
  UsersList       : User[];
  UserAddEditForm : FormGroup;
  SortKey         : string;
  SearchKey       : string;  
  UserAction      : String ;


  constructor(private formbuilder: FormBuilder,
              private _userSrvc: UserServiceService,
              private _msgSrvc :MessageService) {
    this.createForm();
  }

  ngOnInit() {
    this.retrieveUserList();
  }

  //Initialising the form 
  createForm(){
    this.UserAddEditForm = this.formbuilder.group({
      firstname :['', Validators.required],
      lastname :['', Validators.required],
      employeeId :['', Validators.required],
      userid:''
    });
    this.UserAction ="Add";
  }

  //Function called while submitting the form and add/edit action will be performed based on user action.
  addOrEditUser() {
    if (this.UserAction == 'Add') {
      this.addUser();
    }
    else if (this.UserAction == 'Update') {
       this.updateUser();
    }
  }

  //Code to add new user to the system 
  addUser() {
    const newUser = <User>{
      FirstName: this.UserAddEditForm.controls['firstname'].value,
      LastName: this.UserAddEditForm.controls['lastname'].value,
      EmployeeID: this.UserAddEditForm.controls['employeeId'].value
    };
    this._userSrvc.addUser(newUser)
      .subscribe(response => {
        if (response.Success == true) {
          this._msgSrvc.success('User added successfully!', 'Success', 3000);
          this.retrieveUserList();
          this.reset();
        }
        else
          this._msgSrvc.error(response.Message, 'Error', 3000);
      });
  }

  //rest the add/edit user form
  reset() {
    this.UserAddEditForm.reset();
    this.SearchKey = null;
    this.SortKey = null;    
    this.UserAction ='Add';  
  }

  //Code to retrieve the users list 
  retrieveUserList(){
    this._userSrvc.retrieveUsers(this.SearchKey, this.SortKey)
    .subscribe(response => {
      if (response.Success == true) {
        this.UsersList = response.Data;
      }
    });   
  }


//Function is invoked while clikcing the edit button in user list and this load the data in useraddeditform.
  editUser(userID) {
    this._userSrvc.getUserByID(userID)
      .subscribe(response => {
        if (response.Success == true) {
          this.UserAddEditForm = this.formbuilder.group({
            firstname: [response.Data.FirstName, Validators.required],
            lastname: [response.Data.LastName, Validators.required],
            employeeId: [response.Data.EmployeeID,Validators.required],
            userid: response.Data.UserID
          });
          this.UserAction = 'Update';
        }
        else {
          this._msgSrvc.error(response.Message, 'Error', 3000);
        }
      });
  }

  //Function to Update the existing user data 
  updateUser() {
    const UserData = <User>{
      UserID: this.UserAddEditForm.controls['userid'].value,
      FirstName: this.UserAddEditForm.controls['firstname'].value,
      LastName: this.UserAddEditForm.controls['lastname'].value,
      EmployeeID: this.UserAddEditForm.controls['employeeId'].value
    };

    this._userSrvc.updateUser(UserData)
      .subscribe(response => {
        if (response.Success == true) {
          this._msgSrvc.success('User Data updated successfully!', 'Success', 3000);
          this.retrieveUserList();
          this.reset();
        }
        else
          this._msgSrvc.error(response.Message, 'Error', 3000);
      });
  }

  //Function to Delete the existing User
  deleteUser(userID){
    this._userSrvc.deleteUser(userID)
    .subscribe(response => {
      if (response.Success == true) {
        this._msgSrvc.success('User is deleted successfully!', 'Success', 3000);
        this.retrieveUserList();
      }
      else {
        this._msgSrvc.error(response.Message, 'Error', 3000);
      }
    });
  }

  //Search the user based on first name / last name
  SearchUser(searchValue: string) {
    this.SearchKey = searchValue;
    this.retrieveUserList();
  }

  //Sort user based on name / id
  sortUsers(sortKey: string){
    if(sortKey=='firstname')
    this.SortKey = 'FirstName';
    else if(sortKey=='lastname')
    this.SortKey = 'LastName';
    else if(sortKey=='employeeId')
    this.SortKey = 'EmployeeID';
    this.retrieveUserList();
  }

}
