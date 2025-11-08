import { Router } from '../router.ts'

import { newProjectComponent } from '../components/project.ts'
import { newNavBarComponent } from '../components/nav.ts'

const app = document.getElementById('app')!

function pageCollections() {
  document.title = 'Newdard'
  const html = `
    <div
      class="max-w-sm relative min-h-screen mx-auto flex flex-col font-[MavenPro] antialiased bg-white"
    >
      <div class="absolute bottom-0 left-0 right-0 z-50 h-screen w-5"></div>

      <div class="w-full z-10">
        <div class="px-4">
          <div class="flex justify-between h-16">
            <div class="flex-shrink-0 flex items-center">
              <a
                href=""
                class="ml-2 text-xl font-semibold text-black rounded-sm px-4 py-2 cursor-pointer"
                >nedward.eu</a
              >
            </div>
          </div>
        </div>
      </div>

      <div id="projects-list" class="p-4 grid grid-cols-1 mb-16"></div>

      <nav
        class="absolute bottom-0 left-0 right-0 z-50 fixed max-w-sm mx-auto"
      >
        <div class="grid-cols-2">
          <div class="flex items-center justify-end">
            <a
              href=""
              title="Nouveau"
              class="flex items-center justify-center w-13 h-13 bg-lime-400 text-lime-800 text-3xl rounded-2xl hover:bg-lime-300/90 cursor-pointer m-5 shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </a>
          </div>
          <div id="nav-bar"></div>
        </div>
      </nav>
    </div>
  `

  app.innerHTML = html
  // app.replaceChildren(html)

  const projects = [
    {
      title: 'Fichiers',
      description: '600 Mo de données',
      color: '#A3E635',
      path: '/files/?path=',
      pathFirst: '/files/',
    },
    {
      title: 'Sites Web',
      description: '5 fichiers',
      color: '#7835E6',
      path: '',
      pathFirst: '',
    },
    {
      title: 'Galerie',
      description: '20 images',
      color: '#35E6D1',
      path: '/gallery/',
      pathFirst: '/gallery/',
    },
    {
      title: 'Playlist',
      description: '30 fichiers audio',
      color: '#E6354A',
      path: '',
      pathFirst: '',
    },
    {
      title: 'Notes',
      description: '18 notes',
      color: '',
      path: '',
      pathFirst: '',
    },
  ]

  const projectsList = document.getElementById('projects-list')

  if (!projectsList) {
    throw new Error('projectsList not found') // DEV
  }

  for (const project of projects) {
    const node = document.createElement('div')
    node.innerHTML = newProjectComponent(project)
    {
      node.addEventListener('click', (e) => {
        // if (e.button === 0) { // useless ?
        //   e.preventDefault()
        // }
        e.preventDefault()
        history.pushState({}, '', project.path)
        Router.navigate(project.pathFirst)
      })
    }
    projectsList.appendChild(node)
  }

  const navBar = document.getElementById('nav-bar')

  if (!navBar) {
    throw new Error('navBar not found') // DEV
  }

  const node = document.createElement('div')
  node.innerHTML = newNavBarComponent()
  navBar.appendChild(node)
}

export { pageCollections }
