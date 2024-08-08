document.addEventListener('DOMContentLoaded', function() {
    const categoryItems = document.querySelectorAll('.category-item');
  
    categoryItems.forEach(item => {
      item.addEventListener('click', function() {
        categoryItems.forEach(i => i.classList.remove('is-active'));
        this.classList.add('is-active');
  
        // Show/Hide posts based on category
        const category = this.getAttribute('data-category');
        const posts = document.querySelectorAll('.post-item');
  
        posts.forEach(post => {
          if (category === 'all' || post.getAttribute('data-category').includes(category)) {
            post.classList.add('visible');
          } else {
            post.classList.remove('visible');
          }
        });
      });
    });
  
    document.querySelector('.category-item[data-category="all"]').click();
  });
  