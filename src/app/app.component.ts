import { Component } from '@angular/core';
import { faImages, faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'catalogofrontend';
  faImages = faImages;
  faUpload = faUpload;
}
