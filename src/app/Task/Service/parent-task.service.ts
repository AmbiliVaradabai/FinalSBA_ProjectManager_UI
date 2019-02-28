import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ServerResponse } from '../../Common/Model/commonresponse';
import { Observable,of, from } from 'rxjs';
import { ParentTask } from '../Model/Task';



export interface IParentTaskService {
  getParentTaskById(parentId: number)       : Observable<ServerResponse<ParentTask>>;
  retrieveParentTasks(searchKey?: string)   : Observable<ServerResponse<ParentTask[]>>;
  createParentTask(newParent: ParentTask)   : Observable<ServerResponse<ParentTask>>;
}


@Injectable({
  providedIn: 'root'
})
export class ParentTaskService implements IParentTaskService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  //create parent task Api Call
  createParentTask(newParentTask: ParentTask): Observable<ServerResponse<ParentTask>> {
    var url = `${this.baseUrl}${environment.parentTask_add}`;
    return this.http.post<ServerResponse<ParentTask>>(url, newParentTask);
  } 

  //get parent task  list
  retrieveParentTasks(searchKey?: string, sortKey?: string): Observable<ServerResponse<ParentTask[]>> {
    let params = new HttpParams();  
    if (searchKey)
      params = params.append('searchKey', searchKey);
    if (sortKey)
      params = params.append('sortKey', sortKey);

    var Url = `${this.baseUrl}${environment.parentTask_get}`;
    return this.http .get<ServerResponse<ParentTask[]>>(Url, { params: params });
  }

  // Api call to get a single patenet task data based on the task id
  getParentTaskById(parentId: number): Observable<ServerResponse<ParentTask>> {
    var Url= `${this.baseUrl}${environment.parentTask_get}/${parentId}`;
    return this.http.get<ServerResponse<ParentTask>>(Url);
  }

}
