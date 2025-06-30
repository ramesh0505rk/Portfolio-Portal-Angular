import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, input, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import gsap from 'gsap';
import { PageLoaderService } from '../Service/page-loader.service';

@Component({
  selector: 'app-page-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-loader.component.html',
  styleUrl: './page-loader.component.scss'
})
export class PageLoaderComponent implements OnInit, AfterViewInit {
  @ViewChild('introContainer') pageLoader!: PageLoaderComponent;

  @Input() pageTitle: string = '';
  @Input() contentClassName: string = '';
  @Input() x: number = 0;
  @Input() y: number = 0;

  svgHeight = 0
  svgWidth = 0
  svgPath: string = '';

  timeline = gsap.timeline();

  constructor(private router: Router, private loaderService: PageLoaderService) { }

  ngOnInit(): void {
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

    this.timeline.to('.intro-container', {
      y: `${this.svgHeight}px`,   // starts below viewport
      duration: 0,         // no animation yet, just sets position
    });
  }

  playEnterAnimation(onComplete: () => void) {
    this.timeline.to('.intro-container', {
      duration: 0.8,
      y: `-${200}px`,
      ease: 'power3.inOut',
      delay: 0.2,
      onComplete
    })
  }

  playExitAnimation(onComplete: () => void): void {
    this.timeline.to('.intro-container', {
      duration: 0.8,
      y: `-${200}px`,
      ease: 'power3.inOut',
      delay: 0.2,
    })
      .to('.intro-container', {
        duration: 0.8,
        y: `-${this.svgHeight}px`,
        ease: 'power3.inOut',
        delay: 0.2,
        onComplete
      });
  }

}
