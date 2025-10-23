import { newNavComponent } from '../components/nav.ts'

const global = {
  app: document.getElementById('app')!,
  fileEditor: document.getElementById('file-editor')!,
  navsList: document.getElementById('navs-list')!,
  backButton: document.getElementById('back-button')! as HTMLAnchorElement,
  fileName: document.getElementById('filename')!,
  saveButton: document.getElementById('save-button')!,
  deleteButton: document.getElementById('delete-button')!,

  params: {
    path: new URLSearchParams(globalThis.location.search).get('path') || '',
  },
}

function main() {
  // const domain = 'localhost:8443'
  const domain = 'narval.petermichon.fr'
  const path = `${global.params.path}`
  const url = `https://${domain}/api/v1/files/content?path=${path}`

  const filename = path.split('/').pop() || ''
  global.fileName.textContent = filename

  const returnPath = path.split('/').slice(0, -1).join('/')

  global.backButton.href = `/files/?path=${returnPath}`

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
