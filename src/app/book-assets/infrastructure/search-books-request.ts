/**
 * Request contract for the book provider search endpoint.
 *
 * @remarks
 * Groups the query parameters sent to `search.json`. Property names match the parameter
 * names expected by the provider.
 *
 * @author Darnell Apellido
 */
export interface SearchBooksRequest {
  /** Search query, for example `software engineering`. */
  q: string;
  /** Comma-separated list of fields to include for each book. */
  fields: string;
  /** Maximum number of books to return. */
  limit: number;
}
