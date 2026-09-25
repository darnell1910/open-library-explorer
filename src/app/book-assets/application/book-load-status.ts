/**
 * Loading status of the books of a category.
 *
 * @remarks
 * - `idle`: the books have not been requested yet.
 * - `loading`: the request is in progress.
 * - `loaded`: the books were retrieved successfully.
 * - `failed`: the request failed and can be retried.
 *
 * @author Darnell Apellido
 */
export type BookLoadStatus = 'idle' | 'loading' | 'loaded' | 'failed';
