import { newNavBarComponent } from '../components/nav.ts'
import { newPictureComponent } from '../components/picture.ts'

const global = {
  app: document.getElementById('app')!,
  pictureViewer: document.getElementById('picture-viewer')!,
  navBar: document.getElementById('nav-bar')!,

  params: {
    path: new URLSearchParams(globalThis.location.search).get('path') || '',
  },
}

function main() {
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

export { main }
