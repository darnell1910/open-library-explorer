import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressBar} from '@angular/material/progress-bar';
import {TranslatePipe} from '@ngx-translate/core';
import {BookAssetsStore} from '../../../application/book-assets.store';
import {BookCategory} from '../../../domain/model/book-category';
import {BookCategorySelector} from '../../components/book-category-selector/book-category-selector';
import {BookList} from '../../components/book-list/book-list';

/**
 * Main view that presents the Book Catalogue.
 *
 * @remarks
 * Container component that connects the presentation components with the
 * `BookAssetsStore`. It shows the category selector and, depending on the loading
 * status of the selected category, a progress indicator, an error message with a
 * retry action, an empty message or the list of book cards.
 *
 * @author Darnell Apellido
 */
@Component({
  selector: 'app-book-catalogue',
  imports: [BookCategorySelector, BookList, MatProgressBar, MatButton, MatIcon, TranslatePipe],
  templateUrl: './book-catalogue.html',
  styleUrl: './book-catalogue.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCatalogue implements OnInit {
  /** State of the Book Assets bounded context. */
  private readonly store = inject(BookAssetsStore);

  /** Categories available in the catalogue. */
  protected readonly categories = this.store.categories;
  /** Category currently selected. */
  protected readonly selectedCategory = this.store.selectedCategory;
  /** Books of the selected category. */
  protected readonly books = this.store.selectedCategoryBooks;
  /** Loading status of the selected category. */
  protected readonly loadStatus = this.store.selectedCategoryLoadStatus;

  /** Loads the books of the default category when the view is initialized. */
  ngOnInit(): void {
    this.store.loadSelectedCategoryBooks();
  }

  /**
   * Handles the selection of a category.
   *
   * @param category - Category chosen by the user.
   */
  protected onCategorySelected(category: BookCategory): void {
    this.store.selectCategory(category);
  }

  /** Retries loading the books of the selected category after a failure. */
  protected retryLoading(): void {
    this.store.loadSelectedCategoryBooks();
  }
}
