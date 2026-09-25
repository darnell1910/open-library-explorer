/**
 * Development environment configuration.
 *
 * @remarks
 * Centralizes provider URLs, endpoint paths, keys and i18n settings so that no route
 * or key is hard-coded in the application source code. It replaces
 * `environment.ts` when the application is built or served with the `development` configuration.
 *
 * @author Darnell Apellido
 */
export const environment = {
  production: false,
  bookProviderApiBaseUrl: 'https://openlibrary.org',
  bookProviderSearchEndpointPath: '/search.json',
  bookProviderSearchFields: 'key,title,author_name,first_publish_year,edition_count,cover_i',
  bookProviderSearchLimit: 12,
  bookProviderWebsiteUrl: 'https://openlibrary.org',
  bookCoverProviderBaseUrl: 'https://covers.openlibrary.org/b/id',
  bookCoverSize: 'L',
  logoProviderApiBaseUrl: 'https://img.logo.dev/',
  logoProviderPublishableKey: 'pk_H1j_uA9GRFizL2ikMw4qwQ',
  organizationDomain: 'openlibrary.org',
  i18nResourcesPath: './i18n/',
  i18nResourcesExtension: '.json',
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'es']
};
