import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../Model/usermodel';
import { ServerResponse } from '../../Common/Model/commonresponse';
import { Observable,of, from } from 'rxjs';

export interface IUserService {
  getUserByID(userId: number): Observable<ServerResponse<User>>;
  retrieveUsers(searchKey?: string, sortKey?: string): Observable<ServerResponse<User[]>>;
  addUser(newUser: User): Observable<ServerResponse<User>>;
  updateUser(updateUser: User): Observable<ServerResponse<User>>;
  deleteUser(userId: number): Observable<ServerResponse<User>>;
}

@Injectable({
  providedIn: 'root'
})

export class UserServiceService implements IUserService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  //Add user Api Call
  addUser(newUser: User): Observable<ServerResponse<User>> {
    var url = `${this.baseUrl}${environment.user_add}`;
    return this.http.post<ServerResponse<User>>(url, newUser);
  } 

  //get Users list
  retrieveUsers(searchKey?: string, sortKey?: string): Observable<ServerResponse<User[]>> {
    let params = new HttpParams();
    
    if (searchKey)
      params = params.append('searchKey', searchKey);
    if (sortKey)
      params = params.append('sortKey', sortKey);

    var Url = `${this.baseUrl}${environment.user_get}`;
    return this.http .get<ServerResponse<User[]>>(Url, { params: params });
  }

  // Api call to get a single user data based on the userId
  getUserByID(userId: number): Observable<ServerResponse<User>> {
    var Url= `${this.baseUrl}${environment.user_get}/${userId}`;
    return this.http.get<ServerResponse<User>>(Url);
  }

  //Api call to Update the user data 
  updateUser(UserData: User): Observable<ServerResponse<User>> {
    var Url = `${this.baseUrl}${environment.user_edit}/${UserData.UserID}`
    return this.http.post<ServerResponse<User>>(Url, UserData);
  }  
        
  //Api call to Delete the user data 
  deleteUser(userId: number): Observable<ServerResponse<User>> {
    var uri = `${this.baseUrl}${environment.user_delete}/${userId}`
    return this.http.get<ServerResponse<User>>(uri);
  }  

    
}
