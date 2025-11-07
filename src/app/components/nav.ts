type Nav = {
  title: string
  path: string
  icon: string
}

function newNavBarComponent() {
  const navs: Nav[] = [
    {
      title: 'Accueil',
      path: '/collections/',
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
      title: 'Galerie',
      path: '/gallery/',
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
            d="M4 16l4.586-4.586a2 2 0 112.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      `,
    },
    {
      title: 'Compte',
      path: '',
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

  const navss: string[] = []
  for (const nav of navs) {
    navss.push(newNavComponent(nav))
  }
  const navsStr = navss.join('')

  const navsList = `
    <ul
      class="flex justify-around items-center h-16 grid grid-cols-3 border-t border-gray-200 backdrop-blur-lg"
    >
      ${navsStr}
    </ul>
  `
  return navsList
}

function newNavComponent(nav: Nav): string {
  const html = `
      <div
        class="flex items-center justify-center h-full"
      >
        <a
          href="${nav.path}"
          title="${nav.title}"
          class="rounded-full p-4 hover:bg-gray-100 text-gray-500 hover:text-black cursor-pointer"
        >
          ${nav.icon}
        </a>
      </div>
  `

  return html
}

export { newNavComponent, newNavBarComponent }
