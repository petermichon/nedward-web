const app = document.getElementById('app')!

function pageExample() {
  document.title = 'Newdard - Example'
  const html = `
      <p class='text-white font-semibold font-[MavenPro] p-3 text-2xl'>Example</p>
    `
  app.innerHTML = html
  // app.replaceChildren(html)
}

export { pageExample }
