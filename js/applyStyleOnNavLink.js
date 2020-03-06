"use strict";

function smoothScrolling(links) {
  links.forEach(link => {
    let section = document.querySelector(link.hash);
    link.addEventListener('click', e => {
      e.preventDefault();

      window.scroll({
        top: section.offsetTop,
        behavior: 'smooth'
      })
    })
  })
}

//source https://codepen.io/chriscoyier/pen/qyELzd
function applyStyleOnNavLink(links) {
  let fromTop = window.scrollY;

  links.forEach(link => {
    let section = document.querySelector(link.hash);

    if (
      section.offsetTop / 2 <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("button_active");
    } else {
      link.classList.remove("button_active");
    }
  })
}