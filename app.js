const TEXT__INPUT__FIELD = document.getElementById("text__input__field");
console.log(TEXT__INPUT__FIELD);

const SEARCH__BTN = document.getElementById("search__btn");
console.log(SEARCH__BTN);
let MOVIE__INFO__CONTAINER = document.getElementById("movie__info__container");

SEARCH__BTN.addEventListener("click", getMovieInfo);

// create a function called getMovieInfo
async function getMovieInfo(e) {
  // this is to prevent the form from auto refreshing
  e.preventDefault();
  // the movie to search for
  const movieTitle = TEXT__INPUT__FIELD.value.trim();

  // show loading text while getting the movie

  MOVIE__INFO__CONTAINER.innerHTML = `<section class= "flex justify-center items-center max-w-[600px] bg-white p-4 rounded-md gap-5>
  <h1 class="text-[2rem] bg-white p-2 rounded-md font-bold">Getting movie...</h1>
  <div class="loader" ></div>
  </section>`;
  try {
    // make an https request to the movie api
    const data = await fetch(
      `https://www.omdbapi.com/?apikey=d825d899&t=${movieTitle}`
    );

    const movieInfo = await data.json();

    // check if movie was not found
    if (movieInfo.Error) {
      MOVIE__INFO__CONTAINER.innerHTML = `<h1 class="text-[10rem] bg-white">${movieInfo.Error}</h1>`;
      return;
    }

    // showing the actual movie info
    MOVIE__INFO__CONTAINER.innerHTML = ` <section
          class="flex flex-col lg:flex-row gap-5 max-w-[600px] w-full justify-between bg-white p-4 rounded-lg"
        >
          <div>
            <h2 class="text-3xl font-bold tracking-wider">${movieInfo.Title}</h2>
            <p>
              <strong class="mr-2">Year:</strong>
              <span class="text-gray-500">${movieInfo.Year}</span>
            </p>
            <p>
              <strong class="mr-2">Released:</strong>
              <span class="text-gray-500">${movieInfo.Released}</span>
            </p>
            <p>
              <strong class="mr-2">Duration:</strong>
              <span class="text-gray-500">${movieInfo.Runtime}</span>
            </p>
            <p>
              <strong class="mr-2">Genre:</strong>
              <span class="text-gray-500">${movieInfo.Genre}</span>
            </p>
            <p>
              <strong class="mr-2">Director:</strong>
              <span class="text-gray-500">${movieInfo.Director}</span>
            </p>
            <p>
              <strong class="mr-2">Plot:</strong>
              <span class="text-gray-500">${movieInfo.Plot}</span>
            </p>
            <p>
              <strong class="mr-2">Awards:</strong>
              <span class="text-gray-500">${movieInfo.Awards}</span>
            </p>
          </div>
          <div>
            <img
              class="max-w-[600px] w-full rounded-md"
              src=${movieInfo.Poster}
              alt="movie poster"
            />
          </div>
        </section>`;
    console.log(movieInfo);
  } catch (error) {
    console.log(error);
  }
}
