import { AfterViewChecked, Component, DoCheck, Host, HostListener, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { PageLoaderService } from './Service/page-loader.service';
import { CommonModule } from '@angular/common';
import { TopBarTestComponent } from './top-bar-test/top-bar-test.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PageLoaderComponent, CommonModule, TopBarTestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ClientApp';
  constructor(public loaderService: PageLoaderService) { }
}
