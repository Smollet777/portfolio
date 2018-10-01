let mainNavLinks = document.querySelectorAll("#navbar ul li a");

document.addEventListener('scroll', doAnimations);
window.addEventListener('scroll', debounce(() => applyStyleOnNavLink(mainNavLinks), 500));
setTimeout(frameLooper, 1000);