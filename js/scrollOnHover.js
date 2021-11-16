"use strict";

function isTouchDevice() {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
}

function scrollOnHover(targets, speed = 200) {

  if(!isTouchDevice()){
  targets.forEach(elem => {

    //hide ugly scrollbar
    elem.parentElement.style.overflow = "hidden";

    elem.style.transition = `transform ${elem.clientHeight / speed||1}s`
    elem.addEventListener('mouseover', () => {
      const parent = elem.parentElement
      elem.style.transform = `translateY(-${elem.clientHeight-parent.clientHeight}px)`
    });
    elem.addEventListener('mouseout', () => {
      elem.style.transform = `translateY(0)`
    });

  });
}

}