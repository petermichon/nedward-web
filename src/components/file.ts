type File = {
  name: string
  isFile: boolean
}

function newFileComponent(file: File, path: string): string {
  const fullpath = `${path}/${file.name}`
  const page = file.isFile ? `editor` : `files`
  const href = `/${page}/?path=${fullpath}`

  const html = `
    <a
      href="${href}"
      title="${file.name}"
      class="block feature-card relative ease-in-out rounded-xl cursor-pointer hover:bg-gray-100"
    >
      <div class="flex">
        <div class="flex items-center p-2">
          <div class="bg-neutral-300 rounded-2xl ml-1 p-5"></div>
        </div>
        <div class="flex flex-col justify-center truncate ml-1 px-2">
          <div class="text-lg leading-6 font-medium text-black ">
            ${file.isFile ? '📄' : '📁'} ${file.name}
          </div>
        </div>

        <div class="ml-auto flex items-center p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </a>
  `

  return html
}

export { newFileComponent }
