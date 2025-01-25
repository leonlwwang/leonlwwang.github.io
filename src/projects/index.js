/** @typedef {import('./data/types').RepositoryStore} RepositoryStore */

/** @param {RepositoryStore} state */
export const loadProjects = (state, container) => {
  if (state.errors) {
    console.error(`${state.errors.name}: ${state.errors.message}`)
  }
  const projects = state.repositories
  const pageInfo = state.pageInfo
  console.log(projects)
  console.log(pageInfo)
  console.log(container)
}
