import { newNavComponent } from '../components/nav.ts'
import { newFileComponent } from '../components/file.ts'

const global = {
  app: document.getElementById('app')!,
  projectsList: document.getElementById('projects-list')!,
  navsList: document.getElementById('navs-list')!,
  backButton: document.getElementById('back-button')! as HTMLAnchorElement,
  newButton: document.getElementById('new-button')!,

  params: {
    path: new URLSearchParams(globalThis.location.search).get('path') || '',
  },
}

function main() {
  // const domain = 'localhost:8443'
  const domain = 'narval.petermichon.fr'
  const path = global.params.path
  const url = `https://${domain}/api/v1/files?path=${path}`

  // remove 1 path level from the path
  const returnPath = path.split('/').slice(0, -1).join('/')

  const page = path === '' ? `/collections/` : `/files/`

  // ugly asf
  let finalPath = `${page}?path=${returnPath}`
  if (finalPath === '/collections/?path=') {
    finalPath = '/collections/'
  }

  global.backButton.href = finalPath

  global.newButton.addEventListener('click', () => {
    const fileName = prompt('Nom du fichier') || ''
    const fullPath = fileName
    const url = `https://${domain}/api/v1/files/content?path=${fullPath}`
    console.log(url)

    const res = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: '',
    })

    res.then(() => {
      // add the new file to the list just as a visual feedback
      const node = document.createElement('div')
      node.innerHTML = newFileComponent(
        { name: fileName, isFile: true },
        global.params.path
      )
      global.projectsList.appendChild(node)
    })
  })

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/plain',
    },
  }).then((res) => {
    res.text().then((text) => {
      const files = JSON.parse(text)
      for (const file of files) {
        const node = document.createElement('div')
        node.innerHTML = newFileComponent(file, global.params.path)
        global.projectsList.appendChild(node)
      }
    })
  })

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
      title: 'Notifications',
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
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
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
