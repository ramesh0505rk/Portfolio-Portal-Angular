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

    const targetX = this.floatingMenuOpen ? `${this.svgWidth / 1.6}px` : `${this.svgWidth}px`;
    const targetPath = this.floatingMenuOpen ? this.svgPathEnd : this.svgPath;

    // enable/disable your service right away
    if (this.floatingMenuOpen) this.floatingMenuService.enableFloatingMenu();
    else this.floatingMenuService.disableFloatingMenu();

    // stop any running tweens on these targets so new tweens start immediately
    gsap.killTweensOf('.floating-menu-container');
    gsap.killTweensOf('#menu-path');

    // animate container — overwrite ensures it replaces any in-flight tweens
    gsap.to('.floating-menu-container', {
      x: targetX,
      duration: 0.9,
      ease: 'power3.inOut',
      overwrite: true
    });

    // animate SVG path; delay kept to match original, but will not queue behind previous tweens
    gsap.to('#menu-path', {
      attr: { d: targetPath },
      duration: 0.3,
      delay: 0.3,
      ease: 'power3.inOut',
      overwrite: true
    });
  }
}
