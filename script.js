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
        updateAuthUI(user);
    }
}

// Update UI to show user's name, subscription status, or login/register buttons
function updateAuthUI(user = null) {
    const authButtons = document.querySelector('.auth-buttons');
    if (user) {
        authButtons.innerHTML = `
            <span>Добро пожаловать, ${user.name}!</span>
            ${user.has_sub ? '<span>У вас есть подписка</span>' : '<button class="subscribe-btn" onclick="showModal(\'subscriptionModal\')">Купить подписку</button>'}
            ${user.is_admin ? '<button class="admin-panel-btn" onclick="openAdminPanel()">Панель Администратора</button>' : ''}
            <button class="logout-btn" onclick="handleLogout()">Выйти</button>
        `;
    } else {
        authButtons.innerHTML = `
            <button class="login-btn" onclick="showModal('loginModal')">Войти</button>
            <button class="register-btn" onclick="showModal('registerModal')">Регистрация</button>
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

        if (!response.ok) throw new Error('Ошибка входа');

        const data = await response.json();
        localStorage.setItem('jwt-token', data.token);
        const user = parseJwt(data.token);
        updateAuthUI(user);
        hideModal('loginModal');
    } catch (error) {
        console.error(error);
        alert('Не удалось войти. Проверьте свои данные.');
    }
}

// Handle register
async function handleRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const lastname = formData.get('lastname');
    const fathername = formData.get('fathername');
    const email = formData.get('email');
    const password = formData.get('password');
    const birthday = formData.get('birthday');

    try {
        const response = await fetch('http://localhost:8081/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, lastname, fathername, email, password, birthday })
        });

        if (!response.ok) throw new Error('Ошибка регистрации');

        const data = await response.json();
        localStorage.setItem('jwt-token', data.token);
        const user = parseJwt(data.token);
        updateAuthUI(user);
        alert('Добро пожаловать, ' + user.name + '!');
        hideModal('registerModal');
    } catch (error) {
        console.error(error);
        alert('Не удалось зарегистрироваться. Попробуйте снова.');
    }
}

async function handleSubscription() {
    const token = localStorage.getItem('jwt-token');
    if (!token) {
        alert('You need to be logged in to purchase a subscription.');
        return;
    }

    try {
        const response = await fetch('http://localhost:8081/sub', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ${token}'
            }
        });

        if (!response.ok) throw new Error('Subscription failed');

        const data = await response.json();
        alert('Subscription purchased successfully!');
        hideModal('subscriptionModal');
    } catch (error) {
        console.error(error);
        alert('Failed to subscribe. Please try again.');
    }
}


// Handle logout
function handleLogout() {
    localStorage.removeItem('jwt-token');
    updateAuthUI();
}

// Initialize authentication state on page load
document.addEventListener('DOMContentLoaded', initializeAuth);

// Open Admin Panel
function openAdminPanel() {
    alert('Переход в панель администратора...');
    // Здесь можно реализовать редирект или открыть модальное окно
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('jwt-token');
    updateAuthUI();
}

// Initialize authentication state on page load
document.addEventListener('DOMContentLoaded', initializeAuth);
