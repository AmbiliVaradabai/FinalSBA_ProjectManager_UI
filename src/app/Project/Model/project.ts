import { Task } from "../../Task/Model/Task";

export interface Project {
    ProjectID?: number,
    Project: string,
    Priority: number,
    StartDate?: Date,
    EndDate?: Date,
    ManagerID?:number,    
    Tasks?: Task[]
}