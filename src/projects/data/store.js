import { createStore } from 'zustand/vanilla'
import { searchRepositories } from '/src/projects/data/data-service'

export const useRepositoryStore = createStore((set) => ({
  repositories: null,
  pageInfo: null,
  errors: null,
  searchRepositories: async (query) => {
    searchRepositories(query)
      .then((results) => {
        set({
          repositories: results.data.user.repositories.nodes,
          pageInfo: results.data.user.repositories.pageInfo,
        })
      })
      .catch((error) => {
        set({
          errors: error,
        })
      })
  }
}))
