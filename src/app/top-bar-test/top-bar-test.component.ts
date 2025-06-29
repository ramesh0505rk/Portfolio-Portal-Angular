import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import gsap from 'gsap';
import { PageLoaderComponent } from '../page-loader/page-loader.component';

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

  showIntro = true;
  svgWidth = 0;
  svgHeight = 0;
  height = 0;
  pageTitle: string = 'about';

  timeline = gsap.timeline();


  textItems = [
    { text: 'works' },
    { text: 'about' },
    { text: 'contact' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.svgWidth = window.innerWidth;
    this.height = window.innerHeight;
    this.svgHeight = this.height + 400;
  }

  ngAfterViewInit(): void {
    this.textElements.forEach((elementRef) => {
      const el = elementRef.nativeElement as HTMLElement;
    })

    this.textElements.forEach((elementRef) => {
      const el = elementRef.nativeElement as HTMLElement;
      el.addEventListener('mouseenter', () => this.scramble(el));
    });

    this.timeline.to('.intro-container', {
      y: `${this.svgHeight}px`,   // starts below viewport
      duration: 0,         // no animation yet, just sets position
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
    if (item.text === 'works') {
      this.pageTitle = item.text;

      this.timeline.to('.intro-container', {
        duration: 0.8,
        y: `-${100}px`,
        ease: 'power3.inOut',
        delay: 0.2,
      })
        .to('.intro-container', {
          duration: 0.8,
          y: `-${this.svgHeight}px`,
          ease: 'power3.inOut',
          delay: 0.2,
          onComplete: () => {
            this.showIntro = true;
            this.router.navigate(['/works']);
          }
        });
    } else if (item.text === 'about') {
      this.router.navigate(['/about']);
    } else if (item.text === 'contact') {
      this.router.navigate(['/contact']);
    }
  }
}
