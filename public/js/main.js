const mainNavLinks = document.querySelectorAll("#navbar ul li a");
const imagesToScroll = document.querySelectorAll('.image>img');

document.addEventListener('scroll', doAnimations);
window.addEventListener('scroll', debounce(() => applyStyleOnNavLink(mainNavLinks), 500));
smoothScrolling(mainNavLinks)
setTimeout(frameLooper, 1000);
scrollOnHover(imagesToScroll, 1);