import { newNavBarComponent } from '../components/nav.ts'
import { newFileComponent } from '../components/file.ts'

const global = {
  app: document.getElementById('app')!,
  projectsList: document.getElementById('projects-list')!,
  navBar: document.getElementById('nav-bar')!,
  backButton: document.getElementById('back-button')! as HTMLAnchorElement,
  newButton: document.getElementById('new-button')!,
  importButton: document.getElementById('import-button') as HTMLElement,
  fileInput: document.getElementById('file-input') as HTMLInputElement,

  params: {
    path: new URLSearchParams(globalThis.location.search).get('path') || '',
  },
}

function main() {
  const domain = 'localhost:8443'
  // const domain = 'narval.petermichon.fr'
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
    const fullPath = `${path}/${fileName}`
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

  // ---

  global.importButton.addEventListener('click', () => global.fileInput.click())

  // Also handle files selected via the picker
  global.fileInput.addEventListener('change', () => {
    if (global.fileInput.files) {
      handleFiles(global.fileInput.files)
    }
  })

  function handleFiles(fileList: FileList) {
    Array.from(fileList).forEach((file) => {
      console.log('File dropped:', file.name, file.type, file.size)
      console.log(file)

      file.text().then((text) => {
        console.log(text)
        const path = `${global.params.path}/${file.name}`
        const url = `https://${domain}/api/v1/files/content?path=${path}`

        const res = fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: text,
        })
        res.then(() => {
          // add the new file to the list just as a visual feedback
          const node = document.createElement('div')
          node.innerHTML = newFileComponent(
            { name: file.name, isFile: true },
            global.params.path
          )
          global.projectsList.appendChild(node)
        })
      })
    })
  }

  {
    const node = document.createElement('div')
    node.innerHTML = newNavBarComponent()
    global.navBar.appendChild(node)
  }
}

export { main }
