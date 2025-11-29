// --- Movie Data (PUT YOUR VIDEO LINKS HERE) ---
const movieData = [
    { 
        title: "WONDLA", 
        url: "https://lok-lok.cc/spa/videoPlayPage/movies/wondla-CfmbYXH83Z3?id=3344346067511956200&type=/movie/detail&lang=en", 
        thumbnail: "wondla.jpg", 
        genres: ["Action", "Adventure", "Fantasy"] 
    },
    { 
        title: "RIO", 
        url: "https://lok-lok.cc/spa/videoPlayPage/movies/rio-Sz8d5qATX2a?id=8433145655513727224&type=/movie/detail&lang=en", 
        thumbnail: "rio.jpg", 
        genres: ["Animation", "Kids", "Adventure"] 
    },
    { 
        title: "TRON", 
        url: "https://lok-lok.cc/spa/videoPlayPage/movies/tron-ares-hindi-uvqfpFdqmL8?id=7355533815261331776&type=/movie/detail&lang=en", 
        thumbnail: "tron.jpg", 
        genres: ["Adventure"] 
    },
    { 
        title: "FROZEN II", 
        url: "https://lok-lok.cc/spa/videoPlayPage/movies/frozen-2-USbZa8Gyii3?id=2765617905336208048&type=/movie/detail&lang=en", 
        thumbnail: "frozen 2.jpg", 
        genres: ["Kids", "Fantasy", "Animation"] 
    },
    { 
        title: "BARBIE BIG CITY BIG DREAMS", 
        url: "https://lok-lok.cc/spa/videoPlayPage/movies/barbie-big-city-big-dreams-kcxFuwHJ6t5?id=4590543324653702744&type=/movie/detail&lang=en", 
        thumbnail: "barbie big cities and big dreams.jpg", 
        genres: ["Kids", "Animation"] 
    },
    {
        title: "HAQ",
        url: "https://lok-lok.cc/spa/videoPlayPage/movies/haq-hindi-cam-WnTYkc6uv81?id=954470602054813448&type=/movie/detail&lang=en",
        thumbnail: "haq.jpg",
        genres: ["drama, social"]
    },
     {
        title: "RAYA AND THE LAST DRAGON",
        url:"https://lok-lok.cc/spa/videoPlayPage/movies/raya-and-the-last-dragon-oiNVkWXdFL2?id=2323842929388833456&type=/movie/detail&lang=en",
        thumbnail: "raya and the last dragon.jpg",
        genres: ["animie, drama,suspens,thriller"]
    },
     {
        title: "3 IDIOTS",
        url:"https://lok-lok.cc/spa/videoPlayPage/movies/3-idiots-mHchEloo3P5?id=4887629165308043272&type=/movie/detail&lang=en",
        thumbnail: "3idiots.jpg",
        genres: ["comedy, drama"]
    },
    {
        title: "K.G.F. CHAPTER 1",
        url:"https://lok-lok.cc/spa/videoPlayPage/movies/k-g-f-chapter-1-AoFyfdy6BZ?id=833863936263999064&type=/movie/detail&lang=en",
        thumbnail: "kgf1",
        genres: ["action, crime, drama"]
    },
    {
        title: "THE SHADOW'S EDGE",
        url:"https://lok-lok.cc/spa/videoPlayPage/movies/the-shadows-edge-YsfCvPo4Xo6?id=5373583835403911072&type=/movie/detail&lang=en",
        thumbnail: "The Shadows Edge.jpg",
        genres: ["Action, Crime, drama"]
    },
    { 
        title: "PREDATOR BADLANDS", 
        url: "https://lok-lok.cc/spa/videoPlayPage/movies/predator-badlands-cam-wSfXqLvQrD1?id=1373325852246787096&type=/movie/detail&lang=en", 
        thumbnail: "predator badlands.jpg", 
        genres: ["thriller, sci-fiction, Adventure"] 
    },
    { 
        title: "NOVOCAINE", 
        url: "https://lok-lok.cc/spa/videoPlayPage/movies/novocaine-wav5pqXcKu6?id=5451998071234200560&type=/movie/detail&lang=en", 
        thumbnail: "novocaine.jpg", 
        genres: ["thriller, sci-fiction, Adventure"] 
    },
       
];

// --- DOM Elements ---
const splashScreen = document.getElementById('splash-screen');
const appContainer = document.getElementById('app-container');
const movieGrid = document.getElementById('movie-grid');
const categoryLinks = document.querySelectorAll('.categories a');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');
const mainLogo = document.getElementById('main-logo-link');
const notFoundMessage = document.getElementById('not-found-message');

// --- Render Movies (CLICK → OPEN LINK) ---
function renderMovies(movies) {
    movieGrid.innerHTML = '';

    if (movies.length === 0) {
        notFoundMessage.classList.remove('hidden');
        return;
    } else {
        notFoundMessage.classList.add('hidden');
    }

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';

        const isSmallText = movie.title.length > 25 ? ' small-text' : '';

        card.innerHTML = `
            <div class="media-container">
                <img src="${movie.thumbnail}" 
                    alt="${movie.title}" 
                    class="thumbnail"
                    onerror="this.src='https://placehold.co/600x400/333/fff?text=Thumbnail+Missing'">
            </div>
            <div class="caption-area">
                <div class="movie-title-text${isSmallText}">${movie.title}</div>
            </div>
        `;

        // CLICK → OPEN MOVIE LINK (MovieBox, YouTube, etc.)
        card.addEventListener('click', () => {
            window.open(movie.url, "_blank");
        });

        movieGrid.appendChild(card);
    });
}

// --- Filter Movies ---
function filterMovies(type, value) {
    let filtered = movieData;
    if (type === 'genre' && value !== 'All') {
        filtered = movieData.filter(m => m.genres.includes(value));
    } else if (type === 'search' && value) {
        const term = value.toLowerCase();
        filtered = movieData.filter(m => 
            m.title.toLowerCase().includes(term) || 
            m.genres.some(g => g.toLowerCase().includes(term))
        );
    }
    renderMovies(filtered);
}

// --- Update Active Genre ---
function updateActiveCategory(link) {
    categoryLinks.forEach(l => l.classList.remove('active-genre'));
    if (link) link.classList.add('active-genre');
}

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // Splash screen → show app
    splashScreen.addEventListener('click', () => {
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            appContainer.classList.remove('hidden');
            renderMovies(movieData);
        }, 500);
    });

    // Logo resets filters
    mainLogo.addEventListener('click', e => {
        e.preventDefault();
        const allBtn = document.getElementById('show-all-btn');
        searchInput.value = '';
        updateActiveCategory(allBtn);
        filterMovies('genre','All');
    });

    // Genre buttons
    categoryLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const genre = e.target.dataset.genre;
            searchInput.value = '';
            updateActiveCategory(e.target);
            filterMovies('genre', genre);
        });
    });

    // Search
    const handleSearch = () => {
        updateActiveCategory(null);
        filterMovies('search', searchInput.value.trim());
    };

    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') handleSearch();
    });

    // If splash is skipped
    if (!appContainer.classList.contains('hidden')) renderMovies(movieData);
});

