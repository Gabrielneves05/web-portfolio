const hamburgerIcon = document.querySelector('.hamburger-icon');
const menuLinks = document.querySelector('.menu-links');

const menuItems = document.querySelectorAll('.menu-links a');

hamburgerIcon.addEventListener('click', (event) => {
    hamburgerIcon.classList.toggle('open');
    menuLinks.classList.toggle('open');

    if(hamburgerIcon.classList.contains('open')) {
        hamburgerIcon.classList.remove('close');
        menuLinks.classList.remove('close');
    } else {
        hamburgerIcon.classList.add('close');
        menuLinks.classList.add('close');
    }
});

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburgerIcon.classList.remove('open');
        menuLinks.classList.remove('open');
        hamburgerIcon.classList.add('close');
        menuLinks.classList.add('close');
    })
})