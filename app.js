const searchBox = document.querySelector('header .searchBox');
navBar = document.querySelector('header.navbar'),
searchBtn = document.querySelector('header .searchBtn'),
movieContainer = document.querySelector('.movie_container');

window.addEventListener("scroll", ()=>{
  navBar.classList.toggle("sticky", window.scrollY > 200);
});

const API_URL="https://omdbapi.com/?s=thor&page=1&apikey=d9b202e4";

  movieContainer.innerHTML=`
    <div class="loading_Card">
    <img src="Images/loader-img.png" alt="loading image">
    <h2>Loading movies...</h2>
    </div>`;
    movieContainer.style.height="auto";
    movieContainer.style.background="white";

  const getMovies= async (search)=>{
    try{
      const response = await fetch(`https://omdbapi.com/?s=${search}&page=1&apikey=d9b202e4`);
      const data = await response.json();
      console.log(data);

      let resultFound=data.Search.length;
           console.log(resultFound);
           movieContainer.innerHTML=`
          <div class="resultsFound">
          <h3>Results found : <span style="font-size:20px;margin-left:5px;">${resultFound}</span></h3>
          </div>`

      data.Search.forEach((movie)=>{
        movieContainer.style.height="auto";
        movieContainer.style.background="#AA2934";
        movieContainer.innerHTML+=`
        <div class="movie_card">
        <img src="${movie.Poster}" alt="${movie.Title}">
        <h4>${movie.Title}</h4>
        <p>Released in <strong>${movie.Year}</strong></p>
        </div>` ;
      });
    } catch (error){
        movieContainer.style.height="auto";
        movieContainer.style.background="white";
        movieContainer.innerHTML=`
        <div class="loading_Card" style=" margin-top: 50px;">
        <img src="Images/error.webp" alt="error image">
        <h2 style="margin-top: 10px;">Movie not found, search another movie !</h2>
        </div>`;
        searchBox.focus();
      }
    }  

      searchBtn.addEventListener("click", (e)=>{
          e.preventDefault();
          const searchInput=searchBox.value.trim();
            if(searchInput){
              console.log(searchInput);
              movieContainer.style.height="auto";
              movieContainer.style.background="white";
              movieContainer.innerHTML=`
            <div class="loading_Card">
              <img src="Images/loader-img.png" alt="loading image">
              <h2>Loading movies...</h2>
            </div>`;
            setTimeout(()=>{
              getMovies(searchInput);
            },600);
            searchBox.value="";
          }else{
            getMovies("Thor");
            alert("Please enter a dish to find !");
            searchBox.focus();
            }
      });

      setTimeout(function(){
        getMovies("hulk");
      },1200);