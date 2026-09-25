import {Url} from '../../../shared/domain/model/url';

/**
 * Entity representing a book of the Open Library catalogue.
 *
 * @remarks
 * Belongs to the Book Assets bounded context and is identified by its Open Library work
 * key. Attribute names follow TypeScript conventions and do not depend on the naming
 * used by the provider JSON objects; the infrastructure assembler maps them.
 *
 * @author Darnell Apellido
 */
export class Book {
  /** Open Library work key, for example `/works/OL123W`. */
  readonly #key: string;
  /** Title of the book. */
  readonly #title: string;
  /** Names of the authors of the book. */
  readonly #authorNames: ReadonlyArray<string>;
  /** Year of the first publication, or null when unknown. */
  readonly #firstPublishYear: number | null;
  /** Number of editions registered for the book. */
  readonly #editionCount: number;
  /** URL of the cover image, empty when the book has no cover. */
  readonly #coverUrl: Url;
  /** URL of the official book page. */
  readonly #detailsUrl: Url;

  /**
   * Creates a book.
   *
   * @param key - Open Library work key that identifies the book.
   * @param title - Title of the book.
   * @param authorNames - Names of the authors.
   * @param firstPublishYear - Year of the first publication, or null when unknown.
   * @param editionCount - Number of editions.
   * @param coverUrl - URL of the cover image, empty when the book has no cover.
   * @param detailsUrl - URL of the official book page.
   * @throws Error if the key is empty or the edition count is negative.
   */
  constructor(
    key: string,
    title: string,
    authorNames: ReadonlyArray<string>,
    firstPublishYear: number | null,
    editionCount: number,
    coverUrl: Url,
    detailsUrl: Url
  ) {
    if (!key.trim()) {
      throw new Error('Book key cannot be empty');
    }
    if (editionCount < 0) {
      throw new Error(`Edition count cannot be negative: ${editionCount}`);
    }
    this.#key = key.trim();
    this.#title = title.trim();
    this.#authorNames = authorNames.map(authorName => authorName.trim()).filter(Boolean);
    this.#firstPublishYear = firstPublishYear;
    this.#editionCount = editionCount;
    this.#coverUrl = coverUrl;
    this.#detailsUrl = detailsUrl;
  }

  /** Gets the Open Library work key. */
  get key(): string {
    return this.#key;
  }

  /** Gets the title of the book. */
  get title(): string {
    return this.#title;
  }

  /** Gets the names of the authors. */
  get authorNames(): ReadonlyArray<string> {
    return this.#authorNames;
  }

  /** Gets the year of the first publication, or null when unknown. */
  get firstPublishYear(): number | null {
    return this.#firstPublishYear;
  }

  /** Gets the number of editions. */
  get editionCount(): number {
    return this.#editionCount;
  }

  /** Gets the cover image URL. */
  get coverUrl(): Url {
    return this.#coverUrl;
  }

  /** Gets the official book page URL. */
  get detailsUrl(): Url {
    return this.#detailsUrl;
  }

  /** Gets the cover image URL as a string. */
  get coverUrlAsString(): string {
    return this.#coverUrl.toString();
  }

  /** Gets the official book page URL as a string. */
  get detailsUrlAsString(): string {
    return this.#detailsUrl.toString();
  }

  /** Indicates whether the book has a title. */
  get hasTitle(): boolean {
    return this.#title.length > 0;
  }

  /** Indicates whether the book has a cover image. */
  get hasCover(): boolean {
    return !this.#coverUrl.isEmpty;
  }

  /** Indicates whether at least one author is known. */
  get hasAuthors(): boolean {
    return this.#authorNames.length > 0;
  }

  /** Indicates whether the book was written by more than one author. */
  get hasMultipleAuthors(): boolean {
    return this.#authorNames.length > 1;
  }

  /** Indicates whether the first publication year is known. */
  get hasFirstPublishYear(): boolean {
    return this.#firstPublishYear !== null;
  }

  /**
   * Gets the author names joined in a single, readable text.
   *
   * @returns The author names separated by commas.
   */
  get authorNamesAsText(): string {
    return this.#authorNames.join(', ');
  }

  /**
   * Compares this book with another entity based on identity.
   *
   * @param other - The book to compare with.
   * @returns True if both books share the same key.
   */
  equals(other: Book | null | undefined): boolean {
    return !!other && this.#key === other.key;
  }
}
