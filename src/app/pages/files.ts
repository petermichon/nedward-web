import { Router } from '../router.ts'

import { newNavBarComponent } from '../components/nav.ts'
import { newFileComponent } from '../components/file.ts'

const app = document.getElementById('app')!

function pageFiles() {
  document.title = 'Newdard - Files'
  const html = `
    <div
      class="max-w-sm relative min-h-screen mx-auto flex flex-col font-[MavenPro] antialiased bg-white"
    >
      <div class="absolute bottom-0 left-0 right-0 z-50 h-screen w-5"></div>

      <div class="w-full z-10">
        <div class="px-4">
          <div class="flex justify-between my-2">
            <div class="flex">
              <div class="flex items-center">
                <a
                  id="back-button"
                  href=""
                  title="Retour"
                  class="rounded-full p-3 hover:bg-gray-100 cursor-pointer"
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </a>
                <a
                  href=""
                  title="Mon Site Web"
                  class="flex items-center hover:bg-gray-100 cursor-pointer rounded-full m-2"
                >
                  <div class="px-2 py-2">
                    <div class="bg-neutral-300 rounded-full p-4"></div>
                  </div>
                  <span class="font-semibold text-lg text-gray-900 pr-4">
                    Fichiers
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="py-4">
        <div class="max-w-7xl mx-auto px-4">
          <div
            id="import-button"
            class="p-4 border-2 border-neutral-400 border-dashed rounded-2xl bg-white hover:border-neutral-400 hover:bg-neutral-100 cursor-pointer text-lg leading-6 font-medium text-black"
          >
            <p class="text-center">Importer</p>
            <input type="file" id="file-input" multiple class="hidden" />
          </div>
          <div id="projects-list" class="grid grid-cols-1 mt-4 mb-16"></div>
        </div>
      </div>


      <nav
        class="absolute bottom-0 left-0 right-0 z-50 fixed max-w-sm mx-auto"
      >
        <div class="grid-cols-2">
          <div class="flex items-center justify-end">
            <button
              id="new-button"
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
            </button>
          </div>
          <div id="nav-bar"></div>
        </div>
      </nav>
    </div>
  `

  app.innerHTML = html
  // app.replaceChildren(html)

  {
    const global = {
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

    const domain = 'localhost:8443'
    // const domain = 'narval.petermichon.fr'
    const path = global.params.path
    const url = `https://${domain}/api/v1/files?path=${path}`

    // remove 1 path level from the path
    const returnPath = path.split('/').slice(0, -1).join('/')

    const page = path === '' ? `/` : `/files/`

    // ugly asf
    let finalPath = `${page}?path=${returnPath}`
    if (finalPath === '/?path=') {
      finalPath = '/'
    }

    global.backButton.href = finalPath

    global.backButton.addEventListener('click', (e) => {
      e.preventDefault()
      history.pushState({}, '', finalPath) // TODO
      Router.navigate(`${page}`) // TODO
    })

    global.newButton.addEventListener('click', () => {
      const fileName = prompt('Nom du fichier') || ''
      const fullPath = `${path}/${fileName}`
      const url = `https://${domain}/api/v1/files/content?path=${fullPath}`

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
          {
            node.addEventListener('click', (e) => {
              e.preventDefault()

              // TODO store fullPath directly instead of calculating it
              const fullpath = `${path}/${file.name}`
              const page = file.isFile ? `editor` : `files`
              const href = `/${page}/?path=${fullpath}`

              history.pushState({}, '', href) // TODO
              Router.navigate(`/${page}/`) // TODO
            })
          }
        }
      })
    })

    // ---

    global.importButton.addEventListener('click', () =>
      global.fileInput.click()
    )

    // Also handle files selected via the picker
    global.fileInput.addEventListener('change', () => {
      if (global.fileInput.files) {
        handleFiles(global.fileInput.files)
      }
    })

    // deno-lint-ignore no-inner-declarations
    function handleFiles(fileList: FileList) {
      Array.from(fileList).forEach((file) => {
        console.log('File dropped:', file.name, file.type, file.size)

        file.text().then((text) => {
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
            // note : this won't work in single-page. -> page reload
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
}

export { pageFiles }
