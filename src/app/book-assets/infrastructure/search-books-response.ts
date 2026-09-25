/**
 * Response contract of the book provider search endpoint.
 *
 * @remarks
 * Mirrors the JSON returned by `search.json`. Only the members used by the application
 * are declared.
 *
 * @author Darnell Apellido
 */
export interface SearchBooksResponse {
  /** Total number of books that match the query. */
  numFound: number;
  /** Offset of the first book included in the response. */
  start: number;
  /** Books included in the response. */
  docs: BookResource[];
}

/**
 * Book resource as returned by the book provider.
 *
 * @remarks
 * Keeps the provider snake_case naming. The `BookAssembler` maps it to the `Book` entity,
 * so this naming does not leak into the domain model. Optional members may be missing
 * in some documents.
 *
 * @author Darnell Apellido
 */
export interface BookResource {
  /** Open Library work key, for example `/works/OL123W`. */
  key: string;
  /** Title of the book. */
  title?: string;
  /** Names of the authors. */
  author_name?: string[];
  /** Year of the first publication. */
  first_publish_year?: number;
  /** Number of editions. */
  edition_count?: number;
  /** Identifier of the cover image in the covers CDN. */
  cover_i?: number;
}
