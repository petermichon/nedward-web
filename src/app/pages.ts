import { Router } from './router.ts'

import { pageCollections } from './collections.ts'
import { pageFiles } from './files.ts'

import { newNavBarComponent } from './components/nav.ts'
import { newProjectComponent } from './components/project.ts'
import { newFileComponent } from './components/file.ts'
import { newPictureComponent } from './components/picture.ts'

const app = document.getElementById('app')

function loadRoutes() {
  if (!app) {
    throw new Error('app not found') // DEV
  }

  Router.routes.set('/example/', () => {
    document.title = 'Newdard - Example'
    const page = `
      <p class='text-white font-semibold font-[Fredoka] p-3 text-2xl'>Example</p>
    `
    app.innerHTML = page
    // app.replaceChildren(page)
  })

  Router.routes.set('/', () => {
    document.title = 'Newdard'
    const page = pageCollections()

    app.innerHTML = page
    // app.replaceChildren(page)

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
  })

  Router.routes.set('/files/', () => {
    document.title = 'Newdard - Files'
    const page = pageFiles()

    app.innerHTML = page
    // app.replaceChildren(page)

    {
      const global = {
        projectsList: document.getElementById('projects-list')!,
        navBar: document.getElementById('nav-bar')!,
        backButton: document.getElementById(
          'back-button'
        )! as HTMLAnchorElement,
        newButton: document.getElementById('new-button')!,
        importButton: document.getElementById('import-button') as HTMLElement,
        fileInput: document.getElementById('file-input') as HTMLInputElement,

        params: {
          path:
            new URLSearchParams(globalThis.location.search).get('path') || '',
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
  })

  Router.routes.set('/editor/', () => {
    const html = `
      <div
        class="max-w-sm relative min-h-screen mx-auto flex flex-col font-[Fredoka] antialiased bg-white"
      >
        <div class="absolute bottom-0 left-0 right-0 z-50 h-screen w-5"></div>

        <div class="w-full z-10">
          <div class="px-4">
            <div class="flex justify-between my-2">
              <div class="flex">
                <div class="flex items-center">
                  <a
                    id="back-button"
                    href="/files/"
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
                    title="..."
                    class="flex items-center hover:bg-gray-100 cursor-pointer rounded-full m-2"
                  >
                    <div class="px-2 py-2">
                      <div class="bg-neutral-300 rounded-full p-4"></div>
                    </div>
                    <span
                      id="filename"
                      class="font-semibold text-lg text-gray-900 pr-4"
                    ></span>
                  </a>

                  <button
                    id="delete-button"
                    title="Supprimer"
                    class="rounded-full p-2 cursor-pointer text-black bg-red-300 hover:bg-red-400"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-neutral-50 mb-16">
          <div
            id="file-editor"
            class="w-full h-full overflow-auto rounded-lg leading-tight tracking-tight whitespace-pre-wrap break-words font-mono text-sm p-5 focus:outline-none rounded-none resize-none"
            contenteditable="true"
            spellcheck="false"
          ></div>
        </div>

        <nav
          class="absolute bottom-0 left-0 right-0 z-50 fixed max-w-sm mx-auto"
        >
          <div class="grid-cols-2">
            <div class="flex items-center justify-end">
              <a
                id="save-button"
                title="Enregistrer"
                class="flex items-center justify-center w-13 h-13 bg-lime-400 text-lime-800 text-3xl rounded-2xl hover:bg-lime-300/90 cursor-pointer m-5 shadow-md transition-colors duration-300 ease-in-out"
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
                    d="M5 13l4 4L19 7"
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

    {
      const global = {
        app: document.getElementById('app')!,
        fileEditor: document.getElementById('file-editor')!,
        navBar: document.getElementById('nav-bar')!,
        backButton: document.getElementById(
          'back-button'
        )! as HTMLAnchorElement,
        fileName: document.getElementById('filename')!,
        saveButton: document.getElementById('save-button')!,
        deleteButton: document.getElementById('delete-button')!,

        params: {
          path:
            new URLSearchParams(globalThis.location.search).get('path') || '',
        },
      }

      const domain = 'localhost:8443'
      // const domain = 'narval.petermichon.fr'
      const path = `${global.params.path}`
      const url = `https://${domain}/api/v1/files/content?path=${path}`

      const filename = path.split('/').pop() || ''
      global.fileName.textContent = filename

      const returnPath = path.split('/').slice(0, -1).join('/')

      global.backButton.href = `/files/?path=${returnPath}`

      global.backButton.addEventListener('click', (e) => {
        e.preventDefault()
        history.pushState({}, '', `/files${returnPath}`) // TODO
        Router.navigate('/files/') // TODO
      })

      global.saveButton.addEventListener('click', () => {
        saveContent()
      })

      global.fileEditor.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault() // Prevent default behavior (inserting <div> or <br>)
          const selection = globalThis.getSelection()!
          const range = selection.getRangeAt(0)
          const textNode = document.createTextNode('\n')
          range.insertNode(textNode)
          range.setStartAfter(textNode)
          range.setEndAfter(textNode)
          selection.removeAllRanges()
          selection.addRange(range)
        }
      })

      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
          e.preventDefault() // Prevent the browser's save dialog
          saveContent() // Call your save function
        }
      })

      // deno-lint-ignore no-inner-declarations
      function saveContent() {
        const text = global.fileEditor.textContent
        const url = `https://${domain}/api/v1/files/content?path=${path}`

        const res = fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: text,
        })
        res.then(() => {
          global.saveButton.classList.add('bg-white')
          global.saveButton.classList.remove('bg-lime-400')
          setTimeout(() => {
            global.saveButton.classList.add('bg-lime-400')
            global.saveButton.classList.remove('bg-white')
          }, 1000)
        })
      }

      global.deleteButton.addEventListener('click', () => {
        const fileIsEmpty = global.fileEditor.textContent === ''
        if (fileIsEmpty) {
          const url = `https://${domain}/api/v1/files?path=${path}`
          const res = fetch(url, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'text/plain',
            },
          })
          res.then(() => {
            // force return to previous page
            globalThis.location.href = `/files/?path=${returnPath}`
          })
        }
        if (!fileIsEmpty) {
          global.deleteButton.classList.add('bg-neutral-400')
          global.deleteButton.classList.remove('bg-red-300')
          global.deleteButton.classList.remove('hover:bg-red-400')
          setTimeout(() => {
            global.deleteButton.classList.add('hover:bg-red-400')
            global.deleteButton.classList.add('bg-red-300')
            global.deleteButton.classList.remove('bg-neutral-400')
          }, 1000)
        }
      })

      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'text/plain',
        },
      }).then((res) => {
        res.text().then((text) => {
          const content = text
          global.fileEditor.textContent = content
        })
      })

      {
        const node = document.createElement('div')
        node.innerHTML = newNavBarComponent()
        global.navBar.appendChild(node)
      }
    }
  })

  Router.routes.set('/gallery/', () => {
    const html = `
      <div
        class="max-w-sm relative min-h-screen mx-auto flex flex-col font-[Fredoka] antialiased bg-white"
      >
        <div class="absolute bottom-0 left-0 right-0 z-50 h-screen w-5"></div>

        <div class="w-full z-10">
          <div class="px-4">
            <div class="flex justify-between my-2">
              <div class="flex">
                <div class="flex items-center">
                  <a
                    id="back-button"
                    href="/"
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
                      Galerie
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="py-4">
          <div class="max-w-7xl mx-auto">
            <div
              id="pictures-list"
              class="grid grid-cols-3 space-y-0 gap-x-0.25 gap-y-0.25 mb-12"
            ></div>
          </div>
        </div>

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

    {
      const global = {
        app: document.getElementById('app')!,
        picturesList: document.getElementById('pictures-list')!,
        navBar: document.getElementById('nav-bar')!,
        backButton: document.getElementById('back-button')!,
      }

      {
        global.backButton.addEventListener('click', (e) => {
          // if (e.button === 0) { // useless ?
          //   e.preventDefault()
          // }
          e.preventDefault()
          history.pushState({}, '', '/')
          Router.navigate('/')
        })
      }

      const domain = 'localhost:8443'
      const path = `/gallery`
      const url = `https://${domain}/api/v1/files?path=${path}`

      fetch(url).then((res) => {
        res.json().then((files) => {
          for (const file of files) {
            const node = document.createElement('div')
            node.innerHTML = newPictureComponent(file)
            global.picturesList.appendChild(node)
            {
              node.addEventListener('click', (e) => {
                e.preventDefault()
                const path = `/viewer/?path=/gallery/${file.name}`
                history.pushState({}, '', path)
                Router.navigate('/viewer/')
              })
            }
          }
        })
      })

      {
        const node = document.createElement('div')
        node.innerHTML = newNavBarComponent()
        global.navBar.appendChild(node)
      }
    }
  })

  Router.routes.set('/viewer/', () => {
    const html = `
      <div
        class="max-w-sm relative min-h-screen mx-auto flex flex-col font-[Fredoka] antialiased bg-white"
      >
        <div class="absolute bottom-0 left-0 right-0 z-50 h-screen w-5"></div>

        <div class="w-full z-10">
          <div class="px-4">
            <div class="flex justify-between my-2">
              <div class="flex">
                <div class="flex items-center">
                  <a
                    id="back-button"
                    href="/gallery/"
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
                      Galerie
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="py-4">
          <div class="max-w-7xl mx-auto">
            <div id="picture-viewer" class="bg-gray-100"></div>
          </div>
        </div>

        <div class="py-10"></div>

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

    {
      const global = {
        app: document.getElementById('app')!,
        pictureViewer: document.getElementById('picture-viewer')!,
        navBar: document.getElementById('nav-bar')!,
        backButton: document.getElementById('back-button')!,

        params: {
          path:
            new URLSearchParams(globalThis.location.search).get('path') || '',
        },
      }

      {
        global.backButton.addEventListener('click', (e) => {
          // if (e.button === 0) { // useless ?
          //   e.preventDefault()
          // }
          e.preventDefault()
          history.pushState({}, '', '/gallery/')
          Router.navigate('/gallery/')
        })
      }

      const domain = 'localhost:8443'
      const path = `${global.params.path}`
      const url = `https://${domain}/api/v1/files/content?path=${path}`

      const node = document.createElement('div')
      node.innerHTML = `
          <div class="w-full h-full rounded-xs">
            <img
              class="object-cover w-full h-full"
              src="${url}"
              alt="${path}"
              style="image-rendering: auto"
            />
          </div>
        `
      global.pictureViewer.appendChild(node)

      {
        const node = document.createElement('div')
        node.innerHTML = newNavBarComponent()
        global.navBar.appendChild(node)
      }
    }
  })
}

export { loadRoutes }
