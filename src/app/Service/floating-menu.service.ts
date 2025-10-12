import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FloatingMenuService {

  public floatingMenuSubject = new BehaviorSubject<boolean>(false);
  floatingMenu$ = this.floatingMenuSubject.asObservable()

  enableFloatingMenu() {
    this.floatingMenuSubject.next(true);
  }

  disableFloatingMenu() {
    this.floatingMenuSubject.next(false);
  }
}
