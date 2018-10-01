//source https://codepen.io/chriscoyier/pen/qyELzd
let applyStyleOnNavLink = function (links) {
  let fromTop = window.scrollY;

  links.forEach(link => {
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