const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const movieResults = document.getElementById('movie-results');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();

    if (searchTerm === '') {
        showMessage('Please Enter a Movie Title');
    } else {
        searchMovies(searchTerm);
    }
});

async function searchMovies(searchTerm) {
    try {
        const apiKey = '24d8caa8'; //My API key Provide By OMDb API Through rimal.avimanyu0@gmail.com Mail
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();

        // Checking If There Are Search Results
        if (data.Search && data.Search.length > 0) {
            displayMovies(data.Search);
        } else {
            showMessage('No movies found');
        }
    } catch (error) {
        showMessage('Sorry! An Error Occurred. Please Try Again Later');
    }
}

function displayMovies(movies) {
    movieResults.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const title = movie.Title;
        const year = movie.Year;
        const poster = movie.Poster === 'N/A' ? 'placeholder.png' : movie.Poster;
        const overview = movie.Plot;

        movieCard.innerHTML = `
            <img src="${poster}" alt="${title}">
            <h3>${title}</h3>
            <p>Year: ${year}</p>
            <p>${overview}</p>
        `;

        movieResults.appendChild(movieCard);
    });
}

function showMessage(message) {
    movieResults.innerHTML = `<p id="error-message">${message}</p>`;
}
