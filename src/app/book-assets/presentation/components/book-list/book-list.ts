import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Book} from '../../../domain/model/book.entity';
import {BookCard} from '../book-card/book-card';

/**
 * Presentation component that renders a responsive grid of book cards.
 *
 * @remarks
 * Shows three cards per row on large screens, two on medium screens and one on small
 * screens. The list keeps its semantics for assistive technologies.
 *
 * @author Darnell Apellido
 */
@Component({
  selector: 'app-book-list',
  imports: [BookCard],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookList {
  /** Books to display. */
  readonly books = input.required<ReadonlyArray<Book>>();
  /** Accessible name of the list. */
  readonly listLabel = input<string>('');

  /** Number of covers loaded immediately: the first row of the grid. */
  protected readonly eagerCoverCount = 3;
}
