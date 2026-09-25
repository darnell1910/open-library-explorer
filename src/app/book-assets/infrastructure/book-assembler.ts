import {inject, Service} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Url} from '../../shared/domain/model/url';
import {Book} from '../domain/model/book.entity';
import {BookCategory} from '../domain/model/book-category';
import {BookCoversApi} from './book-covers-api';
import {SearchBooksRequest} from './search-books-request';
import {BookResource, SearchBooksResponse} from './search-books-response';

/**
 * Assembler that translates between book provider contracts and domain objects.
 *
 * @remarks
 * Builds the search request for a book category and maps the snake_case book resources
 * of the response into `Book` entities, completing missing values and building the cover
 * and official page URLs.
 *
 * @author Darnell Apellido
 */
@Service()
export class BookAssembler {
  /** Covers CDN gateway used to build cover URLs. */
  private readonly coversApi = inject(BookCoversApi);
  /** Base URL of the official book pages. */
  private readonly websiteUrl = environment.bookProviderWebsiteUrl;

  /**
   * Builds the search request for a book category.
   *
   * @param category - Category whose books will be searched.
   * @returns The request with query, fields and limit parameters.
   */
  toRequestFromCategory(category: BookCategory): SearchBooksRequest {
    return {
      q: category.searchTerm,
      fields: environment.bookProviderSearchFields,
      limit: environment.bookProviderSearchLimit
    };
  }

  /**
   * Converts a provider book resource into a Book entity.
   *
   * @param resource - Book resource returned by the provider.
   * @returns The equivalent Book entity.
   */
  toEntityFromResource(resource: BookResource): Book {
    const coverUrl = this.hasValidCoverId(resource.cover_i)
      ? new Url(this.coversApi.getUrlToCover(resource.cover_i))
      : new Url();
    return new Book(
      resource.key,
      resource.title ?? '',
      resource.author_name ?? [],
      resource.first_publish_year ?? null,
      resource.edition_count ?? 0,
      coverUrl,
      new Url(`${this.websiteUrl}${resource.key}`)
    );
  }

  /**
   * Converts a search response into Book entities.
   *
   * @remarks
   * Resources without a key cannot be identified, so they are discarded.
   *
   * @param response - Search response returned by the provider.
   * @returns The Book entities included in the response.
   */
  toEntitiesFromResponse(response: SearchBooksResponse): Book[] {
    return (response.docs ?? [])
      .filter(resource => !!resource.key?.trim())
      .map(resource => this.toEntityFromResource(resource));
  }

  /**
   * Checks whether a cover identifier points to an existing cover.
   *
   * @param coverId - Cover identifier returned by the provider.
   * @returns True if the identifier is a positive number.
   */
  private hasValidCoverId(coverId: number | undefined): coverId is number {
    return typeof coverId === 'number' && coverId > 0;
  }
}
