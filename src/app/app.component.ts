import { AfterViewChecked, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { PageLoaderService } from './Service/page-loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PageLoaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewChecked {

  @ViewChild('introContainer') pageLoader!: PageLoaderComponent;

  title = 'ClientApp';

  showIntro = false;
  pageTitle: string = '';

  private isPlayingAnimation = false;

  constructor(private loaderService: PageLoaderService) {
    loaderService.showLoader$.subscribe(show => {
      this.showIntro = show;
    });
    loaderService.pageTitle$.subscribe(title => {
      this.pageTitle = title;
    });
  }

  ngAfterViewChecked(): void {
    if (this.showIntro && this.pageTitle && !this.isPlayingAnimation) {
      this.isPlayingAnimation = true;
      this.pageLoader.playExitAnimation(() => {
        this.loaderService.stopLoader();
        this.isPlayingAnimation = false;
      });
    }
  }

}
