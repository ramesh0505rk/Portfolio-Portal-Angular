import { AfterViewInit, Component, DoCheck, Host, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { PageLoaderService } from './Service/page-loader.service';
import { CommonModule } from '@angular/common';
import { TopBarTestComponent } from './top-bar-test/top-bar-test.component';
import gsap from 'gsap';
import { FloatingMenuService } from './Service/floating-menu.service';
import { ScrollBarService } from './Service/scroll-bar.service';
import { distinctUntilChanged } from 'rxjs';

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

  menuContentWidth: number = 0
  menuContentHeight: number = 100

  floatingMenuOpen: boolean = false;
  showFloatingMenu: boolean = false;
  floatingMenuAnimationClass: string = '';

  timeline = gsap.timeline();

  private hideTimeout: any = null;

  constructor(public loaderService: PageLoaderService, public floatingMenuService: FloatingMenuService, private router: Router, private scrollBarService: ScrollBarService) { }

  ngOnInit(): void {
    this.calculateSvgPaths();

    this.scrollBarService.scrollLimitReachedForFloatingMenu$.pipe(distinctUntilChanged()).subscribe(reached => {
      reached ? this.showMenu() : this.hideMenu();
    })
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.calculateSvgPaths();
  }

  calculateSvgPaths() {
    this.svgWidth = window.innerWidth;
    this.svgHeight = window.innerHeight;

    this.menuContentWidth = (this.svgWidth - this.svgWidth / 1.6);

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

  showMenu() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    this.showFloatingMenu = true;
    this.floatingMenuAnimationClass = 'menu-enter'
  }

  hideMenu() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    this.floatingMenuAnimationClass = 'menu-leave'

    this.hideTimeout = setTimeout(() => {
      this.showFloatingMenu = false;
      this.floatingMenuAnimationClass = '';
    }, 500);
  }

  ngAfterViewInit(): void {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollBarService.setScrollLimitReachedForFloatingMenu(window.scrollY)
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

    // animate menu items with a stagger so they appear together but offset in time.
    // kill any item tweens first so rapid clicks react immediately.
    gsap.killTweensOf('.menus-tab div');
    gsap.to('.menus-tab div', {
      x: this.floatingMenuOpen ? 0 : 50,        // open => to 0, close => back to 300px
      duration: 0.5,
      // when opening keep a slight delay to match path/container animation;
      // when closing start sooner so reversal feels responsive
      delay: this.floatingMenuOpen ? 0.3 : 0.2,
      ease: 'power3.inOut',
      stagger: {
        each: 0.01,
        from: this.floatingMenuOpen ? 'start' : 'end' // opening: left-to-right; closing: right-to-left
      },
      overwrite: true
    });
  }

  onMenuItemClick(text: string): void {
    this.toggleMenu();
    // Prevent starting loader if already loading
    if (this.loaderService.showLoaderSubject.getValue()) return;
    if (text === 'works') {
      setTimeout(() => {
        this.loaderService.startLoader('works');
      }, 300);
    } else if (text === 'about') {
      setTimeout(() => {
        this.loaderService.startLoader('about');
      }, 300);
    } else if (text === 'contact') {
      setTimeout(() => {
        this.loaderService.startLoader('contact');
      }, 300);
    }
  }

  onClickLogo() {
    this.toggleMenu();
    this.router.navigate(['home'])
  }
}
