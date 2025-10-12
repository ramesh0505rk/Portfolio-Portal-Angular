import { AfterViewChecked, AfterViewInit, Component, DoCheck, Host, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { PageLoaderService } from './Service/page-loader.service';
import { CommonModule } from '@angular/common';
import { TopBarTestComponent } from './top-bar-test/top-bar-test.component';
import gsap from 'gsap';
import { FloatingMenuService } from './Service/floating-menu.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PageLoaderComponent, CommonModule, TopBarTestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  svgWidth: number = 0;
  svgHeight: number = 0;
  svgPath: string = '';
  svgPathEnd: string = '';

  floatingMenuOpen: boolean = false;

  timeline = gsap.timeline();

  constructor(public loaderService: PageLoaderService, public floatingMenuService: FloatingMenuService) { }

  ngOnInit(): void {
    this.svgWidth = window.innerWidth;
    this.svgHeight = window.innerHeight;

    this.svgPath = `
      M50,0
      Q-50,${this.svgHeight / 2} 50,${this.svgHeight}
      L${this.svgWidth},${this.svgHeight}
      L${this.svgWidth},0
      Z
    `;

    this.svgPathEnd = `
      M0,0
      Q-50,${this.svgHeight / 2} 0,${this.svgHeight}
      L${this.svgWidth},${this.svgHeight}
      L${this.svgWidth},0
      Z
    `;

  }

  ngAfterViewInit(): void {
  }

  toggleMenu() {
    this.floatingMenuOpen = !this.floatingMenuOpen;
    if (this.floatingMenuOpen) {
      this.floatingMenuService.enableFloatingMenu();
      this.timeline
        .to('.menu-container', {
          x: `${this.svgWidth / 1.6}px`,
          duration: 0.9,
          ease: 'power3.inOut'
        })
        .to('#menu-path', {
          attr: { d: this.svgPathEnd },
          duration: 0.3,
          delay: 0.3,
          ease: 'power3.inOut'
        }, "<"); // Runs at same time as previous
    } else {
      this.floatingMenuService.disableFloatingMenu();

      this.timeline
        .to('.menu-container', {
          x: `${this.svgWidth}px`,
          duration: 0.9,
          ease: 'power3.inOut'
        })
        .to('#menu-path', {
          attr: { d: this.svgPath },
          duration: 0.3,
          delay: 0.3,
          ease: 'power3.inOut'
        }, "<"); // Runs at same time as previous
    }
  }
}
