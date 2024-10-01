// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all post elements
    const posts = document.querySelectorAll('.post');
    
    // Iterate through each post element
    posts.forEach(post => {
        // Initially hide the description and cover
        const description = post.querySelector('.content');
        const cover = post.querySelector('.cover');
        description.style.display = 'none';
        cover.style.display = 'none';
        
        // Reset font size of title
        const title = post.querySelector('h2');
        title.style.fontSize = '';
        
        // Add click event listener to toggle description
        post.addEventListener('click', function() {
            if (description.style.display === 'block') {
                description.style.display = 'none';
                cover.style.display = 'none';
                post.classList.remove('expanded');
                title.style.fontSize = '';
            } else {
                description.style.display = 'block';
                cover.style.display = 'block';
                post.classList.add('expanded');
                title.style.fontSize = '20px';
            }
        });
    });
});
