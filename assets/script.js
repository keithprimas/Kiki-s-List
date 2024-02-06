
// Function to add a movie to the list
function addMovie() {
    let input = document.getElementById('movieInput');
    let movieTitle = input.value.trim();
    if (movieTitle === '') {
        return; // If input is empty, do nothing
    }

    // Create list item
    let li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
        <input type="checkbox" onchange="toggleWatched(this)">
        <span>${movieTitle}</span>
        <button class="btn btn-danger btn-sm" onclick="deleteMovie(this)">Delete</button>
    `;

    // Add list item to the movie list
    document.getElementById('movieList').appendChild(li);

    // Save movie to local storage
    let movies = JSON.parse(localStorage.getItem('movies')) || [];
    movies.push({ title: movieTitle, watched: false });
    localStorage.setItem('movies', JSON.stringify(movies));

    // Clear input
    input.value = '';
}

// Function to toggle watched status
function toggleWatched(checkbox) {
    let listItem = checkbox.parentElement;
    let movies = JSON.parse(localStorage.getItem('movies'));
    let movieTitle = listItem.querySelector('span').textContent;

    movies.forEach(function(movie) {
        if (movie.title === movieTitle) {
            movie.watched = checkbox.checked;
        }
    });

    localStorage.setItem('movies', JSON.stringify(movies));

    if (checkbox.checked) {
        listItem.classList.add('text-muted');
    } else {
        listItem.classList.remove('text-muted');
    }
}

// Function to delete a movie
function deleteMovie(button) {
    let listItem = button.parentElement;
    let movieTitle = listItem.querySelector('span').textContent;
    let movies = JSON.parse(localStorage.getItem('movies'));

    movies = movies.filter(function(movie) {
        return movie.title !== movieTitle;
    });

    localStorage.setItem('movies', JSON.stringify(movies));
    listItem.remove();
}

// Function to load movies from local storage
function loadMovies() {
    let movies = JSON.parse(localStorage.getItem('movies')) || [];

    movies.forEach(function(movie) {
        let li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <input type="checkbox" onchange="toggleWatched(this)" ${movie.watched ? 'checked' : ''}>
            <span>${movie.title}</span>
            <button class="btn btn-danger btn-sm" onclick="deleteMovie(this)">Delete</button>
        `;

        if (movie.watched) {
            li.classList.add('text-muted');
        }

        document.getElementById('movieList').appendChild(li);
    });
}


// Load movies when the page loads
loadMovies();
