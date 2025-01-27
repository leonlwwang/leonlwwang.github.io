/**
 * @typedef {Object} Repository
 * @property {string} name
 * @property {string} description
 * @property {string} createdAt
 * @property {string} pushedAt
 * @property {string[]} languages
 */

/**
 * @typedef {Object} PageInfo
 * @property {boolean} hasNextPage
 * @property {string} endCursor
 */

/**
 * @typedef {Object} RepositoryStore
 * @property {Repository[] | null} repositories - List of repositories.
 * @property {PageInfo | null} pageInfo - Pagination information.
 * @property {Error | null} errors - Errors from the repository search.
 * @property {(query: string) => Promise<void>} searchRepositories - Search function.
 */

/**
 * @typedef {Object} Language
 * @property {string} name - The language name for display.
 * @property {string} color - The hex code for the language UI chip.
 * @property {number} weight - The importance of the language (lower is better).
 */

/**
 * @typedef {Object.<string, Language>} LanguageMap
 * A map that provides proper formatting of a language listed for a repo to the UI.
 */

export {}
