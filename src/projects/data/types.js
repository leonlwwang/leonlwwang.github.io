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

export {}
