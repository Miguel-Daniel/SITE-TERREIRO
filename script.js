const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const heroImages = document.querySelectorAll('.hero img');
const accordionItems = document.querySelectorAll('.accordion-item');
const revealItems = document.querySelectorAll('.reveal');

if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

accordionItems.forEach(item => {
    const button = item.querySelector('.accordion-btn');
    const content = item.querySelector('.accordion-content');
    const icon = item.querySelector('.icon');

    if (!button || !content || !icon) {
        return;
    }

    button.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        accordionItems.forEach(currentItem => {
            currentItem.classList.remove('active');

            const currentButton = currentItem.querySelector('.accordion-btn');
            const currentContent = currentItem.querySelector('.accordion-content');
            const currentIcon = currentItem.querySelector('.icon');

            if (currentButton) {
                currentButton.setAttribute('aria-expanded', 'false');
            }

            if (currentContent) {
                currentContent.style.maxHeight = '';
            }

            if (currentIcon) {
                currentIcon.textContent = '+';
            }
        });

        if (!isOpen) {
            item.classList.add('active');
            button.setAttribute('aria-expanded', 'true');
            content.style.maxHeight = `${content.scrollHeight}px`;
            icon.textContent = '-';
        }
    });
});

if (heroImages.length > 1) {
    let heroIndex = 0;

    window.setInterval(() => {
        heroImages[heroIndex].classList.remove('active');
        heroIndex = (heroIndex + 1) % heroImages.length;
        heroImages[heroIndex].classList.add('active');
    }, 8000);
}

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealItems.forEach(item => observer.observe(item));
} else {
    revealItems.forEach(item => item.classList.add('is-visible'));
}
