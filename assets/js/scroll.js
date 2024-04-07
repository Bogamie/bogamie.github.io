const header = document.querySelector(".masthead, .mastheadd");

window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 80);
});