// Sample movie data
// Sample movie data
const movies = [
    { title: "Inception", description: "A mind-bending thriller.", year: 2010, rating: 8.8, poster: "", video: "" },
    { title: "The Dark Knight", description: "The battle for Gotham.", year: 2008, rating: 9.0, poster: "", video: "" },
    { title: "Pulp Fiction", description: "Stories intertwine.", year: 1994, rating: 8.9, poster: "", video: "" },
];

let user = null;  // To store user information

// Display movies
function displayMovies(moviesToShow = movies) {
    console.log("Displaying movies:", moviesToShow); // Debugging output
    const container = document.getElementById('movieContainer');
    if (!container) {
        console.error("Container #movieContainer not found.");
        return;
    }
    container.innerHTML = '';
    
    moviesToShow.forEach((movie, index) => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <div class="movie-poster">
                <img src="${movie.poster || 'image/placeholder.jpg'}" alt="${movie.title}" />
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <p>${movie.description}</p>
                <p>Year: ${movie.year}</p>
                <p>Rating: ${movie.rating}</p>
            </div>
        `;
        if (user && user.is_admin) {
            movieCard.innerHTML += `
                <div class="admin-controls">
                    <button class="edit-btn" onclick="showEditMovieModal(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteMovie(${index})">Delete</button>
                </div>
            `;
        }
        movieCard.addEventListener('click', () => {
            // Перенаправление на страницу с деталями фильма
            // Например, переход на страницу по URL "/movie/[id]" или "/movie/[title]"
            window.location.href = `/movie/${movie.title.replace(/\s+/g, '-').toLowerCase()}`; // Пример URL с названием фильма
        });
        container.appendChild(movieCard);
    });
}

// Show movie modal
function showAddMovieModal() {
    document.getElementById('addMovieModal').style.display = 'flex';
}

// Search movies
function searchMovies() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm)
    );
    displayMovies(filteredMovies);
}

// Show movie edit modal
function showEditMovieModal(index) {
    const movie = movies[index];
    const modal = document.getElementById('editMovieModal');
    modal.style.display = 'flex';

    modal.querySelector('[name="title"]').value = movie.title;
    modal.querySelector('[name="description"]').value = movie.description;
    modal.querySelector('[name="year"]').value = movie.year;
    modal.querySelector('[name="rating"]').value = movie.rating;
    modal.querySelector('[name="poster"]').value = movie.poster;
    modal.querySelector('[name="video"]').value = movie.video;

    modal.querySelector('form').onsubmit = (event) => {
        event.preventDefault();
        updateMovie(index, new FormData(event.target));
        modal.style.display = 'none';
    };
}

// Add new movie
function addMovie(formData) {
    const newMovie = {
        title: formData.get('title'),
        description: formData.get('description'),
        year: parseInt(formData.get('year')),
        rating: parseFloat(formData.get('rating')),
        poster: formData.get('poster'),
        video: formData.get('video')
    };
    movies.push(newMovie);
    displayMovies();
}

// Update movie
function updateMovie(index, formData) {
    movies[index] = {
        title: formData.get('title'),
        description: formData.get('description'),
        year: parseInt(formData.get('year')),
        rating: parseFloat(formData.get('rating')),
        poster: formData.get('poster'),
        video: formData.get('video')
    };
    displayMovies();
}

// Delete movie
function deleteMovie(index) {
    if (confirm('Are you sure you want to delete this movie?')) {
        movies.splice(index, 1);
        displayMovies();
    }
}

// Show movie modal
function showAddMovieModal() {
    document.getElementById('addMovieModal').style.display = 'flex';
}

// Search movies
function searchMovies() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm)
    );
    displayMovies(filteredMovies);
}

// Show movie edit modal
function showEditMovieModal(index) {
    const movie = movies[index];
    const modal = document.getElementById('editMovieModal');
    modal.style.display = 'flex';

    modal.querySelector('[name="title"]').value = movie.title;
    modal.querySelector('[name="description"]').value = movie.description;
    modal.querySelector('[name="year"]').value = movie.year;
    modal.querySelector('[name="rating"]').value = movie.rating;
    modal.querySelector('[name="poster"]').value = movie.poster;
    modal.querySelector('[name="video"]').value = movie.video;

    modal.querySelector('form').onsubmit = (event) => {
        event.preventDefault();
        updateMovie(index, new FormData(event.target));
        modal.style.display = 'none';
    };
}

// Add new movie
function addMovie(formData) {
    const newMovie = {
        title: formData.get('title'),
        description: formData.get('description'),
        year: parseInt(formData.get('year')),
        rating: parseFloat(formData.get('rating')),
        poster: formData.get('poster'),
        video: formData.get('video')
    };
    movies.push(newMovie);
    displayMovies();
}

// Update movie
function updateMovie(index, formData) {
    movies[index] = {
        title: formData.get('title'),
        description: formData.get('description'),
        year: parseInt(formData.get('year')),
        rating: parseFloat(formData.get('rating')),
        poster: formData.get('poster'),
        video: formData.get('video')
    };
    displayMovies();
}

// Delete movie
function deleteMovie(index) {
    if (confirm('Are you sure you want to delete this movie?')) {
        movies.splice(index, 1);
        displayMovies();
    }
}

function addMovie(formData) {
    const newMovie = {
        title: formData.get('title'),
        description: formData.get('description'),
        year: parseInt(formData.get('year')),
        rating: parseFloat(formData.get('rating')),
        poster: formData.get('poster'),
        video: formData.get('video')
    };
    movies.push(newMovie);
    displayMovies();
}

function updateMovie(index, formData) {
    movies[index] = {
        title: formData.get('title'),
        description: formData.get('description'),
        year: parseInt(formData.get('year')),
        rating: parseFloat(formData.get('rating')),
        poster: formData.get('poster'),
        video: formData.get('video')
    };
    displayMovies();
}

function deleteMovie(index) {
    if (confirm('Are you sure you want to delete this movie?')) {
        movies.splice(index, 1);
        displayMovies();
    }
}

document.getElementById('addMovieModal').querySelector('.close-btn').onclick = () => {
    document.getElementById('addMovieModal').style.display = 'none';
};

document.getElementById('editMovieModal').querySelector('.close-btn').onclick = () => {
    document.getElementById('editMovieModal').style.display = 'none';
};

// Initialize authentication state
function initializeAuth() {
    const token = localStorage.getItem('jwt-token');
    if (token) {
        user = parseJwt(token);
        updateAuthUI(user);
    } else {
        updateAuthUI();
    }
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
            ${user.has_sub 
                ? '<button class="unsubscribe-btn" onclick="handleUnsubscription()">Отменить подписку</button>' 
                : '<button class="subscribe-btn" onclick="showModal(\'subscriptionModal\')">Купить подписку</button>'
            }
            ${user.is_admin 
                ? '<button class="admin-panel-btn" onclick="openAdminPanel()">Панель Администратора</button>' 
                : ''
            }
            <button class="logout-btn" onclick="handleLogout()">Выйти</button>
        `;
    } else {
        authButtons.innerHTML = `
            <button class="login-btn" onclick="showModal('loginModal')">Войти</button>
            <button class="register-btn" onclick="showModal('registerModal')">Регистрация</button>
        `;
    }
}

// Handle unsubscription
async function handleUnsubscription() {
    const token = localStorage.getItem('jwt-token');
    if (!token) {
        alert('You need to be logged in to unsubscribe.');
        return;
    }

    try {
        const response = await fetch('http://localhost:8081/unsub', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('Unsubscription failed');

        const data = await response.json();
        localStorage.setItem('jwt-token', data.token);
        
        const user = parseJwt(localStorage.getItem('jwt-token'));
        updateAuthUI(user);
        alert('Subscription cancelled successfully!');
    } catch (error) {
        console.error(error);
        alert('Failed to unsubscribe. Please try again.');
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
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('Subscription failed');

        const data = await response.json();
        localStorage.setItem('jwt-token', data.token);
        
        const user = parseJwt(localStorage.getItem('jwt-token'));
        updateAuthUI(user);
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

// Открытие панели администратора
function openAdminPanel() {
    const adminPanelModal = document.getElementById('adminPanelModal');
    adminPanelModal.style.display = 'flex';  // Показываем модальное окно
}

// Закрытие модального окна
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';  // Скрываем модальное окно
}

// Функции для отображения соответствующих модальных окон
function showAddMovieModal() {
    hideModal('adminPanelModal'); // Закрываем панель администратора
    const addMovieModal = document.getElementById('addMovieModal');
    addMovieModal.style.display = 'flex'; // Открываем модальное окно добавления фильма
}

function showEditMovieModal() {
    hideModal('adminPanelModal'); // Закрываем панель администратора
    const editMovieModal = document.getElementById('editMovieModal');
    editMovieModal.style.display = 'flex'; // Открываем модальное окно редактирования фильма
}

function showDeleteMovieModal() {
    hideModal('adminPanelModal'); // Закрываем панель администратора
    const deleteMovieModal = document.getElementById('deleteMovieModal');
    deleteMovieModal.style.display = 'flex'; // Открываем модальное окно удаления фильма
}

// Пример обработки добавления фильма (можно адаптировать для вашего API или базы данных)
function addMovie(formData) {
    // Реализовать добавление фильма (например, отправить данные на сервер)
    alert('Фильм добавлен!');
}

// Пример обработки редактирования фильма
function editMovie(formData) {
    // Реализовать редактирование фильма (например, отправить данные на сервер)
    alert('Фильм обновлен!');
}

// Пример обработки удаления фильма
function deleteMovie(movieId) {
    // Реализовать удаление фильма (например, отправить запрос на сервер)
    alert('Фильм удален!');
}

// Добавляем обработчик события для кнопки
document.querySelector('.modal-content-admin').addEventListener('click', openAdminPanel);


// Handle logout
function handleLogout() {
    localStorage.removeItem('jwt-token');
    updateAuthUI();
}

// Initialize authentication state on page load
// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
    initializeAuth();
    displayMovies();
});
