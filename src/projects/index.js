/** @typedef {import('./data/types').PageInfo} PageInfo */
/** @typedef {import('./data/types').Repository} Repository */
/** @typedef {import('./data/types').RepositoryStore} RepositoryStore */

/**
 * Inject repository content into available containers.
 * @param {RepositoryStore} state
 * @param {HTMLDivElement[]} containers
 */
export const loadProjects = (state, containers) => {
  if (state.errors) {
    console.error(`${state.errors.name}: ${state.errors.message}`)
  }
  const projects = state.repositories || []
  const pageInfo = state.pageInfo
  console.log(pageInfo)

  projects.forEach((project, i) => fillContainer(containers[i], project))
}

/**
 * Clean and fill an available container with the repository data.
 * @param {HTMLDivElement} container
 * @param {Repository} data
 */
const fillContainer = (container, data) => {
  clearLoadingStatus(container)
  injectData(container, data)
  console.log(data)
}

/**
 * Inject repository data into the UI container.
 * @param {HTMLDivElement} container
 * @param {Repository} data
 */
const injectData = (container, data) => {
  container.appendChild(createProjectUi(data))
  container.appendChild(createLanguagesUi(data.languages))
}

/**
 * @param {Repository} project
 * @returns {HTMLDivElement}
 */
const createProjectUi = (project) => {
  const ui = document.createElement('div')
  const heading = document.createElement('h3')
  const p = document.createElement('p')
  heading.setAttribute('title', '')
  heading.textContent = project.name
  p.setAttribute('desc', '')
  p.textContent = project.description
  ui.appendChild(heading)
  ui.appendChild(p)
  return ui
}

/**
 * @param {string[]} languages
 * @returns {HTMLDivElement}
 */
const createLanguagesUi = (languages) => {
  const ui = document.createElement('div')
  const img = document.createElement('img')
  img.setAttribute('checkers', '')
  img.src = '/assets/bar.svg'
  img.alt = ''
  ui.appendChild(img)
  return ui
}

/** @param {HTMLDivElement} container */
const clearLoadingStatus = (container) => {
  container.setAttribute('loaded', '')
  removeSkeleton('div[repo]')
}

/** @param {string} className */
const removeSkeleton = (className) => {
  const style = document.createElement('style')
  style.textContent = `
    ${className}::after {
      content: none !important;
    }
  `
  document.head.appendChild(style)
}
