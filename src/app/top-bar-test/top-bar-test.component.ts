import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import gsap from 'gsap';
import { PageLoaderComponent } from '../page-loader/page-loader.component';
import { PageLoaderService } from '../Service/page-loader.service';

declare const ScrambleTextPlugin: any; // ← this tells TypeScript to ignore its type
gsap.registerPlugin(ScrambleTextPlugin);


@Component({
  selector: 'app-top-bar-test',
  standalone: true,
  imports: [CommonModule, PageLoaderComponent],
  templateUrl: './top-bar-test.component.html',
  styleUrl: './top-bar-test.component.scss'
})
export class TopBarTestComponent implements AfterViewInit, OnInit {
  @ViewChildren('textElement') textElements!: QueryList<ElementRef>

  pageTitle: string = 'about';

  timeline = gsap.timeline();


  textItems = [
    { text: 'works' },
    { text: 'about' },
    { text: 'contact' }
  ];

  constructor(private router: Router, private loaderService: PageLoaderService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.textElements.forEach((elementRef) => {
      const el = elementRef.nativeElement as HTMLElement;
    })

    this.textElements.forEach((elementRef) => {
      const el = elementRef.nativeElement as HTMLElement;
      el.addEventListener('mouseenter', () => this.scramble(el));
    });
  }

  scramble(el: HTMLElement): void {
    gsap.to(el, {
      duration: 1,
      scrambleText: {
        text: el.getAttribute('data-text') || '',
        chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?/|{}[]~',
        revealDelay: 0.1,   // when to start revealing original text
        speed: 0.3, // speed of the scrambling
      },
      ease: 'none'
    });
  }

  trackByIndex(index: number): number {
    return index;
  }

  onMenuItemClick(item: { text: string }): void {
    // Prevent starting loader if already loading or transition in progress
    if (this.loaderService.showLoaderSubject.getValue() || this.loaderService.isTransitionInProgress()) return;
    if (item.text === 'works') {
      this.loaderService.startLoader('works');
    } else if (item.text === 'about') {
      this.loaderService.startLoader('about');
    } else if (item.text === 'contact') {
      this.loaderService.startLoader('contact');
    }
  }

  onClickLogo() {
    this.router.navigate(['home'])
  }
}
