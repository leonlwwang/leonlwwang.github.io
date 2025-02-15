import '/src/style.css'
import { colorBtn } from '/src/index/view/button'
import { render } from '/src/index/index.js'
import { enableDragDrop } from '/src/index/view/draggable'
import { enableGravity } from '/src/index/view/engine'
import { enableToolbar } from '/src/header/gift'
import { useRepositoryStore } from '/src/projects/data/store'
import { query } from '/src/projects/data/gql'
import { loadProjects } from '/src/projects/index'

const repositoryStore = useRepositoryStore.getState()
repositoryStore.searchRepositories(query)

colorBtn()
enableDragDrop(
  document.querySelector('img[pow-block]'),
  document.querySelector('canvas[stippler]'),
  enableGravity
)
enableToolbar(document.querySelector('div[toolbar]'))
render(document.querySelector('canvas[stippler]'))

useRepositoryStore.subscribe((state) =>
  loadProjects(state, Array.from(document.querySelectorAll('div[repo]')))
)
