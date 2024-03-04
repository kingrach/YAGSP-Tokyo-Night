/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Greeting
 */

// Get current hour
var currentHour = new Date().getHours();

// Function to determine greeting based on the hour
function greeting(hour) {
  var greetingText;
  if (hour >=5 && hour <= 11) {
    greetingText = "Good morning";
  } else if (hour >= 12 && hour <= 16) {
    greetingText = "Good afternoon";
  } else if ((hour >= 17 && hour <= 23) || (hour >= 0 && hour <= 4)) {
    greetingText = "Good evening";
  } else {
    greetingText = "Hello";
  }
  return greetingText;
}

// Set the greeting text in the HTML element with id "greeting"
document.getElementById("greeting").innerHTML = greeting(currentHour);

/**
 * Random Images
 */

var images = [
  "https://kingrach.github.io/YAGSP-Tokyo-Night/img/01.gif",
  "https://kingrach.github.io/YAGSP-Tokyo-Night/img/02.gif",
  "https://kingrach.github.io/YAGSP-Tokyo-Night/img/03.gif",
  "https://kingrach.github.io/YAGSP-Tokyo-Night/img/04.gif",
  "https://kingrach.github.io/YAGSP-Tokyo-Night/img/05.gif",
  "https://kingrach.github.io/YAGSP-Tokyo-Night/img/06.gif",
  "https://kingrach.github.io/YAGSP-Tokyo-Night/img/07.gif",
  "https://kingrach.github.io/YAGSP-Tokyo-Night/img/08.gif"
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

/**
 * Weather
 */

function displayWeather() {
  // Get location
  if ("geolocation" in navigator) {
      // Request location
      navigator.geolocation.getCurrentPosition(
          function (position) {
              // Extract lat and lon
              var lat = position.coords.latitude;
              var lon = position.coords.longitude;
              
              // Call fetchWeather inside getCurrentPosition to ensure lat and lon are available
              fetchWeather(lat, lon);
          },
          function (error) {
              console.error("Error getting location: ", error.message);
          }
      );
  } else {
      console.error("Geolocation is not available in this browser.");
  }

  function fetchWeather(lat, lon) {
    var apiKey = "518139f7a0c9b125beed32a90e71ad39";
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(weather => {
            // Get weather data
            const temp0 = weather.main.temp;
            const temp = Math.round(temp0);
            const iconCode = weather.weather[0].icon;
            let weatherIcon = "";

            // Convert Icon Code to Weather Icon
            switch(iconCode) {
                // Clear Day
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

            document.getElementById("weather").innerHTML = "<i class='wi " + weatherIcon + "></i> <span>" + temp + "°C</span>";
        })
        .catch(error => console.log(error));
  }
}

// Initial call
displayWeather();