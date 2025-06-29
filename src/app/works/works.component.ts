import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import gsap from 'gsap';
import { PageLoaderComponent } from '../page-loader/page-loader.component';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [CommonModule, PageLoaderComponent],
  templateUrl: './works.component.html',
  styleUrl: './works.component.scss'
})
export class WorksComponent implements OnInit, AfterViewInit {
  @ViewChild('introContainer') introContainer!: PageLoaderComponent;

  showIntro = true;
  svgPath: string = '';
  svgWidth = 0;
  svgHeight = 0;
  pageTitle: string = 'about';

  ngOnInit(): void {
    this.svgWidth = window.innerWidth;
    const height = window.innerHeight;
    this.svgHeight = height + 400;
  }

  ngAfterViewInit(): void {
    const timeline = gsap.timeline();
    // timeline.to('.intro-container', {
    //   y: `${this.svgHeight}px`,   // starts below viewport
    //   duration: 0,         // no animation yet, just sets position
    // });

    // timeline.to('.intro-container', {
    //   duration: 0.8,
    //   y: `-${100}px`,
    //   ease: 'power3.inOut',
    //   delay: 0.2,
    // })
    //   .to('.intro-container', {
    //     duration: 0.8,
    //     y: `-${this.svgHeight}px`,
    //     ease: 'power3.inOut',
    //     delay: 0.2,
    //     onComplete: () => {
    //       this.showIntro = false;
    //     }
    //   });
  }
}
