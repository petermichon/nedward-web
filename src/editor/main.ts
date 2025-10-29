import { newNavBarComponent } from '../components/nav.ts'

const global = {
  app: document.getElementById('app')!,
  fileEditor: document.getElementById('file-editor')!,
  navBar: document.getElementById('nav-bar')!,
  backButton: document.getElementById('back-button')! as HTMLAnchorElement,
  fileName: document.getElementById('filename')!,
  saveButton: document.getElementById('save-button')!,
  deleteButton: document.getElementById('delete-button')!,

  params: {
    path: new URLSearchParams(globalThis.location.search).get('path') || '',
  },
}

function main() {
  const domain = 'localhost:8443'
  // const domain = 'narval.petermichon.fr'
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

  {
    const node = document.createElement('div')
    node.innerHTML = newNavBarComponent()
    global.navBar.appendChild(node)
  }
}

export { main }
