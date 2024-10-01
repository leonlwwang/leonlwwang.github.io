export const loadPage = async (url, selector) => {
  const element = document.querySelector(selector)
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to load page ${url}: ${response.statusText}`)
    }
    const html = await response.text()
    element.innerHTML = html
  } catch (e) {
    console.error(`Page retrival failed: ${e}`)
  }
}
