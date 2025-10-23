import { newNavComponent } from '../components/nav.ts'
import { newPictureComponent } from '../components/picture.ts'

const global = {
  app: document.getElementById('app')!,
  picturesList: document.getElementById('pictures-list')!,
  navsList: document.getElementById('navs-list')!,
}

function main() {
  const pictures = [
    {
      title: 'Mon Site Web',
      description: '5 fichiers',
      color: '#A3E635',
    },
    {
      title: 'Galerie',
      description: '20 images',
      color: '#35E6D1',
    },
    {
      title: 'Stockage',
      description: '600 Mo de données',
      color: '#7835E6',
    },
    {
      title: 'Playlist',
      description: '30 fichiers audio',
      color: '#E6354A',
    },
    {
      title: 'Mon Site Web',
      description: '5 fichiers',
      color: '#A3E635',
    },
    {
      title: 'Galerie',
      description: '20 images',
      color: '#35E6D1',
    },
    {
      title: 'Stockage',
      description: '600 Mo de données',
      color: '#7835E6',
    },
    {
      title: 'Playlist',
      description: '30 fichiers audio',
      color: '#E6354A',
    },
    {
      title: 'Mon Site Web',
      description: '5 fichiers',
      color: '#A3E635',
    },
    {
      title: 'Galerie',
      description: '20 images',
      color: '#35E6D1',
    },
    {
      title: 'Stockage',
      description: '600 Mo de données',
      color: '#7835E6',
    },
    {
      title: 'Playlist',
      description: '30 fichiers audio',
      color: '#E6354A',
    },
    {
      title: 'Mon Site Web',
      description: '5 fichiers',
      color: '#A3E635',
    },
    {
      title: 'Galerie',
      description: '20 images',
      color: '#35E6D1',
    },
    {
      title: 'Stockage',
      description: '600 Mo de données',
      color: '#7835E6',
    },
    {
      title: 'Playlist',
      description: '30 fichiers audio',
      color: '#E6354A',
    },
    {
      title: 'Mon Site Web',
      description: '5 fichiers',
      color: '#A3E635',
    },
    {
      title: 'Galerie',
      description: '20 images',
      color: '#35E6D1',
    },
    {
      title: 'Stockage',
      description: '600 Mo de données',
      color: '#7835E6',
    },
    {
      title: 'Playlist',
      description: '30 fichiers audio',
      color: '#E6354A',
    },
    {
      title: 'Mon Site Web',
      description: '5 fichiers',
      color: '#A3E635',
    },
    {
      title: 'Galerie',
      description: '20 images',
      color: '#35E6D1',
    },
    {
      title: 'Stockage',
      description: '600 Mo de données',
      color: '#7835E6',
    },
    {
      title: 'Playlist',
      description: '30 fichiers audio',
      color: '#E6354A',
    },
    {
      title: 'Mon Site Web',
      description: '5 fichiers',
      color: '#A3E635',
    },
    {
      title: 'Galerie',
      description: '20 images',
      color: '#35E6D1',
    },
    {
      title: 'Stockage',
      description: '600 Mo de données',
      color: '#7835E6',
    },
    {
      title: 'Playlist',
      description: '30 fichiers audio',
      color: '#E6354A',
    },
    {
      title: 'Mon Site Web',
      description: '5 fichiers',
      color: '#A3E635',
    },
    {
      title: 'Galerie',
      description: '20 images',
      color: '#35E6D1',
    },
    {
      title: 'Stockage',
      description: '600 Mo de données',
      color: '#7835E6',
    },
    {
      title: 'Playlist',
      description: '30 fichiers audio',
      color: '#E6354A',
    },
    {
      title: 'Mon Site Web',
      description: '5 fichiers',
      color: '#A3E635',
    },
    {
      title: 'Galerie',
      description: '20 images',
      color: '#35E6D1',
    },
    {
      title: 'Stockage',
      description: '600 Mo de données',
      color: '#7835E6',
    },
    {
      title: 'Playlist',
      description: '30 fichiers audio',
      color: '#E6354A',
    },
  ]

  for (const picture of pictures) {
    const node = document.createElement('div')
    node.innerHTML = newPictureComponent(picture)
    global.picturesList.appendChild(node)
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
