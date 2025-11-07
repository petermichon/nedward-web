function createElement(e: { tag: string; class?: string; text?: string }) {
  const element = document.createElement(e.tag)
  element.className = e.class || ''
  element.innerText = e.text || ''
  return element
}
