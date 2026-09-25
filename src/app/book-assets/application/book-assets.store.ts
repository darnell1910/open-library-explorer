import {computed, inject, Service, signal} from '@angular/core';
import {Book} from '../domain/model/book.entity';
import {BookCategory, BookCategoryId} from '../domain/model/book-category';
import {BooksApi} from '../infrastructure/books-api';
import {BookLoadStatus} from './book-load-status';

/**
 * Application service that manages the state of the Book Assets bounded context.
 *
 * @remarks
 * Implements the State Management pattern with Angular signals. It keeps the selected
 * category, a cache of books per category and the loading status of each category, and
 * exposes read-only projections consumed by the presentation layer. Books of a category
 * are requested only once; a failed request can be retried.
 *
 * @author Darnell Apellido
 */
@Service()
export class BookAssetsStore {
  /** Gateway to the book provider. */
  private readonly booksApi = inject(BooksApi);

  /** Currently selected category. */
  private readonly selectedCategorySignal = signal<BookCategory>(BookCategory.SOFTWARE_ENGINEERING);
  /** Cache of books indexed by category identifier. */
  private readonly booksByCategorySignal = signal<Partial<Record<BookCategoryId, Book[]>>>({});
  /** Loading status indexed by category identifier. */
  private readonly loadStatusByCategorySignal = signal<Partial<Record<BookCategoryId, BookLoadStatus>>>({});

  /** Categories available in the catalogue. */
  readonly categories = BookCategory.values();
  /** Read-only projection of the selected category. */
  readonly selectedCategory = this.selectedCategorySignal.asReadonly();
  /** Books of the selected category. */
  readonly selectedCategoryBooks = computed<Book[]>(
    () => this.booksByCategorySignal()[this.selectedCategorySignal().id] ?? []
  );
  /** Loading status of the selected category. */
  readonly selectedCategoryLoadStatus = computed<BookLoadStatus>(
    () => this.loadStatusByCategorySignal()[this.selectedCategorySignal().id] ?? 'idle'
  );

  /**
   * Selects a category and loads its books when they are not cached yet.
   *
   * @param category - Category chosen by the user.
   */
  selectCategory(category: BookCategory): void {
    this.selectedCategorySignal.set(category);
    this.loadSelectedCategoryBooks();
  }

  /**
   * Loads the books of the selected category.
   *
   * @remarks
   * Does nothing when the books are already loaded or a request is in progress, so it is
   * also used to retry after a failure.
   */
  loadSelectedCategoryBooks(): void {
    const category = this.selectedCategorySignal();
    const loadStatus = this.loadStatusByCategorySignal()[category.id] ?? 'idle';
    if (loadStatus === 'loading' || loadStatus === 'loaded') {
      return;
    }
    this.updateLoadStatus(category.id, 'loading');
    this.booksApi.getBooksByCategory(category).subscribe({
      next: books => {
        this.booksByCategorySignal.update(booksByCategory => ({...booksByCategory, [category.id]: books}));
        this.updateLoadStatus(category.id, 'loaded');
      },
      error: error => {
        console.error(`Books of category ${category.id} could not be loaded`, error);
        this.updateLoadStatus(category.id, 'failed');
      }
    });
  }

  /**
   * Updates the loading status of a category.
   *
   * @param categoryId - Identifier of the category.
   * @param loadStatus - New loading status.
   */
  private updateLoadStatus(categoryId: BookCategoryId, loadStatus: BookLoadStatus): void {
    this.loadStatusByCategorySignal.update(statusByCategory => ({...statusByCategory, [categoryId]: loadStatus}));
  }
}
