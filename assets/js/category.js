document.addEventListener("DOMContentLoaded", function() {
    const categoryItems = document.querySelectorAll('.category-item');
    const postItems = document.querySelectorAll('.post-item');

    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            postItems.forEach(post => {
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