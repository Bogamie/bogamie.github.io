const header = document.querySelector(".masthead");

window.addEventListener("scroll", function () {
  header.classList.toggle("stickyHead", window.scrollY > 80);
});