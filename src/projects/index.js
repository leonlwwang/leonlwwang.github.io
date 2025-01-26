/** @typedef {import('./data/types').RepositoryStore} RepositoryStore */

/** @param {RepositoryStore} state */
/** @param {Element[]} containers */
export const loadProjects = (state, containers) => {
  if (state.errors) {
    console.error(`${state.errors.name}: ${state.errors.message}`)
  }
  const projects = state.repositories
  const pageInfo = state.pageInfo
  console.log(pageInfo)

  projects.forEach((project, i) => fillContainer(containers[i], project))
}

/** @param {Element} container */
const fillContainer = (container, data) => {
  console.log(container, data)
  clearLoadingStatus(container)
}

const clearLoadingStatus = (container) => {
  container.style.borderColor = 'rgba(0, 0, 0, 0.7)'
  container.style.backgroundColor = 'white'
  container.setAttribute('loaded', '')
  removeAfter('div[repo]')
}

const removeAfter = (className) => {
  const style = document.createElement('style')
  style.textContent = `
    ${className}::after {
      content: none !important;
    }
  `
  document.head.appendChild(style)
}
