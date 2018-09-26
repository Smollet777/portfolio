//source https://codepen.io/chriscoyier/pen/qyELzd
let mainNavLinks = document.querySelectorAll("#navbar ul li a");

let applyStyleOnNavLink = function () {
  let fromTop = window.scrollY;

  mainNavLinks.forEach(link => {
    let section = document.querySelector(link.hash);

    if (
      section.offsetTop / 2 <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  })
}

window.addEventListener("scroll", applyStyleOnNavLink);