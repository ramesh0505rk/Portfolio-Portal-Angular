import { AfterViewChecked, Component, DoCheck, HostListener, ViewChild } from '@angular/core';
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
  private scrollTimeout: any;
  title = 'ClientApp';

  constructor(public loaderService: PageLoaderService) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    document.body.classList.add('show-scrollbar');

    // Hide scrollbar after 1s of idle
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      document.body.classList.remove('show-scrollbar');
    }, 1000);
  }
}
