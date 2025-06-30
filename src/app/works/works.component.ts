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

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }
}
