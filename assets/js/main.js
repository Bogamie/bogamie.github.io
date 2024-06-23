const indicator = document.querySelector('.nav-indicator');
const navItems = document.querySelectorAll('.nav-item');
const header = document.querySelector(".masthead");
const windowPathName = window.location.pathname;

navItems.forEach(navItem => {
    const navLinkPathName = new URL(navItem.href).pathname;

    if ((windowPathName === navLinkPathName) || (navLinkPathName === '/')) {
        navItem.classList.add('active');

        indicator.style.width = `${navItem.offsetWidth - 30}px`;
        indicator.style.left = `${navItem.offsetLeft + 30}px`;
    }
})

window.addEventListener("scroll", function () {
    header.classList.toggle("stickyHead", window.scrollY > 60);
});