const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-rw");
const links = document.querySelectorAll(".nav-rw li");

const input = document.querySelector("#input");
const search = document.querySelector("#search");



hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  links.forEach((link) => {
    link.classList.toggle("fade");
  });
});

const API_KEY = 'b60f9e3c';//"443b5859";

const API_URL ="http://www.omdbapi.com/?i=tt3896198&apikey=" + API_KEY;

const trendingMovies = document.querySelector(".movie-img-container");
const expandMovieContainer = document.querySelector(".bg-img");
let expandMovie = ''

function expand(id){
  axios.get(API_URL).then(function (response) {
    const moviesData = response.data;
    [moviesData].map((item)=> {
      
      if(item.Title == id ){
        expandMovie = `
    <div class="banner-container">
    <img src="${item.Poster} style="margin-top:30px" />
    <div class="banner-text"  style="margin-top:-20px ;background-color:black;border-style:solid;border-width:30px;border-color:black;border-radius:25px">
      <h1 id="movie-text" style="font-family:'clash displayR';font-weight:500; margin-top:-30px;color:orange">"${item.Title}"</h1>
      <div style="font-size:12px;margin-top:-30px">
      <p>
      ${item.Genre}
      </p>

      <p style="width:80%">
      ${item.Plot}
      </p>
      <p>
      Actors: ${item.Actors}
      </p>
      <p>
      ${item.Released}<span><i class="fas fa-star"></i>${item.imdbVotes}</span>
      </p>
      </div>
      <p id="movie-pretext">Exclusive Trailer HD</p>
    </div>
    <div class="play-logo"><i class="far fa-play-circle"></i></div>
  </div>
  `}
  expandMovieContainer.innerHTML = expandMovie;
    });
})}
//Main AXIOUSSSSS
//axios.get(API_URL).then(function (response) { 
 let x =  (async()=>{
    try {
      let response = await fetch(API_URL);
      let data = await response.json();
      console.log(data)

  const moviesData = data//response.data;
  let trendingMoviesHTML = "";
  console.log(moviesData);
  let y = document.createElement('div');

  [moviesData].map((item)=> {  
   

    let x = document.createElement('div');
x.classList.add('movie-img-card');
x.innerHTML = `
  <img
    src="${item.Poster}"
    id="exp"
    alt=""
    style="cursor:pointer"
  />
  <h4 class="titlee">${item.Title}</h4>
  <p>
  ${item.Released}<span><i class="fas fa-star"></i>${item.imdbVotes}</span>
  </p>
`;
x.addEventListener('click', () => {
  expand(item.Title);
});

     y.appendChild(x)
    
  });
  trendingMovies.appendChild(y);

  
} catch (error) {
  expandMovie = `<h1>Network Error Reload Page!</h1>`
  expandMovieContainer.innerHTML = expandMovie;
  }
})();
//})

  input.addEventListener("keyup", (e) => {
     
    let searchMovies = ""
    axios.get(API_URL).then(function (response) {
  
      const moviesData = response.data;

    [moviesData].map((item)=> {
      console.log(item?.Title.toLowerCase().includes( e.target.value.toLowerCase()))

      if(item?.Title.toLowerCase().includes( e.target.value.toLowerCase())){
      searchMovies  += `
        <div class="movie-img-card">
        <img
          src="${item.Poster}"
          alt=""
          style="cursor:pointer"
          onClick= "${expand(item.Title)}"
        />
        
        <h4 class="titlee">${item.Title}</h4>
        <p>
        ${item.Released}<span><i class="fas fa-star"></i>${item.imdbVotes}</span>
        </p>
      </div>
        `;}
    });
    trendingMovies.innerHTML = searchMovies;
    });
  });
  

