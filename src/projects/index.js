/** @type {import('./data/store').RepositoryStore} */

export const loadProjects = (state) => {
  /** @type {Repository[]} */
  const projects = state.repositories
  console.log(projects)
}