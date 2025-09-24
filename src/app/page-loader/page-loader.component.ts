import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, input, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import gsap from 'gsap';
import { PageLoaderService } from '../Service/page-loader.service';

declare const ScrambleTextPlugin: any
gsap.registerPlugin(ScrambleTextPlugin)

@Component({
  selector: 'app-page-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-loader.component.html',
  styleUrl: './page-loader.component.scss'
})
export class PageLoaderComponent implements OnInit, AfterViewInit {
  @ViewChild('introContainer') pageLoader!: PageLoaderComponent;
  @ViewChild('textElement') textElement!: ElementRef
  element!: HTMLElement

  @Input() pageTitle: string | null = '';
  @Input() contentClassName: string = '';
  @Input() x: number = 0;
  @Input() y: number = 0;

  svgHeight = 0
  svgWidth = 0
  svgPath: string = '';

  timeline = gsap.timeline();

  constructor(private router: Router, private loaderService: PageLoaderService) {

  }

  ngOnInit(): void {
    console.log('Entered', this.pageTitle)
    this.svgWidth = window.innerWidth;
    const height = window.innerHeight;
    this.svgHeight = height + 400;

    this.svgPath = `
      M0,200
      Q${this.svgWidth / 2},0 ${this.svgWidth},200
      L${this.svgWidth},${height + 200}
      Q${this.svgWidth / 2},${height + 400} 0,${height + 200}
      Z
    `;
  }

  ngAfterViewInit(): void {

    this.element = this.textElement.nativeElement

    this.timeline.to('.intro-container', {
      y: `${this.svgHeight}px`,
      duration: 0,
      onComplete: () => {
        this.playEnterAnimation(() => {
          // this.playScrambleAnimation(() => {
            // Navigate first, then play exit animation and stop loader
            this.router.navigate([`/${this.pageTitle}`]).then(() => {
              this.playExitAnimation(() => {
                this.loaderService.stopLoader();
              });
            });
          // });
        });
      }
    });
  }

  playEnterAnimation(onComplete: () => void) {
    this.timeline.to('.intro-container', {
      duration: 0.8,
      y: `-${200}px`,
      ease: 'power3.inOut',
      delay: -0.2,
      onComplete
    })
  }

  playScrambleAnimation(onComplete: () => void) {
    gsap.to(this.element, {
      duration: 1,
      scrambleText: {
        text: this.element.innerHTML || '',
        chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?/|{}[]~',
        revealDelay: 0.1,   // when to start revealing original text
        speed: 0.3, // speed of the scrambling
      },
      ease: 'none',
      onComplete
    });
  }

  playExitAnimation(onComplete: () => void): void {
    this.timeline.to('.intro-container', {
      duration: 0.8,
      y: `-${this.svgHeight}px`,
      ease: 'power3.inOut',
      delay: 0.2,
      onComplete
    });
  }
}
