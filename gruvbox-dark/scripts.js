/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Greeting and Weather
 */

function greetingWeather() {
  let greetingText;
  const date = new Date();
  const hour = date.getHours();

  if (hour >= 5 && hour <= 11) {      // 05:00 to 11:00
    greetingText = "Good morning, Rachel.";
  } else if (hour >= 12 && hour <= 17) {      // 12:00 to 17:00
    greetingText = "Good afternoon, Rachel.";
  } else if (hour >= 18 && hour <= 21) {      // 18:00 to 21:00
    greetingText = "Good evening, Rachel.";
  } else if (hour >= 22 || hour <= 4) {       // 22:00 to 04:00
    greetingText = "Good night, Rachel.";
  } else {
    greetingText = "Hello, Rachel.";
  }

  if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
          function (position) {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;
              const apiKey = "518139f7a0c9b125beed32a90e71ad39";
              const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

              fetch(url)
                  .then(response => response.json())
                  .then(weather => {
                      const temp = Math.round(weather.main.temp);
                      const iconCode = weather.weather[0].icon;
                      let weatherIcon;

                      switch (iconCode) {
                          // Handle weather icon codes
                          case "01d":
                            weatherIcon = "wi-day-sunny";
                            break;
                          // Clear Night
                          case "01n":
                            weatherIcon = "wi-night-clear";
                            break;
                          // Few Clouds Day
                          case "02d":
                            weatherIcon = "wi-day-cloudy";
                            break;
                          // Few Clouds Night
                          case "02n":
                            weatherIcon = "wi-night-alt-cloudy";
                            break;
                          // Scattered Clouds Day
                          case "03d":
                            weatherIcon = "wi-day-cloudy-high";
                            break;
                          // Scattered Clouds Night
                          case "03n":
                            weatherIcon = "wi-night-alt-cloudy-high";
                            break;
                          // Broken Clouds Day
                          case "04d":
                            weatherIcon = "wi-cloudy";
                            break;
                          // Broken Clouds Night
                          case "04n":
                            weatherIcon = "wi-cloudy";
                            break;
                          // Shower Rain Day
                          case "09d":
                            weatherIcon = "wi-day-showers";
                            break;
                          // Shower Rain Night
                          case "09n":
                            weatherIcon = "wi-night-alt-showers";
                            break;
                          // Rain Day
                          case "10d":
                            weatherIcon = "wi-day-rain";
                            break;
                          // Rain Night
                          case "10n":
                            weatherIcon = "wi-night-alt-rain";
                            break;
                          // Thunderstorm Day
                          case "11d":
                            weatherIcon = "wi-day-thunderstorm";
                            break;
                          // Thunderstorm Night
                          case "11n":
                            weatherIcon = "wi-night-alt-thunderstorm";
                            break;
                          // Snow Day
                          case "13d":
                            weatherIcon = "wi-day-snow";
                            break;
                          // Snow Night
                          case "13n":
                            weatherIcon = "wi-night-alt-snow";
                            break;
                          // Mist Day
                          case "50d":
                            weatherIcon = "wi-day-fog";
                            break;
                          // Mist Night
                          case "50n":
                            weatherIcon = "wi-night-fog";
                            break;
                      }

                      document.getElementById("greeting").innerHTML = `<span style="float:left;">${greetingText}</span> <span style="float:right;"><i class="wi ${weatherIcon}"></i> ${temp}°C</span>`;
                  })
                  .catch(error => console.error("Error fetching weather data:", error));
          },
          function (error) {
              console.error("Error getting location:", error.message);
          }
      );
  } else {
      console.error("Geolocation is not available in this browser.");
  }
}

greetingWeather();

/**
 * Random Images
 */

var images = [
  "https://kingrach.github.io/YAGSP-Tokyo-Night/gruvbox-dark/img/01.gif",
  "https://kingrach.github.io/YAGSP-Tokyo-Night/gruvbox-dark/img/02.gif",
  "https://kingrach.github.io/YAGSP-Tokyo-Night/gruvbox-dark/img/03.gif",
  "https://kingrach.github.io/YAGSP-Tokyo-Night/gruvbox-dark/img/04.gif",
  "https://kingrach.github.io/YAGSP-Tokyo-Night/gruvbox-dark/img/05.gif",
  "https://kingrach.github.io/YAGSP-Tokyo-Night/gruvbox-dark/img/06.gif",
  "https://kingrach.github.io/YAGSP-Tokyo-Night/gruvbox-dark/img/07.gif",
  "https://kingrach.github.io/YAGSP-Tokyo-Night/gruvbox-dark/img/08.gif",
  "https://kingrach.github.io/YAGSP-Tokyo-Night/gruvbox-dark/img/09.gif",
  "https://kingrach.github.io/YAGSP-Tokyo-Night/gruvbox-dark/img/10.gif",
  "https://kingrach.github.io/YAGSP-Tokyo-Night/gruvbox-dark/img/11.jpg"
];
function getImg() {
  var img = '<img src=\"';
  var randomIndex = Math.floor(Math.random() * images.length);
  img += images[randomIndex];
  img += '\" alt=\"\"/>';
  return img;
}

/**
 * Search function
 */

/** const searchInput = document.querySelector("#searchbar > input")
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
searchButton.onclick = search */

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"me","label":"<h2 style='color:var(--color-palette-red);         font-size: calc(var(--font-size) * var(--space-medium));font-weight: 500;margin: 0;'>me</h2>","bookmarks":
                  [{"id":"gmail","label":"gmail","url":"https://mail.google.com/"},{"id":"health-online","label":"health online","url":"https://www.myhealthonline-inps2.wales.nhs.uk/"},{"id":"open-uni","label":"open uni","url":"https://open.ac.uk/"},{"id":"ao3","label":"ao3","url":"https://archiveofourown.org/"}]},
                  {"id":"social","label":"<h2 style='color:var(--color-palette-green);font-size: calc(var(--font-size) * var(--space-medium));font-weight: 500;margin: 0;'>social</h2>","bookmarks":
                  [{"id":"facebook","label":"facebook","url":"https://www.facebook.com"},{"id":"reddit","label":"reddit","url":"https://reddit.com/"},{"id":"tumblr","label":"tumblr","url":"https://www.tumblr.com/"},{"id":"youtube","label":"youtube","url":"https://www.youtube.com/"}]},
                  {"id":"shopping","label":"<h2 style='color:var(--color-palette-yellow);font-size: calc(var(--font-size) * var(--space-medium));font-weight: 500;margin: 0;'>shopping</h2>","bookmarks":
                  [{"id":"amazon","label":"amazon","url":"https://www.amazon.co.uk/"},{"id":"etsy","label":"etsy","url":"https://www.etsy.com/"},{"id":"aliexpress","label":"aliexpress","url":"https://www.aliexpress.com"},{"id":"vinted","label":"vinted","url":"https://www.vinted.co.uk"}]},
                  {"id":"other","label":"<h2 style='color:var(--color-palette-blue);font-size: calc(var(--font-size) * var(--space-medium));font-weight: 500;margin: 0;'>other</h2>","bookmarks":
                  [{"id":"unicode","label":"unicode symbols","url":"https://www.vertex42.com/ExcelTips/unicode-symbols.html/"},{"id":"github","label":"github","url":"https://www.github.com/"},{"id":"sheet","label":"sleep sheet","url":"https://docs.google.com/spreadsheets/d/13t7j8dkb66OXElYwu5Ov9MUAYhFfTdKOYOQeMv1HDAQ/edit#gid=1973172189"},{"id":"wiki","label":"sleep wiki","url":"https://pks.raenonx.cc/en"}]}]

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
