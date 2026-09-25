/**
 * Identifiers of the book categories supported by the catalogue.
 *
 * @author Darnell Apellido
 */
export type BookCategoryId = 'software-engineering' | 'artificial-intelligence';

/**
 * Value object representing a category used to classify books in the catalogue.
 *
 * @remarks
 * The catalogue works with a closed set of categories, so instances are exposed as static
 * constants and the constructor is private. Each category knows the search term used to
 * query the book provider.
 *
 * @author Darnell Apellido
 */
export class BookCategory {
  /** Books related to Software Engineering. */
  static readonly SOFTWARE_ENGINEERING = new BookCategory('software-engineering', 'software engineering');
  /** Books related to Artificial Intelligence. */
  static readonly ARTIFICIAL_INTELLIGENCE = new BookCategory('artificial-intelligence', 'artificial intelligence');

  /** All supported categories, in display order. */
  private static readonly ALL: ReadonlyArray<BookCategory> = [
    BookCategory.SOFTWARE_ENGINEERING,
    BookCategory.ARTIFICIAL_INTELLIGENCE
  ];

  /**
   * Creates a book category.
   *
   * @param id - Stable identifier of the category.
   * @param searchTerm - Term used to search books of this category.
   */
  private constructor(
    readonly id: BookCategoryId,
    readonly searchTerm: string
  ) {
  }

  /**
   * Returns every supported category.
   *
   * @returns The categories in display order.
   */
  static values(): ReadonlyArray<BookCategory> {
    return BookCategory.ALL;
  }

  /**
   * Finds a category by its identifier.
   *
   * @param id - Identifier of the category.
   * @returns The matching category.
   * @throws Error if the identifier does not belong to a supported category.
   */
  static fromId(id: string): BookCategory {
    const category = BookCategory.ALL.find(candidate => candidate.id === id);
    if (!category) {
      throw new Error(`Unsupported book category: ${id}`);
    }
    return category;
  }

  /**
   * Compares this category with another one by identifier.
   *
   * @param other - The category to compare with.
   * @returns True if both categories share the same identifier.
   */
  equals(other: BookCategory | null | undefined): boolean {
    return !!other && this.id === other.id;
  }
}
