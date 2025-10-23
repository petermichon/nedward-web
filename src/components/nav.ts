type Nav = {
  title: string
  icon: string
}

function newNavComponent(nav: Nav): string {
  const html = `
    <li class="w-full h-full">
      <div
        class="flex items-center justify-center h-full"
      >
        <a
          href=""
          title="${nav.title}"
          class="rounded-full p-4 hover:bg-gray-100 text-gray-500 hover:text-black cursor-pointer"
        >
          ${nav.icon}
        </a>
      </div>
    </li>  
  `

  return html
}

export { newNavComponent }
