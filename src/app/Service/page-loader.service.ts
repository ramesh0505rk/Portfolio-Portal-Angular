import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PageLoaderComponent } from '../page-loader/page-loader.component';

@Injectable({
  providedIn: 'root'
})
export class PageLoaderService {

  showLoader$ = new BehaviorSubject<boolean>(false);
  pageTitle$ = new BehaviorSubject<string>('');

  private loaderComponent!: PageLoaderComponent

  startLoader(title: string) {
    this.showLoader$.next(true);
    this.pageTitle$.next(title);
  }

  stopLoader() {
    this.showLoader$.next(false);
  }
}
