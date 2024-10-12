const hamburgerIcon = document.querySelector('.hamburger-icon');
const menuLinks = document.querySelector('.menu-links');

const menuItems = document.querySelectorAll('.menu-links a');

const btnCv = document.querySelector('.btn-cv');
const btnContact = document.querySelector('.btn-contact');

const body = document.querySelector('body');

hamburgerIcon.addEventListener('click', () => {
    hamburgerIcon.classList.toggle('open');
    menuLinks.classList.toggle('open');

    if(hamburgerIcon.classList.contains('open')) {
        hamburgerIcon.classList.remove('close');
        menuLinks.classList.remove('close');
        body.classList.add('no-scroll');
    } else {
        hamburgerIcon.classList.add('close');
        menuLinks.classList.add('close');
        body.classList.remove('no-scroll');
    }
});

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburgerIcon.classList.remove('open');
        menuLinks.classList.remove('open');
        hamburgerIcon.classList.add('close');
        menuLinks.classList.add('close');
        body.classList.remove('no-scroll');
    })
});

btnCv.addEventListener('click', () => {
    window.open('./assets/curriculo-gabrielneves.att.pdf');
});

btnContact.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = './#contact';
});