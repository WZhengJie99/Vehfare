document.addEventListener("DOMContentLoaded", () => {
    const imageGallery = document.getElementById('imageGallery');
    const dropdown = document.getElementById('customDropdown');
    const button = dropdown.querySelector('.dropdown-btn');
    const content = dropdown.querySelector('.dropdown-content');
    const modalImage = document.getElementById('modalImage');
    const imageModal = document.getElementById('imageModal');
    const modalName = document.getElementById('modalName');
    const closeModal = document.getElementById('closeModal');

    // JSON data
    const imagesData = [
        {
            "name": "A008",
            "catchP": "A008",
            "date": "20-09-2024",
            "src": "../assets/ComfyUI_00004_.png",
            "tags": ["vehicle"],
            "link": "#"
        },
        {
            "name": "A010",
            "catchP": "A010 - Morph to your ideal ride",
            "date": "21-09-2024",
            "src": "../assets/ComfyUI_00009_.png",
            "tags": ["vehicle"],
            "link": "a010.html"
        },
        {
            "name": "A010",
            "catchP": "A010 - Morph to your ideal ride",
            "date": "21-09-2024",
            "src": "../assets/ComfyUI_00008_.png",
            "tags": ["vehicle"],
            "link": "a010.html"
        },
        {
            "name": "A009",
            "catchP": "A009",
            "date": "21-09-2024",
            "src": "../assets/ComfyUI_00011_.png",
            "tags": ["vehicle", "unique"],
            "link": "#"
        },
        {
            "name": "A010",
            "catchP": "A010 - Morph to your ideal ride",
            "date": "22-09-2024",
            "src": "../assets/ComfyUI_00019_.png",
            "tags": ["vehicle"],
            "link": "a010.html"
        },
        {
            "name": "A010",
            "catchP": "A010 - Morph to your ideal ride",
            "date": "22-09-2024",
            "src": "../assets/ComfyUI_00020_.png",
            "tags": ["vehicle", "unique"],
            "link": "a010.html"
        },
        {
            "name": "A010",
            "catchP": "A010 - Morph to your ideal ride",
            "date": "23-09-2024",
            "src": "../assets/ComfyUI_00031_.png",
            "tags": ["vehicle"],
            "link": "a010.html"
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

        card.addEventListener('click', () => {
            modalImage.src = image.src;
            modalName.textContent = image.name;
            modalImage.dataset.link = image.link;
            imageModal.style.display = 'flex';
        });
    }

    modalImage.addEventListener('click', () => {
        const link = modalImage.dataset.link;
        if (link) {
            window.location.href = link;
        }
    });

    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal || e.target === closeModal) {
            imageModal.style.display = 'none';
        }
    });

    document.querySelectorAll('.filter-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const tag = link.getAttribute('data-value');
            renderGallery(tag);
        });
    });

    function getURLParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
    
    window.addEventListener('DOMContentLoaded', () => {
        const filterTag = getURLParameter('filter') || 'all';
        renderGallery(filterTag);
    });

    // filter
    function renderGallery(filterTag) {
        imageGallery.innerHTML = '';

        let filteredImages = imagesData;

        // Filter by tag
        if (filterTag !== 'all') {
            filteredImages = imagesData.filter(image => image.tags.includes(filterTag));
        }

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
