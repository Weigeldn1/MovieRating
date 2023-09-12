const getMovieRating = async (filmTitle) => {
    const omdbEndpoint = '/'; 
    const requestParams = `?t=${filmTitle}&apikey=46261cf`;
    const urlToFetch = `http://www.omdbapi.com${omdbEndpoint}${requestParams}`;

    try {
        const response = await fetch(urlToFetch);

        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse; 
        }
        throw new Error('Failed to fetch data');
    } catch (error) {
        console.log(error);
    }
};

const searchForFilmRating = async (filmTitle) => {
    let resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = ''; 

    const movieData = await getMovieRating(filmTitle);

    if (movieData && movieData.imdbRating) {
        let listItem = document.createElement('li');
        listItem.textContent = `${movieData.Title} - Rating: ${movieData.imdbRating}`;
        resultsList.appendChild(listItem);
    } else {
        let listItem = document.createElement('li');
        listItem.textContent = `No results found for "${filmTitle}".`;
        resultsList.appendChild(listItem);
    }
};

document.getElementById('filmTitle').addEventListener('keyup', function(e) {
    if (e.key === "Enter") {
        searchForFilmRating(this.value);
    }
});

document.getElementById('searchBtn').addEventListener('click', function() {
    let filmTitle = document.getElementById('filmTitle').value;
    searchForFilmRating(filmTitle);
});




