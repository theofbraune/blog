const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

hamburgerMenu.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('active');
  navLinks.classList.toggle('active');
});

document.addEventListener('click', (event) => {
  const isClickInside = hamburgerMenu.contains(event.target);
  const isNavClickInside = navLinks.contains(event.target);
  
  if (!isClickInside && !isNavClickInside) {
    hamburgerMenu.classList.remove('active');
    navLinks.classList.remove('active');
  }
});
