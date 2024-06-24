window.addEventListener('load', updateIndicator);
window.addEventListener('resize', updateIndicator);

function updateIndicator() {
    const indicator = document.querySelector('.nav-indicator');
    const navItems = document.querySelectorAll('.nav-item');
    const windowPathName = window.location.pathname;
    let activeNavItem = null;

    navItems.forEach(navItem => {
        const navLinkPathName = new URL(navItem.href).pathname;

        if ((windowPathName === navLinkPathName) || (navLinkPathName === '/')) {
            navItem.classList.add('active');
            activeNavItem = navItem;
        } else {
            navItem.classList.remove('active');
        }
    });

    if (activeNavItem) {
        setTimeout(() => {
            indicator.style.width = `${activeNavItem.offsetWidth}px`;
            indicator.style.left = `${activeNavItem.offsetLeft}px`;
        }, 100);
    }
}

const header = document.querySelector(".masthead");

window.addEventListener("scroll", function () {
    header.classList.toggle("stickyHead", window.scrollY > 60);
});