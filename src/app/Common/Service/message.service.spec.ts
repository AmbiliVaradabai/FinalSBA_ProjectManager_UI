import { TestBed, inject } from '@angular/core/testing';
import { Router, NavigationStart } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ToastrModule,ToastrService } from 'ngx-toastr';
import { MessageService } from './message.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), BrowserAnimationsModule],
       providers: [MessageService,ToastrService]
    });
    service = TestBed.get(MessageService);
  });

  it('should be created', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));

  it('should run #success()', ()=> {
   let  result = service.success("Added Successfully","Success",3000)

    //expect(service.success("Added Successfully","Success",3000)).toBeTruthy();
  });

  it('should run #error()', ()=> {
    let  result = service.error("Error","Error",3000)
 
     //expect(service.success("Added Successfully","Success",3000)).toBeTruthy();
   });
});
