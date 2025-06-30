import { Component } from '@angular/core';
import { TopBarTestComponent } from '../top-bar-test/top-bar-test.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TopBarTestComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
