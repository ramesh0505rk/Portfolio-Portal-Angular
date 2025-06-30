import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import gsap from 'gsap';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CommonModule } from '@angular/common';
import { TobBarComponent } from '../tob-bar/tob-bar.component';
import { TopBarTestComponent } from '../top-bar-test/top-bar-test.component';
import { PageLoaderComponent } from '../page-loader/page-loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TopBarTestComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnInit {
  showIntro = true;
  svgPath: string = '';
  svgWidth = 0;
  svgHeight = 0;
  pageTitle: string = 'Hello';
  constructor() { }

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

    const helloElement = document.querySelector('.hello-text') as HTMLElement;

    const greetings = [
      'Hello', 'नमस्ते', 'Hola', 'Bonjour', 'こんにちは', 'Ciao', '안녕하세요', 'مرحبا', 'Привет', 'Olá', 'नमस्कार', 'Здраво', 'வணக்கம்'
    ];

    const timeline = gsap.timeline()

    timeline.to(helloElement, {
      duration: 0.5,
      opacity: 0,
      onComplete: () => {
        helloElement.innerHTML = greetings[0];
      }
    })
      .to(helloElement, { duration: 0.3, opacity: 1 })
      .to(helloElement, { duration: 0.3, opacity: 0, delay: 0.2 });

    greetings.slice(1, greetings.length - 1).forEach((word) => {
      timeline.to(helloElement, {
        duration: 0.04,
        opacity: 0,
        onComplete: () => {
          helloElement.innerHTML = word
        }
      })
        .to(helloElement, { duration: 0.04, opacity: 1 })
        .to(helloElement, { duration: 0.04, opacity: 0, delay: 0.1 })
    })

    timeline.to(helloElement, {
      duration: 0.04,
      opacity: 0,
      onComplete: () => {
        helloElement.innerHTML = greetings[greetings.length - 1]; // Last greeting
      }
    })
      .to(helloElement, { duration: 0.04, opacity: 1 })
      .to(helloElement, { duration: 0.3, opacity: 0, delay: 0.6 });


    timeline.to('.home-intro-container', {
      duration: 0.8,
      y: `-${this.svgHeight}px`,
      ease: 'power3.inOut',
      onComplete: () => {
        this.showIntro = false;
        // gsap.to('.main-content', { opacity: 1 });
      }
    });
    // gsap.registerPlugin(ScrollTrigger);

    // this.ngZone.runOutsideAngular(() => {

    //   gsap.timeline({
    //     scrollTrigger: {
    //       trigger: '.animated-element',
    //       start: 'start center',
    //       end: 'bottom center',
    //       scrub: 1,
    //       pin: true,
    //       markers: true,
    //       // toggleActions: 'play reverse play reverse',
    //     },
    //   }).to('.animated-element', {
    //     x: 750,
    //     rotation: 360,
    //     scale: 2.5,
    //   });

    //   const lenis = new Lenis();
    //   lenis.on('scroll', (e: any) => {
    //     console.log('Lenis Scroll:', e);
    //   });

    //   const raf = (time: number) => {
    //     lenis.raf(time);
    //     requestAnimationFrame(raf);
    //   };

    //   requestAnimationFrame(raf);
    // });
  }
}
