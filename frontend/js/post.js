// frontend/js/post.js

import { submitPost } from './api.js';
import { render } from './navigation.js';

export function setupPost() {
    const form = document.getElementById('post-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const data = new FormData(form);
        submitPost(data)
            .then(response => {
                if (response.ok) {
                    render('home');
                } else {
                    console.error('Failed to submit post');
                }
            })
            .catch(error => {
                console.error('Error submitting post:', error);
            });
    });
    
}

export function displayPosts(posts) {
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';
    if (!posts || posts.length === 0) {
        postsDiv.innerHTML = '<p>No posts available.</p>';
    } else {
        posts.forEach((post, index) => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post';

            const postId = `post-content-${index}`;
            const toggleId = `toggle-${index}`;

            postDiv.innerHTML = `
                <h2>${post.title}</h2>
        <p class="post-content" id="${postId}">${post.content}</p> <!-- Set the ID here -->
                <button id="${toggleId}" class="read-more">Read More</button>
                <small>Posted by User ${post.userId} - ${post.nickname} on ${new Date(post.createdAt).toLocaleString()}</small>
            `;
            const postDivCat = document.createElement('div');
            postDivCat.className = 'post-category';
            postDivCat.innerHTML = `
                <h2>Category: <span>animals</span> </h2>
               
            `;
            const postDivLike = document.createElement('div');
            postDivLike.className = 'post-interactions';
            postDivLike.innerHTML = `
                <button class="like-button">0 Like</button>
                <button class="dislike-button">0 Dislike</button>
                <button class="comment-button">0 Comments</button>
            `;
            postDiv.appendChild(postDivCat);
            postDiv.appendChild(postDivLike);
            postsDiv.appendChild(postDiv);
            
            document.getElementById(toggleId).addEventListener('click', function() {
                const content = document.getElementById(postId);
                content.classList.toggle('expanded');
                this.textContent = this.textContent === 'Read More' ? 'Read Less' : 'Read More';
            });

           
        });
    }
}

