import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {TranslatePipe} from '@ngx-translate/core';
import {BookCategory} from '../../../domain/model/book-category';

/**
 * Presentation component that lets the user choose a book category.
 *
 * @remarks
 * Renders one toggle button per category (Software Engineering and Artificial
 * Intelligence) and notifies the parent view when the selection changes.
 *
 * @author Darnell Apellido
 */
@Component({
  selector: 'app-book-category-selector',
  imports: [MatButtonToggleGroup, MatButtonToggle, TranslatePipe],
  templateUrl: './book-category-selector.html',
  styleUrl: './book-category-selector.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCategorySelector {
  /** Categories that can be selected. */
  readonly categories = input.required<ReadonlyArray<BookCategory>>();
  /** Category currently selected. */
  readonly selectedCategory = input.required<BookCategory>();
  /** Event emitted when the user selects a category. */
  readonly categorySelected = output<BookCategory>();

  /**
   * Emits the category chosen in the toggle group.
   *
   * @param event - Change event emitted by the toggle group.
   */
  protected onSelectionChange(event: MatButtonToggleChange): void {
    this.categorySelected.emit(BookCategory.fromId(event.value));
  }
}
