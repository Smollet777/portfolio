const scrollOnHover = (targets, speed = 200) => {
  targets.forEach(elem => {

    elem.style.transition = `transform ${elem.clientHeight / speed}s`
    elem.addEventListener('mouseover', () => {
      const parent = elem.parentElement
      elem.style.transform = `translateY(-${elem.clientHeight-parent.clientHeight}px)`
    });
    elem.addEventListener('mouseout', () => {
      elem.style.transform = `translateY(0)`
    });

  });
}