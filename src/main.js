import '/src/style.css'
import { colorBtn } from '/src/index/view/button'
import { render } from '/src/index/index.js'
import { loadPage } from '/src/router.js'
import { enableDragDrop } from '/src/index/view/draggable'
import { enableGravity } from '/src/index/view/engine'
import { enableToolbar } from '/src/header/gift'
import { useRepositoryStore } from '/src/projects/data/store'
import { query } from '/src/projects/data/gql'
import { loadProjects } from '/src/projects/index'

const repositoryStore = useRepositoryStore.getState()
repositoryStore.searchRepositories(query)

const renderProfilePage = async () => {
  await loadPage('/src/index/profile.html', 'div[index]').then(() => {
    colorBtn()
    enableDragDrop(
      document.querySelector('img[pow-block]'),
      document.querySelector('canvas[stippler]'),
      enableGravity
    )
    enableToolbar(document.querySelector('div[toolbar]'))
    render(document.querySelector('canvas[stippler]'))
  })
}

const renderProjectsPage = async () => {
  await loadPage('/src/projects/projects.html', 'div[projects]').then(() => {
    useRepositoryStore.subscribe((state) =>
      loadProjects(state, Array.from(document.querySelectorAll('div[repo]')))
    )
  })
}

renderProfilePage()
renderProjectsPage()
