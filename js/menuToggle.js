const navLinks = document.querySelectorAll('#navbar a');
const menu = document.querySelector('#navbar');

navLinks.forEach(elem => {
  elem.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
});