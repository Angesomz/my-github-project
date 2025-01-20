// scripts.js

// 1. Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        window.scrollTo({
            top: target.offsetTop - 50,  // Adjust for fixed header
            behavior: "smooth"
        });
    });
});

// 2. Sticky Navigation Bar on Scroll
const nav = document.querySelector('#main-header');
const stickyOffset = nav.offsetTop;

window.addEventListener('scroll', () => {
    if (window.scrollY >= stickyOffset) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
});

// 3. Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 4. Contact Form Validation
const form = document.querySelector('#contact-form');
const nameInput = form.querySelector('#name');
const emailInput = form.querySelector('#email');
const messageInput = form.querySelector('#message');

form.addEventListener('submit', (e) => {
    let isValid = true;
    // Reset all error messages
    form.querySelectorAll('.error').forEach(error => error.remove());

    // Validate Name
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required.');
        isValid = false;
    }

    // Validate Email
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'Email is required.');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address.');
        isValid = false;
    }

    // Validate Message
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Message is required.');
        isValid = false;
    }

    if (!isValid) e.preventDefault();
});

// Helper Function to Show Error
function showError(input, message) {
    const error = document.createElement('span');
    error.classList.add('error');
    error.textContent = message;
    input.parentElement.appendChild(error);
}

// Helper Function to Check Valid Email
function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}

// 5. Portfolio Grid Filter
const portfolioItems = document.querySelectorAll('.portfolio-item');
const portfolioFilters = document.querySelectorAll('.portfolio-filter');

portfolioFilters.forEach(filter => {
    filter.addEventListener('click', (e) => {
        const category = e.target.dataset.filter;

        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// 6. Image Slider for Portfolio Item
let currentIndex = 0;
const portfolioImages = document.querySelectorAll('.portfolio-item img');
const nextButton = document.querySelector('#next');
const prevButton = document.querySelector('#prev');

function showImage(index) {
    portfolioImages.forEach((img, i) => {
        img.style.display = (i === index) ? 'block' : 'none';
    });
}

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % portfolioImages.length;
    showImage(currentIndex);
});

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + portfolioImages.length) % portfolioImages.length;
    showImage(currentIndex);
});

// 7. Dynamic Year in Footer
const yearElement = document.querySelector('#current-year');
yearElement.textContent = new Date().getFullYear();

// 8. Scroll-to-Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.textContent = '↑';
scrollToTopBtn.classList.add('scroll-to-top');
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// 9. Dark Mode Toggle
const darkModeToggle = document.querySelector('#dark-mode-toggle');
const body = document.querySelector('body');

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
});

// Load Dark Mode Setting from Local Storage
if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
}

// 10. Typing Animation for Hero Section
const typingElement = document.querySelector('#hero h2');
const typingText = "Welcome to My Personal Website!";
let i = 0;

function typeText() {
    if (i < typingText.length) {
        typingElement.textContent += typingText.charAt(i);
        i++;
        setTimeout(typeText, 100);
    }
}

window.addEventListener('load', typeText);

// 11. Modal for Portfolio Item Details
const portfolioModal = document.querySelector('#portfolio-modal');
const portfolioItemsWithModal = document.querySelectorAll('.portfolio-item');

portfolioItemsWithModal.forEach(item => {
    item.addEventListener('click', () => {
        const modalContent = item.querySelector('.overlay').innerHTML;
        portfolioModal.querySelector('.modal-content').innerHTML = modalContent;
        portfolioModal.classList.add('open');
    });
});

portfolioModal.addEventListener('click', (e) => {
    if (e.target === portfolioModal) {
        portfolioModal.classList.remove('open');
    }
});

// 12. Animations on Scroll (AOS-like Effect)
const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

window.addEventListener('scroll', () => {
    elementsToAnimate.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('animated');
        }
    });
});

