import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {Book} from '../../../domain/model/book.entity';

/**
 * Presentation component that renders the card of one book.
 *
 * @remarks
 * Shows the cover at the top, the title as the main heading, the authors, first
 * publication year and number of editions with human-friendly labels, and a
 * "Book Details" action that opens the official book page in a new tab.
 *
 * @author Darnell Apellido
 */
@Component({
  selector: 'app-book-card',
  imports: [
    MatCard,
    MatCardImage,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatIcon,
    TranslatePipe
  ],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCard {
  /** Book to display. */
  readonly book = input.required<Book>();
  /** Whether the cover is loaded immediately, used for the covers visible on first load. */
  readonly eagerCoverLoading = input<boolean>(false);

  /** Translation key of the authors label, singular or plural. */
  protected readonly authorsLabelKey = computed(
    () => this.book().hasMultipleAuthors ? 'book-card.authors' : 'book-card.author'
  );
}
