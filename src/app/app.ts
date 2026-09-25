import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Layout} from './shared/presentation/components/layout/layout';
import {BookCatalogue} from './book-assets/presentation/views/book-catalogue/book-catalogue';

/**
 * Root component of Open Library Explorer.
 *
 * @remarks
 * Composes the shared layout shell and projects the Book Catalogue view into it.
 * Routing is out of scope, so the catalogue is the only view of the application.
 *
 * @author Darnell Apellido
 */
@Component({
  selector: 'app-root',
  imports: [Layout, BookCatalogue],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
}
