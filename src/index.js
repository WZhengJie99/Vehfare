document.getElementById('menu-button').addEventListener('click', function() {
    var menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
});

document.getElementById('close-button').addEventListener('click', function() {
    var menu = document.getElementById('menu');
    menu.classList.add('hidden');
});

let lastScrollTop = 0;
    const navbar = document.querySelector('nav');
    const navbarHeight = navbar.offsetHeight;
    
    window.addEventListener('scroll', function() {
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