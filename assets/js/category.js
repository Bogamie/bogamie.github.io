document.addEventListener('DOMContentLoaded', function() {
  const categoryItems = document.querySelectorAll('.category-item');
  let activeCategory = null;

  categoryItems.forEach(item => {
      item.addEventListener('click', function() {
          const category = this.getAttribute('data-category');

          if (activeCategory === category) {
              // If the same category is clicked, deactivate it
              this.classList.remove('is-active');
              activeCategory = null;
              showAllPosts();
          } else {
              // Activate the clicked category
              categoryItems.forEach(item => item.classList.remove('is-active'));
              this.classList.add('is-active');
              activeCategory = category;
              filterPostsByCategory(category);
          }
      });
  });

  function filterPostsByCategory(category) {
      const posts = document.querySelectorAll('.post-item');
      posts.forEach(post => {
          if (post.getAttribute('data-category').includes(category)) {
              post.classList.add('visible');
          } else {
              post.classList.remove('visible');
          }
      });
  }

  function showAllPosts() {
      const posts = document.querySelectorAll('.post-item');
      posts.forEach(post => post.classList.add('visible'));
  }

  // Initially show all posts
  showAllPosts();
});
