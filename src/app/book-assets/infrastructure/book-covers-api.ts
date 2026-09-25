import {Service} from '@angular/core';
import {environment} from '../../../environments/environment';

/**
 * Infrastructure gateway that builds cover image URLs with the Open Library covers CDN.
 *
 * @remarks
 * Keeps the CDN base URL and image size in the environment configuration and hides
 * the CDN URL pattern (`{baseUrl}/{coverId}-{size}.jpg`) from the rest of the application.
 *
 * @author Darnell Apellido
 */
@Service()
export class BookCoversApi {
  /** Base URL of the covers CDN, identified by cover id. */
  private readonly baseUrl = environment.bookCoverProviderBaseUrl;
  /** Size of the cover image: S, M or L. */
  private readonly size = environment.bookCoverSize;

  /**
   * Builds the cover image URL for a cover identifier.
   *
   * @param coverId - Cover identifier (`cover_i`) returned by the search endpoint.
   * @returns The absolute URL of the cover image.
   */
  getUrlToCover(coverId: number): string {
    return `${this.baseUrl}/${coverId}-${this.size}.jpg`;
  }
}
