const apiKey = 'b340fbfa288c7fbe12cd5062b4dc18c5';
const apiEndPoint = 'https://api.themoviedb.org/3/';
const youtubeAPIKey = 'AIzaSyATRYW9EilaOMU4QweVCpnfwVGniPm7RNk';
const apiPaths = {
    getAllCategories: `${apiEndPoint}/genre/movie/list?api_key=${apiKey}&language=en-US`,
    getMovies: (genre)=> `${apiEndPoint}/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=1&with_watch_monetization_types=flatrate&with_genres=${genre}`,
    frontUrl: 'https://image.tmdb.org/t/p/original',
    getTrending: `${apiEndPoint}/trending/movie/day?api_key=${apiKey}&language=en-US`,
    youtubeTrailer: (query)=> `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyATRYW9EilaOMU4QweVCpnfwVGniPm7RNk`,
    videoUrl: (video_id) => `https://www.youtube.com/watch?v=${video_id}`
}
const init = ()=> {
    trendingSection();
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
    return fetch(url).then((res)=> res.json()).then((res)=> {
        const movies = res.results;
         const moviesCont = document.querySelector('.movies-cont');

        const htmlImgElements = movies.slice(0,4).map((movie)=>{
         return `
         <div class="movie-item">
         <img class="movie-image" alt="${movie.title}" src="${apiPaths.frontUrl}${movie.backdrop_path}">
         <iframe class="movie-item-iframe" id="${movie.id}" onmouseover="getYoutubeTrailer('${movie.title}','${movie.id}')"
         src="">
         </iframe>
         </div>
         `
         
        }).join("");
        console.log(htmlImgElements);
         const div = document.createElement('div');
         div.className = 'movies-section';
         div.innerHTML = `<h2 class="movies-heading-text">${category}<span class="explore">Explore all</span></h2>
         <div class="movies-images flex">
            ${htmlImgElements}
         </div>`;
         moviesCont.append(div);
         return movies;
    }).catch((e)=>{console.log(e)});
}

const trendingSection = ()=>{
       getMoviesandBuild(apiPaths.getTrending,'Trending').then((list)=>{
        console.log(list);
        const bannerSection = document.querySelector('.banner-section');
        const index = parseInt(Math.random()*(list.length));
        console.log(index);
        bannerSection.style.backgroundImage = `url(${apiPaths.frontUrl}${list[index].backdrop_path})`;
        const div = document.createElement('div');
        div.className = 'banner-content flex';
        div.innerHTML = `<h1 class="banner-section-heading">${list[index].original_title}</h1>
        <p class="banner-section-subheading">
            Trending in Movies 
        </p>
        <p class="banner-section-text">
           ${list[index].overview.length > 200 ? list[index].overview.substring(0,200) + "..." : list[index].overview}
        </p>
        <div class="banner-btns flex">
            <button class="banner-action-button flex">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
                class="Hawkins-Icon Hawkins-Icon-Standard">
                <path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor">
                </path>
            </svg>
            Play
            </button>
            <button class="banner-action-button flex">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path></svg>
                More Info</button>
        </div>`;
        bannerSection.append(div);

     }).catch((e)=>{console.log(e)});
}
 function getYoutubeTrailer(query,id)
{
    
    const url = apiPaths.youtubeTrailer(query);
    fetch(url).then((res)=>res.json()).then((res)=>{
    const item = res.items[0];
    console.log(item);
    const video_id = item.id.videoId;
    console.log(id);
    const frame = document.getElementById(`${id}`);
    console.log(frame);
    console.log(`https://www.youtube.com/embed/${video_id}?autoplay=1`);
    frame.src =  `https://www.youtube.com/embed/${video_id}?autoplay=1`;
    }).catch((e)=>{console.log(e)});
}
window.addEventListener('load',()=>{
    init();
})

window.addEventListener('scroll',()=>{
    const header = document.querySelector('.header');
    if(window.scrollY > 5)
    {
        
        header.classList.add('bg-black');
    }
    else {
        header.classList.remove('bg-black');
    }
})
