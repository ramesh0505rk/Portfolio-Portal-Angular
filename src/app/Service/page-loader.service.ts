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
    this.showLoaderSubject.next(true);
    this.pageTitleSubject.next(title);
  }

  stopLoader() {
    this.showLoaderSubject.next(false);
  }

}
