# Open Library Explorer (pc17800uxxxxxxxxx)

## Overview
Open Library Explorer is a web application that promotes digital access to the
[Open Library](https://openlibrary.org/) book catalogue. It lets users browse books classified
into two main categories, **Software Engineering** and **Artificial Intelligence**, using data
retrieved from the Open Library Search API.

## Features
- **Toolbar**: Open Library logo (Logo.dev Logo API), application title and EN | ES language toggle buttons.
- **Book Catalogue view**: toggle buttons to switch between Software Engineering and Artificial Intelligence books.
- **Book cards**: cover image (Open Library Covers CDN), title, authors, first publication year and number of editions with human-friendly labels.
- **Book Details**: opens the official book page on openlibrary.org in a new tab.
- **Responsive layout**: three cards per row on large screens, two on medium screens and one on small screens.
- **Internationalization**: English (default) and Spanish for every fixed text of the user interface.
- **Loading, empty and error states**: progress indicator, empty message and retry action.
- **Accessibility**: alternative text for images, ARIA attributes, landmarks and semantic lists.
- **Footer**: copyright notice and developer information.

## Technologies
- Angular 22 (standalone components, Angular Signals)
- TypeScript
- Angular Material 22
- Angular HttpClient
- @ngx-translate/core and @ngx-translate/http-loader
- Open Library Search API and Covers CDN
- Logo.dev Logo API

## Architecture
The project applies a domain-driven, layered and component-based architecture organized by
bounded contexts:

```
src/app
├── book-assets                      # Book Assets bounded context
│   ├── domain/model                 # Book (Entity), BookCategory (Value Object)
│   ├── application                  # BookAssetsStore (State Management with Signals)
│   ├── infrastructure               # BooksApi, BookCoversApi, BookAssembler,
│   │                                # SearchBooksRequest, SearchBooksResponse, BookResource
│   └── presentation
│       ├── views/book-catalogue     # Book Catalogue main view (container)
│       └── components               # BookCategorySelector, BookList, BookCard
└── shared                           # Shared bounded context
    ├── domain/model                 # Url (Value Object)
    ├── infrastructure               # LogoDevApi
    └── presentation/components      # Layout, LanguageSwitcher, Footer
```

### Design patterns
- **Entity**: `Book`, identified by its Open Library work key.
- **Value Object**: `BookCategory` and `Url`.
- **State Management**: `BookAssetsStore` keeps the selected category, a per-category cache of books and the loading status with Angular Signals.
- **Request / Response / Resource**: `SearchBooksRequest`, `SearchBooksResponse` and `BookResource` describe the provider contracts.
- **Assembler**: `BookAssembler` builds requests and maps provider resources (snake_case) into domain entities.
- **Gateway**: `BooksApi`, `BookCoversApi` and `LogoDevApi` encapsulate external services.

## Environment Variables
URLs, paths and keys are defined in `src/environments/environment.development.ts` (development)
and `src/environments/environment.ts` (production):

| Variable | Description |
|:--|:--|
| `bookProviderApiBaseUrl` | Open Library API base URL |
| `bookProviderSearchEndpointPath` | Search endpoint path |
| `bookProviderSearchFields` | Fields requested for each book |
| `bookProviderSearchLimit` | Number of books per category |
| `bookProviderWebsiteUrl` | Base URL of the official book pages |
| `bookCoverProviderBaseUrl` | Open Library Covers CDN base URL |
| `bookCoverSize` | Cover image size (`S`, `M` or `L`) |
| `logoProviderApiBaseUrl` | Logo.dev Logo API base URL |
| `logoProviderPublishableKey` | Logo.dev publishable key |
| `organizationDomain` | Domain used to obtain the toolbar logo |
| `i18nResourcesPath` / `i18nResourcesExtension` | Location of translation files |
| `defaultLanguage` / `supportedLanguages` | Interface languages |

## Getting Started

### Prerequisites
- Node.js 22.22.3 or later (or 24.15.0 or later)
- npm

### Installation
```bash
npm install
```

### Development server
```bash
ng serve
```
Open `http://localhost:4200/` in the browser.

### Building
```bash
ng build
```
The build artifacts are stored in the `dist/` directory.

## Attributions
- Book data and covers provided by [Open Library](https://openlibrary.org/developers/api).
- Logo provided by [Logo.dev](https://logo.dev).

## Author
- **Name**: Darnell Apellido
- **Student code**: uxxxxxxxxx
- **Course**: Open-Source Applications Development (1ASI0729), NRC 7800, Universidad Peruana de Ciencias Aplicadas (UPC)
