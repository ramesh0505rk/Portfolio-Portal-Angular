import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollBarService {
  private scrollLimitReachedForFloatingMenu: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  scrollLimitReachedForFloatingMenu$ = this.scrollLimitReachedForFloatingMenu.asObservable();
  
  constructor() { } 
}
