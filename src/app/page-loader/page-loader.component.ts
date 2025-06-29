import { CommonModule } from '@angular/common';
import { Component, input, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-page-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-loader.component.html',
  styleUrl: './page-loader.component.scss'
})
export class PageLoaderComponent implements OnInit {
  @ViewChild('pageName') pageName!: HTMLElement;
  @Input() pageTitle: string = 'Loading...';
  @Input() contentClassName: string = '';
  @Input() x: number = 0;
  @Input() y: number = 0;

  svgHeight = 0
  svgWidth = 0
  svgPath: string = '';

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
}
