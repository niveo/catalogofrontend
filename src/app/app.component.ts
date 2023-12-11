import { Component } from '@angular/core';
import { faImages, faUpload, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'catalogofrontend';

  menus = [
    {
      link: '/',
      icon: faHome,
      descricao: 'Home',
    },
    {
      link: 'catalogo',
      icon: faImages,
      descricao: 'Catalogo',
    },
    {
      link: 'catalogo/importar',
      icon: faUpload,
      descricao: 'Importar Catalogo',
    },
  ];
}
