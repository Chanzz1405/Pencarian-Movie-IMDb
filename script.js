const SearchMovie = document.querySelector('.search-button');
SearchMovie.addEventListener('click', function() {

    const searchValue = document.querySelector('.input-keyword');
    fetch('https://www.omdbapi.com/?apikey=81d4b786&s=' + searchValue.value)
        .then(response =>response.json())
        .then(response => {
            const movies = response.Search;
            let cards = '';

            movies.forEach(movie => cards += showCards(movie));
            const movieContainer = document.querySelector('.movie-container');
            movieContainer.innerHTML = cards;

            movieDescription = document.querySelectorAll('.modal-detail-button');
            movieDescription.forEach(description => {
                description.addEventListener('click', function() {
                    const imdbId = this.dataset.imdbid;
                    console.log(imdbId);

                    fetch('https://www.omdbapi.com/?apikey=81d4b786&i=' + imdbId)
                        .then(response => response.json())
                        .then(movie => {
                            const movieDetail = showModalDetail(movie);
                            const descriptionMovie = document.querySelector('.modal-body');
                            descriptionMovie.innerHTML = movieDetail;
        
                        })
                });
            })
        }) 

});



function showCards(movie){
    return `<div class="col-md-3 my-5">
                <div class="card"">
                    <img src="${movie.Poster}" class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${movie.imdbID}">View Description</a>
                    </div>
                </div>
            </div>`
}

function showModalDetail(movies){
    return `<div class="container-fluit">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${movies.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${movies.Title} (${movies.Year})</h4></li>
                            <li class="list-group-item"><strong>Director : </strong> ${movies.Director}</li>
                            <li class="list-group-item"><strong>writer : </strong>${movies.Writer}</li>
                            <li class="list-group-item"><strong>Genre : </strong>${movies.Genre}</li>
                            <li class="list-group-item"><strong>Rated : </strong>${movies.Rated}</li>
                            <li class="list-group-item"><strong>Actors : </strong>${movies.Actors}</li>
                            <li class="list-group-item"><strong>Awards : </strong>${movies.Awards}</li>
                            <li class="list-group-item"><strong>Plot : </strong><br>${movies.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`
}