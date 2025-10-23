import { newNavComponent } from '../components/nav.ts'
import { newProjectComponent } from '../components/project.ts'

const global = {
  app: document.getElementById('app')!,
  projectsList: document.getElementById('projects-list')!,
  navsList: document.getElementById('navs-list')!,
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

  const navs = [
    {
      title: 'Accueil',
      icon: `
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      `,
    },
    {
      title: 'Galerie',
      icon: `
        <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 112.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
      `,
    },
    {
      title: 'Compte',
      icon: `
        <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
      `,
    },
  ]

  for (const nav of navs) {
    const node = document.createElement('div')
    node.innerHTML = newNavComponent(nav)
    global.navsList.appendChild(node)
  }
}

export { main }
