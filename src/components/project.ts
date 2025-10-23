type Project = {
  title: string
  description: string
  color: string
  path: string
}

function newProjectComponent(project: Project): string {
  const html = `
    <a
      href="${project.path}"
      title="${project.title}"
      class="block feature-card relative ease-in-out p-6 rounded-xl cursor-pointer hover:bg-gray-100 hover:text-white"
    >
      <div class="flex">
        <div class="">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-neutral-300 rounded-full p-3"></div>
            <div class="ml-5">
              <h3 class="text-lg leading-6 font-medium text-black">
                ${project.title}
              </h3>
            </div>
          </div>

          <div class="mt-2 text-gray-500">
            <p>${project.description}</p>
          </div>
        </div>

        <div class="ml-auto flex items-center">
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
    </a>`

  return html
}

export { newProjectComponent }
