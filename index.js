const apiKey = 'b340fbfa288c7fbe12cd5062b4dc18c5';
const apiEndPoint = 'https://api.themoviedb.org/3/';

const apiPaths = {
    getAllCategories: `${apiEndPoint}/genre/movie/list?api_key=${apiKey}&language=en-US`,
    getMovies: (genre)=> `${apiEndPoint}/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=1&with_watch_monetization_types=flatrate&with_genres=${genre}`,
    frontUrl: 'https://image.tmdb.org/t/p/original'
}
const init = ()=> {

    getAllGenres();
    
}
const getAllGenres = ()=>{
    fetch(apiPaths.getAllCategories).then((res)=> res.json())
    .then((res)=> {
        const genres = res.genres;
        genres.forEach((genre) => {
            getMoviesandBuild(apiPaths.getMovies(genre.id),genre.name);
        })
    }    
    ).catch((e)=> e);
}

const getMoviesandBuild = (url,category)=>{
    console.log(url,category);
    fetch(url).then((res)=> res.json()).then((res)=> {
        const movies = res.results;
         const moviesCont = document.querySelector('.movies-cont');
        const htmlImgElements = movies.map((movie)=>{
          return `<img class="movie-image" alt="${movie.title}" src="${apiPaths.frontUrl}${movie.backdrop_path}">`
        }).join("");
         const div = document.createElement('div');
         div.className = 'movies-section';
         div.innerHTML = `<h2 class="movies-heading-text">${category}<span class="explore">Explore all</span></h2>
         <div class="movies-images flex">
            ${htmlImgElements}
         </div>`;
         moviesCont.append(div);
    }).catch((e)=>{console.log(e)});
}

window.addEventListener('load',()=>{
    init();
})