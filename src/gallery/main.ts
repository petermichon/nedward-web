import { newNavBarComponent } from '../components/nav.ts'
import { newPictureComponent } from '../components/picture.ts'

const global = {
  app: document.getElementById('app')!,
  picturesList: document.getElementById('pictures-list')!,
  navBar: document.getElementById('nav-bar')!,
}

function main() {
  const domain = 'localhost:8443'
  const path = `/gallery`
  const url = `https://${domain}/api/v1/files?path=${path}`

  fetch(url).then((res) => {
    res.json().then((files) => {
      for (const file of files) {
        const node = document.createElement('div')
        node.innerHTML = newPictureComponent(file)
        global.picturesList.appendChild(node)
      }
    })
  })

  {
    const node = document.createElement('div')
    node.innerHTML = newNavBarComponent()
    global.navBar.appendChild(node)
  }
}

export { main }
