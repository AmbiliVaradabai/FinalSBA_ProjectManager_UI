import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserServiceService } from '../Service/user-service.service'
import { User } from '../Model/usermodel';
declare var $ :any;

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  @Input()  name: string;
  @Output() userSelected = new EventEmitter<User>();

  UsersList       : User[];
  SortKey         : string;
  SearchKey       : string;
  SelectedUserID  : number;
  enableAdd       : boolean;

  constructor(private _userSrvc: UserServiceService) { }

  ngOnInit() {
    this.refreshList();
  }

  refreshList(){
    this._userSrvc.retrieveUsers(this.SearchKey, this.SortKey)
      .subscribe(response => {
        if (response.Success == true) {
          this.UsersList = response.Data;
        }
      });
      this.enableAdd = false;
  }

  
  searchUser(searchValue: string) {
    this.SearchKey = searchValue;
    this.refreshList();
  }

  selectUser(userID: number){
    this.SelectedUserID = userID;
    this.enableAdd = true;
  }

  addUser(){
    this._userSrvc.getUserByID(this.SelectedUserID)
      .subscribe(response =>{
          if(response.Success==true)
          {
            this.userSelected.emit(response.Data);
            $('#userSearch').modal('toggle');
          }
      });
  }
  
}
