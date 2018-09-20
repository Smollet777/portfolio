let doAnimations = function () {

  let offset = (document.documentElement.scrollTop || document.body.scrollTop) + (document.documentElement.clientHeight || document.body.clientHeight),
    animatables = document.querySelectorAll('.animatable');

  animatables.forEach(function (elem) {
    if ((elem.offsetTop + elem.clientHeight + 50) < offset) {
      elem.classList.remove('animatable');
      elem.classList.add('animated');
    }
  });

};

document.addEventListener('scroll', doAnimations);