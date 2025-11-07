function pageFiles() {
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

  return html
}

export { pageFiles }
