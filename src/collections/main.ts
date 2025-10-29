import { newNavBarComponent } from '../components/nav.ts'
import { newProjectComponent } from '../components/project.ts'

const global = {
  app: document.getElementById('app')!,
  projectsList: document.getElementById('projects-list')!,
  navBar: document.getElementById('nav-bar')!,
}

function main() {
  const projects = [
    {
      title: 'Fichiers',
      description: '600 Mo de données',
      color: '#A3E635',
      path: '/files/?path=',
    },
    {
      title: 'Sites Web',
      description: '5 fichiers',
      color: '#7835E6',
      path: '',
    },
    {
      title: 'Galerie',
      description: '20 images',
      color: '#35E6D1',
      path: '/gallery/',
    },
    {
      title: 'Playlist',
      description: '30 fichiers audio',
      color: '#E6354A',
      path: '',
    },
    {
      title: 'Notes',
      description: '18 notes',
      color: '',
      path: '',
    },
  ]

  for (const project of projects) {
    const node = document.createElement('div')
    node.innerHTML = newProjectComponent(project)
    global.projectsList.appendChild(node)
  }

  const node = document.createElement('div')
  node.innerHTML = newNavBarComponent()
  global.navBar.appendChild(node)
}

export { main }
