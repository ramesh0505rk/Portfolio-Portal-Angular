import { AfterViewInit, Component, NgZone } from '@angular/core';
import gsap from 'gsap';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {

  constructor(private ngZone: NgZone) { }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    this.ngZone.runOutsideAngular(() => {

      gsap.timeline({
        scrollTrigger: {
          trigger: '.animated-element',
          start: 'start center',
          end: 'bottom center',
          scrub: false,
          markers: true,
          toggleActions: 'play reverse play reverse',
        },
      }).to('.animated-element', {
        x: 750,
        rotation: 360,
        scale: 2.5,
      });

      const lenis = new Lenis();
      lenis.on('scroll', (e: any) => {
        console.log('Lenis Scroll:', e);
      });

      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);
    });

  }
}
