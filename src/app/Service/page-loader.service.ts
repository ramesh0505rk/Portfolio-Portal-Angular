import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageLoaderService {
  private transitionInProgress = false;

  isTransitionInProgress() {
    return this.transitionInProgress;
  }
  setTransitionInProgress(val: boolean) {
    this.transitionInProgress = val;
  }

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
