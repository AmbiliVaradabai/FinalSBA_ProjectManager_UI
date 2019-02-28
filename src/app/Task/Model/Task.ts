import { User } from "../../User/Model/usermodel";
import { Project } from "../../Project/Model/project";

export interface Task {
    TaskID?     : number,
    Task        : string,
    Priority    : number,    
    StartDate?  : string,
    EndDate?    : string,
    User?       : User,
    Parent?     : ParentTask,
    Project?    : Project
}

export interface ParentTask {
    ParentTaskID?   : number,
    ParentTask      : string,
    ProjectID?      : number
}