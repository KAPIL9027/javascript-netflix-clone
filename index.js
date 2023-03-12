const apiKey = 'b340fbfa288c7fbe12cd5062b4dc18c5';
const apiEndPoint = 'https://api.themoviedb.org/3/';

const apiPaths = {
    getAllCategories: `${apiEndPoint}/genre/movie/list?api_key=${apiKey}&language=en-US`,
    getMovies: (genre)=> `${apiEndPoint}/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=1&with_watch_monetization_types=flatrate&with_genres=${genre}`
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
}
window.addEventListener('load',()=>{
    init();
})