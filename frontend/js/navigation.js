// frontend/js/navigation.js

import { fetchPosts } from './api.js';
import { setupLogin, setupRegister } from './auth.js';
import { setupPost, displayPosts } from './post.js';

export function render(page) {
    console.log(`Rendering ${page}`);
    loadPageContent(page);
}

function checkCookie(cookieName) {
    // Split document.cookie at '; ' to get an array of cookies
    const cookies = document.cookie.split('; ');
    // Find the specific cookie by name
    const targetCookie = cookies.find(cookie => cookie.startsWith(cookieName + '='));
    return targetCookie ? true : false;
}

function loadPageContent(page) {
    const app = document.getElementById('app');
    const isLoggedIn = checkCookie(`session-name`);
    
    console.log('esli true to zalogineni:', isLoggedIn);

    // const user = {
    //     username: "User's_Username:_Volodymyr",
    //     nickname: "User's_Nickname:_VOLODYMYR",
    // };

    //<span class="username">Hello, ${posts[1].nickname} - ${user.username}-${user.nickname} {{.User.Username}}-{{.users.Nickname}}</span>
                            

    if (page === 'home') {
        if (isLoggedIn) {
            fetchPosts()
                .then(posts => {
                    app.innerHTML = `
                    <header class="topnav">
                    <div class="logo">
                        <h1>Welcome to the Real-TIME-Forum</h1>
                    </div>
                    <div class="user-actions">
                            <span class="username">Hello, ${posts[1].nickname}</span>
                            
                            <a href="#" data-nav="logout" class="button">Logout</a>
                    </div>
                    </header>

                    <div class="container">

                    <div class="main-content">
                    <div id="posts"></div>
                    </div>
   


                        <aside class="sidebar">
                        <div class="create-post-container"> 
                         <a href="#" data-nav="post" class="create-button">Create Post</a>
                         <a href="#" data-nav="post-------" class="filter-button">Apply User Filter</a>
                        </div>
                        <div class="filter-form-container">
                         <form action="/filter" method="POST" class="user-filter-form">
                          <div class="filter-option">
                           <input type="radio" name="filter" id="filter-all" value="all" checked>
                           <label for="filter-all">All</label>
                          </div>
                          <div class="filter-option">
                           <input type="radio" name="filter" id="filter-liked" value="liked-post">
                           <label for="filter-liked">Liked post</label>
                          </div>
                          <div class="filter-option">
                           <input type="radio" name="filter" id="filter-created" value="created-posts">
                           <label for="filter-created">Created post</label>
                          </div>
                          <div class="filter-option">
                           <input type="radio" name="filter" value="category">
                           <label>
                           Categories :
                            <select name="category">
                             <option value="animals-all">Animals-all</option>
                             <option value="animals-dog">Animals-dog</option>
                             <option value="animals-cat">Animals-cat</option>
                             <option value="animals-bird">Animals-bird</option>
                             <option value="art-all">art-all</option>
                             <option value="art-digital">art-digital</option>
                            </select>
                           </label>
                          </div>
                         </form>
                        </div>
                        
 

                        </aside> 
                        
    <div class="chat-container">
    <div class="chat-input">
        <input type="text" class="invisible-input" id="chat-input-field" placeholder="Type your message..."> 
        <input type="radio" name="filter" value="category" id="category-radio" class="invisible-input"> 
    </div>
    </div>
                        
                        </div> 



<div class="chat-container">
    <div class="chat-header">
        <h2>Live Chat</h2>
    </div>
    <div class="chat-users">
        <h3>Users</h3>
        <ul id="user-list">
            <!-- User list items will be dynamically inserted here -->
        </ul>
    </div>
    <div class="chat-messages">
        <!-- Chat messages will be dynamically inserted here -->
    </div>
    <div class="chat-input">
        <input type="text" id="chat-input-field" placeholder="Type your message...">
        <button id="send-button">Send</button>
    </div>
</div>
                        
                        
                        `;
                    displayPosts(posts);
                })
                .catch(error => {
                    console.error('Error fetching posts:', error);
                    app.innerHTML = '<p>Error loading posts. Please try again later.</p>';
                });
        } else {
            app.innerHTML = `
                <h1>Welcome to the Real-Time Forum</h1>
                <div class="content-box">
                    <p>This is the home page.</p>
                    <h1><a href="#" data-nav="login">Login</a> | <a href="#" data-nav="register">Register</a></h1>
                </div>
            `;
        }
       
    } else if (page === 'login') {
        app.innerHTML = `
            <h1>Login</h1>
            <div class="content-box">
                <form id="login-form">
                    <div class="input-container">
                        <input type="text" name="loginIdentifier" placeholder="Username or Email" required><br>
                        <input type="password" name="password" placeholder="Password" required><br>
                        <button type="submit">Login</button>
                        </br></br><button data-nav="home">Home</button></br></br>
                        <div id="login-error" class="error-message" style="display: none;">
                            <i class="fas fa-exclamation-triangle"></i>
                            <span>Check your email or password, please try again.</span>
                        </div>
                    </div>
                </form>
            </div>
            
        `;
        setupLogin();
    } else if (page === 'register') {
        app.innerHTML = `
            <h1>Register</h1>
            <div class="content-box">
            <form id="register-form">
            <div class="input-container">
                <input type="text" name="nickname" placeholder="Nickname" required><br>
                <input type="number" name="age" placeholder="Age" required><br>
                <input type="text" name="gender" placeholder="Gender" required><br>
                <input type="text" name="firstName" placeholder="First Name" required><br>
                <input type="text" name="lastName" placeholder="Last Name" required><br>
                <input type="email" name="email" placeholder="Email" required><br>
                <input type="password" name="password" placeholder="Password" required><br>
                <button type="submit">Register</button>
                </br></br><button data-nav="home">Home</button></br></br>
                <div id="login-error" class="error-message" style="display: none;">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>Check your email or password, please try again.</span>
                </div>
            </div>
            </form>
            </div>
        `;
        setupRegister();
    } else if (page === 'post') {
        if (!isLoggedIn) {
            render('login');
            return;
        }
        app.innerHTML = `
            <h1>Create Post</h1>
            <form class="form-post" id="post-form">
                <input type="text" name="title" placeholder="Title" required><br>
                <label>
                           Categories: <br>
                            <select name="category">
                             <option value="animals-all">Animals-all</option>
                             <option value="animals-dog">Animals-dog</option>
                             <option value="animals-cat">Animals-cat</option>
                             <option value="animals-bird">Animals-bird</option>
                             <option value="art-all">art-all</option>
                             <option value="art-digital">art-digital</option>
                            </select>
                </label>
                <br><br>
                <textarea name="content" placeholder="Content" required></textarea><br>
                <button type="submit">Submit</button>
                <br><br><button data-nav="home">Home</button>
            </form>
        `;
        setupPost();
    } else if (page === 'logout') {

        fetch('/api/logout')
            .then(() => {
                clearCookies(); // Clear cookies
                render('login'); // Redirect to login page
            });
    } else {
        app.innerHTML = `<p>Page not found.</p>`;
    }
}

function clearCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    }
}