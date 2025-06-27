import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import gsap from 'gsap';

declare const SplitText: any; // ← this tells TypeScript to ignore its type

gsap.registerPlugin(SplitText);

interface TextAnimation {
  timeline: gsap.core.Timeline;
  originalSplit: SplitText;
  cloneSplit: SplitText;
}

@Component({
  selector: 'app-tob-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tob-bar.component.html',
  styleUrl: './tob-bar.component.scss'
})
export class TobBarComponent implements OnInit, AfterContentInit {
  @ViewChildren('textElement') textElements!: QueryList<ElementRef>

  textItems = [
    { text: 'Work' },
    { text: 'About' },
    { text: 'Contact' }
  ];

  private animations: Map<HTMLElement, TextAnimation> = new Map();

  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.initializeAnimations();
    }, 100); // Delay to ensure DOM is ready
  }

  private initializeAnimations(): void {
    this.textElements.forEach((elementRef) => {
      const element = elementRef.nativeElement as HTMLElement;
      const originalText = element.textContent || '';

      // Create structure for animation
      element.innerHTML = `
        <div class="text-original">${originalText}</div>
        <div class="text-clone">${originalText}</div>
      `;

      // Split text for both original and clone
      const originalSplit = new SplitText(element.querySelector('.text-original'), {
        type: "chars",
        charsClass: "char"
      });

      const cloneSplit = new SplitText(element.querySelector('.text-clone'), {
        type: "chars",
        charsClass: "char"
      });

      // Set initial positions
      gsap.set(cloneSplit.chars, { y: "0%" });

      // Create timeline for hover animation
      const tl = gsap.timeline({ paused: true });

      tl.to(originalSplit.chars, {
        y: "-100%",
        duration: 0.4,
        ease: "power3.inOut",
        stagger: 0.03
      })
        .to(cloneSplit.chars, {
          y: "-100%",
          duration: 0.4,
          ease: "power3.inOut",
          stagger: 0.03
        }, 0); // Start at the same time as original

      // Store animation data
      this.animations.set(element, {
        timeline: tl,
        originalSplit,
        cloneSplit
      });
    });
  }


  onMouseEnter(event: Event): void {
    const element = event.target as HTMLElement;
    const animation = this.animations.get(element);
    if (animation) {
      animation.timeline.play();
    }
  }

  onMouseLeave(event: Event): void {
    const element = event.target as HTMLElement;
    const animation = this.animations.get(element);
    if (animation) {
      animation.timeline.reverse();
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

}
