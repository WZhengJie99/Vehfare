document.addEventListener("DOMContentLoaded", () => {
    const imageGallery = document.getElementById('imageGallery');
    const dropdown = document.getElementById('customDropdown');
    const button = dropdown.querySelector('.dropdown-btn');
    const content = dropdown.querySelector('.dropdown-content');

    // JSON data
    const imagesData = [
        {
            "name": "ComfyUI_00004",
            "date": "20-09-2024",
            "src": "../assets/ComfyUI_00004_.png",
            "tags": ["vehicle", "unique"]
        },
        {
            "name": "A010",
            "date": "21-09-2024",
            "src": "../assets/ComfyUI_00009_.png",
            "tags": ["vehicle"]
        },
        {
            "name": "A010",
            "date": "21-09-2024",
            "src": "../assets/ComfyUI_00008_.png",
            "tags": ["vehicle"]
        },
        {
            "name": "ComfyUI_00011",
            "date": "21-09-2024",
            "src": "../assets/ComfyUI_00011_.png",
            "tags": ["vehicle"]
        },
        {
            "name": "A010",
            "date": "22-09-2024",
            "src": "../assets/ComfyUI_00019_.png",
            "tags": ["vehicle"]
        },
        {
            "name": "A010",
            "date": "22-09-2024",
            "src": "../assets/ComfyUI_00020_.png",
            "tags": ["vehicle"]
        },
        {
            "name": "A010",
            "date": "23-09-2024",
            "src": "../assets/ComfyUI_00031_.png",
            "tags": ["vehicle"]
        }
    ];

    // image cards
    function createImageCard(image) {
        const card = document.createElement('div');
        card.classList.add('gallery-card');
        card.setAttribute('data-name', image.name);
        card.setAttribute('data-date', image.date);
        card.setAttribute('data-tags', image.tags.join(','));

        // Randomly make some cards larger
        if (Math.random() > 0.7) { // 30% chance to enlarge the image
            card.classList.add('large');
        }

        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.name;

        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        const title = document.createElement('h4');
        title.textContent = image.name;
        overlay.appendChild(title);

        card.appendChild(img);
        card.appendChild(overlay);
        imageGallery.appendChild(card);

        // Enlarge image on click
        card.addEventListener('click', () => {
            modalImage.src = image.src;
            imageModal.style.display = 'flex';
        });
    }

     imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal || e.target === closeModal) {
            imageModal.style.display = 'none';
        }
    });

    // filter
    function renderGallery(filterTag) {
        // Clear current images
        imageGallery.innerHTML = '';

        let filteredImages = imagesData;

        // Filter by tag
        if (filterTag !== 'all') {
            filteredImages = imagesData.filter(image => image.tags.includes(filterTag));
        }

        // Sort by date if applicable
        if (filterTag === 'date-asc') {
            filteredImages.sort((a, b) => new Date(a.date.split('-').reverse().join('-')) - new Date(b.date.split('-').reverse().join('-')));
        } else if (filterTag === 'date-desc') {
            filteredImages.sort((a, b) => new Date(b.date.split('-').reverse().join('-')) - new Date(a.date.split('-').reverse().join('-')));
        }

        filteredImages.forEach(createImageCard);
    }

    renderGallery('all');

    // Handle dropdown button click
    button.addEventListener('click', () => {
        dropdown.classList.toggle('show');
    });

    // Handle option selection
    content.querySelectorAll('a').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedValue = option.getAttribute('data-value');
            button.textContent = option.textContent;
            dropdown.classList.remove('show');
            renderGallery(selectedValue);
        });
    });

    window.addEventListener('click', (event) => {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    });

});
