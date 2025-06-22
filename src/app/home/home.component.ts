import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import gsap from 'gsap';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  showIntro = true;
  constructor(private ngZone: NgZone) { }

  ngAfterViewInit(): void {

    const helloElement = document.querySelector('.hello-text') as HTMLElement;
    const introContainer = document.querySelector('.intro-container') as HTMLElement;
    const mainContent = document.querySelector('.main-content') as HTMLElement;

    const greetings = [
      'Hello', 'नमस्ते', 'Hola', 'Bonjour', 'Ciao', 'こんにちは', '안녕하세요', 'مرحبا', 'Привет', 'Olá', 'שלום', 'नमस्कार', 'Здраво', 'வணக்கம்'
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

    greetings.slice(1).forEach((word) => {
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


    timeline.to(introContainer, {
      duration: 1,
      y: '-100%',
      ease: 'power2.inOut',
      onComplete: () => {
        this.showIntro = false;
        gsap.to(mainContent, { opacity: 1 });
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
