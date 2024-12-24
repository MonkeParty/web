// Sample movie data
const movies = [
    { title: "Inception", year: 2010, rating: 8.8 },
    { title: "The Dark Knight", year: 2008, rating: 9.0 },
    { title: "Pulp Fiction", year: 1994, rating: 8.9 },
    { title: "The Godfather", year: 1972, rating: 9.2 },
    { title: "Fight Club", year: 1999, rating: 8.8 }
];

function displayMovies(moviesToShow = movies) {
    const container = document.getElementById('movieContainer');
    container.innerHTML = '';
    
    moviesToShow.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <div class="movie-poster">
                <svg width="100" height="100" viewBox="0 0 100 100">
                    <rect width="100" height="100" fill="#3c3c3c"/>
                    <text x="50" y="50" font-size="12" fill="white" text-anchor="middle" dominant-baseline="middle">
                        ${movie.title}
                    </text>
                </svg>
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <p>Year: ${movie.year}</p>
                <p>Rating: ${movie.rating}</p>
            </div>
        `;
        container.appendChild(movieCard);
    });
}

function searchMovies() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm)
    );
    displayMovies(filteredMovies);
}

function showModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    // Here you would typically make an API call to your backend
    console.log('Login attempt');
    hideModal('loginModal');
}

function handleRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    // Here you would typically make an API call to your backend
    console.log('Registration attempt');
    hideModal('registerModal');
}

// Initial display of movies
displayMovies();

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
    }
}
// Helper function to parse JWT
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// Check if user is logged in on page load
function initializeAuth() {
    const token = localStorage.getItem('jwt-token');
    if (token) {
        const user = parseJwt(token);
        updateAuthUI(user.name);
    }
}

// Update UI to show user's name or login/register buttons
function updateAuthUI(userName = null) {
    const authButtons = document.querySelector('.auth-buttons');
    if (userName) {
        authButtons.innerHTML = `
            <span>Welcome, ${userName}!</span>
            <button class="login-btn" onclick="handleLogout()">Logout</button>
        `;
    } else {
        authButtons.innerHTML = `
            <button class="login-btn" onclick="showModal('loginModal')">Login</button>
            <button class="register-btn" onclick="showModal('registerModal')">Register</button>
        `;
    }
}

// Handle login
async function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await fetch('http://localhost:8081/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) throw new Error('Login failed');

        const data = await response.json();
        localStorage.setItem('jwt-token', data.token);
        const user = parseJwt(data.token);
        updateAuthUI(user.name);
        hideModal('loginModal');
    } catch (error) {
        console.error(error);
        alert('Failed to login. Please check your credentials.');
    }
}

// Handle registration
async function handleRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await fetch('http://localhost:8081/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) throw new Error('Registration failed');

        const data = await response.json();
        localStorage.setItem('jwt-token', data.token);
        const user = parseJwt(data.token);
        updateAuthUI(user.name);
        hideModal('registerModal');
    } catch (error) {
        console.error(error);
        alert('Failed to register. Please try again.');
    }
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('jwt-token');
    updateAuthUI();
}

// Initialize authentication state on page load
document.addEventListener('DOMContentLoaded', initializeAuth);
