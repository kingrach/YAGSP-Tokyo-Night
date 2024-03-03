/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"XYMGGWPfqd7FFJPd","label":"reddit","bookmarks":[{"id":"4g2c1eFLrlWKiquz","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"jlrMxuUVzF6AnCoa","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"gsf4ufbKKOH6CBW1","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"CwdObeh8U7hjyhIh","label":"design tools","bookmarks":[{"id":"tmdJZCdEkJfgvGRd","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"77kv2SSgN43eo9od","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"coKD27l30NqS00o5","label":"haikei","url":"https://app.haikei.app/"},{"id":"I5KqHBh562buglVE","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"jFYOxdgBiMOx3kRT","label":"worth reading","bookmarks":[{"id":"LU4N1qJ7WmHYjx5i","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"dRmaTYGKot6kw59z","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"nSuL0HFwfDApkp1g","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"ttwOPQiwRuzNKphN","label":"sources","bookmarks":[{"id":"6OccpuERafW0Owwv","label":"icons","url":"https://feathericons.com/"},{"id":"bhNhD42wRxDFZ5Uk","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"BTrXmHQpvfVg34vZ","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"SDv9FOGR1qvUKLAu","label":"author","url":"https://prettycoffee.github.io/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
