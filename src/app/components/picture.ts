type File = {
  name: string
  // isFile: boolean
}

function newPictureComponent(picture: File): string {
  const html = `
    <a href="/viewer/?path=/gallery/${picture.name}">
      <div
        class="relative aspect-[3/4] overflow-hidden rounded-sm cursor-pointer hover:text-white bg-neutral-300 hover:opacity-80"
      >
        <img
          class="object-cover w-full h-full"
          src="https://localhost:8443/api/v1/files/content?path=/gallery/${picture.name}"
          alt="${picture.name}"
          style="image-rendering: auto"
        />
      </div>
    </a>
  `
  return html
}

export { newPictureComponent }
