import { Component } from '@angular/core';
import { TopBarTestComponent } from '../top-bar-test/top-bar-test.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TopBarTestComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
