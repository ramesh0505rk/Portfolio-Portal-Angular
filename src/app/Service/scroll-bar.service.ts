import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollBarService {
  private scrollLimitReachedForFloatingMenu: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  scrollLimitReachedForFloatingMenu$ = this.scrollLimitReachedForFloatingMenu.asObservable();

  private scrollLimit: number = 200;

  constructor() { }

  setScrollLimitReachedForFloatingMenu(value: number) {
    console.log('Scroll position:', value);
    this.scrollLimitReachedForFloatingMenu.next(value >= this.scrollLimit);
  }
}
