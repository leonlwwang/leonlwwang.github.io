import { createStore } from 'zustand/vanilla'
import { searchRepositories } from '/src/projects/data/data-service'

/** @typedef {import('./types').PageInfo} PageInfo */
/** @typedef {import('./types').RepositoryStore} Repository */
/** @typedef {import('./types').RepositoryStore} RepositoryStore */

/** @type {import('zustand/vanilla').StoreApi<RepositoryStore>} */
export const useRepositoryStore = createStore((set) => ({
  repositories: null,
  pageInfo: null,
  errors: null,
  searchRepositories: async (query) => {
    searchRepositories(query)
      .then((results) => {
        const rawData = results.data.user.repositories.nodes
        /** @type {Repository[]} */
        const repositories = enrichRepositoryData(rawData)
        /** @type {PageInfo} */
        const pageInfo = results.data.user.repositories.pageInfo
        set({
          repositories: repositories,
          pageInfo: pageInfo,
        })
      })
      .catch((error) => {
        set({
          errors: error,
        })
      })
  },
}))

/**
 * @param {Object} data
 * @returns {Repository[]}
 */
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
