import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ServerResponse } from '../../Common/Model/commonresponse';
import { Observable,of, from } from 'rxjs';
import { Task } from '../Model/Task';

export interface ITaskService {
  getTaskById(taskId: number): Observable<ServerResponse<Task>>;
  retrieveTasks(projectId?: number, sortKey?:string): Observable<ServerResponse<Task[]>>;
  createTask(newUser: Task): Observable<ServerResponse<Task>>;
  editTask(updateUser: Task): Observable<ServerResponse<Task>>;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) { }
  baseUrl = environment.baseUrl;

  
  createTask(newTask: Task): Observable<ServerResponse<Task>> {
    var url = `${this.baseUrl}${environment.task_add}`;
    return this.http.post<ServerResponse<Task>>(url, newTask);
  }

  editTask(updateTask: Task): Observable<ServerResponse<Task>>
  {
    var url = `${this.baseUrl}${environment.task_edit}`;
    return this.http.post<ServerResponse<Task>>(url, updateTask);
  }

  getTaskById(taskId: number): Observable<ServerResponse<Task>> {
    var url= `${this.baseUrl}${environment.task_get}/${taskId}`;
    return this.http.get<ServerResponse<Task>>(url);
  }

  retrieveTasks(ProjectId?: number, sortKey?:string): Observable<ServerResponse<Task[]>> {
    let params = new HttpParams();
    if (ProjectId)
      params = params.append('ProjectId', ProjectId.toString());
    if (sortKey)
      params = params.append('sortKey', sortKey);

    var url = `${this.baseUrl}${environment.task_get}`;
    return this.http.get<ServerResponse<Task[]>>(url, { params: params });
  }

  endTask(taskId: number): Observable<ServerResponse<Task>>
  {
    var url = `${this.baseUrl}${environment.task_delete}/${taskId}`;
    return this.http.get<ServerResponse<Task>>(url);
  }  
}
