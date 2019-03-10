import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ServerResponse } from '../../Common/Model/commonresponse';
import { Observable,of, from } from 'rxjs';
import { Project } from '../Model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  //Api call to create new project
  createProject(newProject: Project): Observable<ServerResponse<Project>> {
    var uri = `${this.baseUrl}${environment.project_add}`;
    return this.http.post<ServerResponse<Project>>(uri, newProject);
  }

  //get projects list
  retrieveProjects(searchKey?: string, sortKey?: string): Observable<ServerResponse<Project[]>> {
    let params = new HttpParams();  
    if (searchKey)
      params = params.append('searchKey', searchKey);
    if (sortKey)
      params = params.append('sortKey', sortKey);

    var Url = `${this.baseUrl}${environment.project_get}`;
    return this.http .get<ServerResponse<Project[]>>(Url, { params: params });
  }

  // Api call to get a single project data based on the userId
  getProjectByID(projectId: number): Observable<ServerResponse<Project>> {
    var Url= `${this.baseUrl}${environment.project_get}/${projectId}`;
    return this.http.get<ServerResponse<Project>>(Url);
  }

  //Api call to Update the Project data 
  updateProject(ProjectData: Project): Observable<ServerResponse<Project>> {
    var Url = `${this.baseUrl}${environment.project_edit}/${ProjectData.ProjectID}`
    return this.http.post<ServerResponse<Project>>(Url, ProjectData);
  }  
        
  //Api call to Delete the user data 
  suspendProject(ProjectID: number): Observable<ServerResponse<Project>> {
    var uri = `${this.baseUrl}${environment.project_delete}/${ProjectID}`
    return this.http.get<ServerResponse<Project>>(uri);
  }  


}
