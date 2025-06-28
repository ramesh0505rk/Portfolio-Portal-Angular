import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import gsap from 'gsap';

// declare const SplitText: any; // ← this tells TypeScript to ignore its type
declare const ScrambleTextPlugin: any; // ← this tells TypeScript to ignore its type

// gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrambleTextPlugin);

interface TextAnimation {
  timeline: gsap.core.Timeline;
  originalSplit: SplitText;
  cloneSplit: SplitText;
}


@Component({
  selector: 'app-top-bar-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-bar-test.component.html',
  styleUrl: './top-bar-test.component.scss'
})
export class TopBarTestComponent implements AfterViewInit, OnInit {
  @ViewChildren('textElement') textElements!: QueryList<ElementRef>

  textItems = [
    { text: 'works' },
    { text: 'about' },
    { text: 'contact' }
  ];

  constructor(private router: Router) { }

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
    if (item.text === 'works') {
      this.router.navigate(['/works']);
    } else if (item.text === 'about') {
      this.router.navigate(['/about']);
    } else if (item.text === 'contact') {
      this.router.navigate(['/contact']);
    }
  }
}
