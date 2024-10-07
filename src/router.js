export const loadPage = async (url, selector) => {
  const element = document.querySelector(selector)
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to load page ${url}: ${response.statusText}`)
    }
    console.log(element.innerHTML)
    const html = await response.text()
    element.innerHTML = html
    console.log(element.innerHTML)
  } catch (e) {
    console.error(`Page retrival failed: ${e}`)
  }
}
