const mainNavLinks = document.querySelectorAll("#navbar ul li a");
const imagesToScroll = document.querySelectorAll('.image>img');
const svg = document.querySelectorAll('.svg');

document.addEventListener('scroll', doAnimations);
window.addEventListener('scroll', debounce(() => applyStyleOnNavLink(mainNavLinks), 500));
smoothScrolling(mainNavLinks)
setTimeout(frameLooper, 1000);
scrollOnHover(imagesToScroll, 200);
svgFallback(svg);


function svgFallback(svg) {

  function isSVGsupports() {
    return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")
  }
  if (!isSVGsupports) {
    svg.forEach(element => {
      element.src = element.src.replace(/svg/, 'png')
    })
  }
}