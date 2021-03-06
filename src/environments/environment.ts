// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  //Base Api Url 
  baseUrl:"http://localhost:3000",
  
  //End Points
  user_get        :"/users",
  user_add        :"/users/add",
  user_edit       :"/users/edit",
  user_delete     :"/users/delete",
  project_add     :"/projects/add",
  project_get     :"/projects",
  project_edit    :"/projects/edit",
  project_delete  :"/projects/delete",
  parentTask_get  :"/parenttasks",
  parentTask_add  :"/parenttasks/add" ,
  task_get        :"/tasks",
  task_add        :"/tasks/add",
  task_edit       :"/tasks/edit",
  task_delete     :"/tasks/delete"
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
