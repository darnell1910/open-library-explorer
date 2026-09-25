import {HttpClient} from '@angular/common/http';
import {inject, Service} from '@angular/core';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Book} from '../domain/model/book.entity';
import {BookCategory} from '../domain/model/book-category';
import {BookAssembler} from './book-assembler';
import {SearchBooksResponse} from './search-books-response';

/**
 * Infrastructure gateway to the Open Library search API.
 *
 * @remarks
 * Sends requests with `HttpClient` and returns domain entities, delegating the
 * request building and the response mapping to the `BookAssembler`.
 *
 * @author Darnell Apellido
 */
@Service()
export class BooksApi {
  /** HTTP client used to call the provider. */
  private readonly http = inject(HttpClient);
  /** Assembler that maps provider contracts and domain objects. */
  private readonly assembler = inject(BookAssembler);
  /** Absolute URL of the search endpoint. */
  private readonly searchEndpointUrl =
    `${environment.bookProviderApiBaseUrl}${environment.bookProviderSearchEndpointPath}`;

  /**
   * Retrieves the books of a category.
   *
   * @param category - Category whose books will be retrieved.
   * @returns An observable that emits the books of the category.
   */
  getBooksByCategory(category: BookCategory): Observable<Book[]> {
    const request = this.assembler.toRequestFromCategory(category);
    return this.http.get<SearchBooksResponse>(this.searchEndpointUrl, {
      params: {q: request.q, fields: request.fields, limit: request.limit}
    }).pipe(
      map(response => this.assembler.toEntitiesFromResponse(response))
    );
  }
}
