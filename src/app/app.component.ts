import { AfterViewChecked, Component, DoCheck, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { PageLoaderService } from './Service/page-loader.service';
import { CommonModule } from '@angular/common';
import { TopBarTestComponent } from './top-bar-test/top-bar-test.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PageLoaderComponent, CommonModule, TopBarTestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'ClientApp';
  constructor(public loaderService: PageLoaderService, private router: Router) {
    // this.router.events
    //   .pipe(filter(e => e instanceof NavigationStart))
    //   .subscribe((event: any) => {
    //     const url = event.urlAfterRedirects || event.url;
    //     const page = url.split('/')[1] || 'home';
    //     // if (!this.loaderService.showLoaderSubject.getValue()) {
    //       console.log('current loader ', loaderService.showLoader$)
    //       this.loaderService.startLoader(page);
    //     // }
    //   })
  }
}
