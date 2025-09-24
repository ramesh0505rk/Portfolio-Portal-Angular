import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageLoaderService {

  public showLoaderSubject = new BehaviorSubject<boolean>(false);
  showLoader$ = this.showLoaderSubject.asObservable()

  private pageTitleSubject = new BehaviorSubject<string>('');
  pageTitle$ = this.pageTitleSubject.asObservable()

  triggerEntryAnimation$ = new BehaviorSubject<boolean>(false)

  startLoader(title: string) {
    // Prevent double triggering if already loading
    if (this.showLoaderSubject.getValue()) return;
    this.showLoaderSubject.next(true);
    this.pageTitleSubject.next(title);
  }

  stopLoader() {
    this.showLoaderSubject.next(false);
    this.pageTitleSubject.next('');
  }

}
