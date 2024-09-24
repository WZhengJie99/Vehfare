document.getElementById('menu-button').addEventListener('click', function () {
    var menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
});

document.getElementById('close-button').addEventListener('click', function () {
    var menu = document.getElementById('menu');
    menu.classList.add('hidden');
});

let lastScrollTop = 0;
const navbar = document.querySelector('nav');
const navbarHeight = navbar.offsetHeight;

window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll <= navbarHeight) {
        // Show the navbar when at the top of the page
        navbar.classList.remove('hidden');
    } else if (currentScroll > lastScrollTop) {
        // Hide the navbar when scrolling down
        navbar.classList.add('hidden');
    } else {
        // Show the navbar when scrolling up
        navbar.classList.remove('hidden');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section');
    const slider = document.getElementById("img-slider");
    const frontImage = document.querySelector(".front-img");
    const backImageText = document.querySelector(".back-img-text");
    const frontImageText = document.querySelector(".front-img-text");

    // Set initial clip path based on slider value
    const initialValue = slider.value;
    frontImage.style.clipPath = `polygon(0 0, ${initialValue}% 0, ${initialValue - 12}% 100%, 0 100%)`;

    function checkSections() {
        const triggerBottom = window.innerHeight / 5 * 4;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < triggerBottom) {
                section.classList.add('visible');
            } else {
                section.classList.remove('visible');
            }
        });
    }

    window.addEventListener('scroll', checkSections);
    checkSections();

    // Update slider value and clip path based on mouse movement
    document.addEventListener("mousemove", function (event) {
        const sliderRect = slider.getBoundingClientRect();
        const sliderWidth = sliderRect.width;

        // Calculate the percentage based on mouse position
        const percentage = Math.min(Math.max((event.clientX - sliderRect.left) / sliderWidth * 100, 0), 100);
        slider.value = percentage;

        frontImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage - 12}% 100%, 0 100%)`;

        // Update text visibility based on the percentage
        if (percentage >= 59 && percentage < 78) {
            backImageText.style.display = "block";
            frontImageText.style.display = "block";
        } else if (percentage >= 60) {
            backImageText.style.display = "none";
            frontImageText.style.display = "block";
        } else {
            backImageText.style.display = "block";
            frontImageText.style.display = "none";
        }
    });
});
