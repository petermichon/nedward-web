type Picture = {
  title: string
  description: string
  color: string
}

function newPictureComponent(picture: Picture): string {
  const html = `
    <div
      class="aspect-[3/4] feature-card relative ease-in-out rounded-sm cursor-pointer hover:text-white bg-neutral-300 hover:opacity-80"
    ></div>
  `
  return html
}

export { newPictureComponent }
