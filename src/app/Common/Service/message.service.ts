import { Injectable } from '@angular/core';
//import { Router, NavigationStart } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
  })

export class MessageService {
  private keepAfterRouteChange = false;
  
     constructor(private toastr:ToastrService) {
     }
   
    success(message: string, title:string,timeout:number, keepAfterRouteChange = false) {
         this.keepAfterRouteChange = keepAfterRouteChange;
         this.toastr.success(message,title, {timeOut:timeout});
     }

     error(message: string, title:string,timeout:number, keepAfterRouteChange = false) {
         this.keepAfterRouteChange = keepAfterRouteChange;
         this.toastr.error(message,title, {timeOut:timeout});
    }
  
}


 
