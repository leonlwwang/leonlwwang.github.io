import { createStore } from 'zustand/vanilla'
import { searchRepositories } from '/src/projects/data/data-service'

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
 * @property {string | null} errors - Errors from the repository search.
 * @property {(query: string) => Promise<void>} searchRepositories - Search function.
 */

/** @type {import('zustand/vanilla').StoreApi<RepositoryStore>} */
export const useRepositoryStore = createStore((set) => ({
  repositories: null,
  pageInfo: null,
  errors: null,
  searchRepositories: async (query) => {
    searchRepositories(query)
      .then((results) => {
        /** @type {Object[]} */
        const rawData = results.data.user.repositories.nodes
        /** @type {PageInfo} */
        const pageInfo = results.data.user.repositories.pageInfo
        set({
          repositories: enrichRepositoryData(rawData),
          pageInfo: pageInfo,
        })
      })
      .catch((error) => {
        set({
          errors: error,
        })
      })
  }
}))

const enrichRepositoryData = (data) => {
  /** @type {Repository[]} */
  const enrichedData = data.map((repo) => {
    /** @type {string[]} */
    const languages = repo.languages.edges.map((edge) => edge.node.name)
    return {
      ...repo,
      languages: languages,
    }
  })
  return enrichedData
}
