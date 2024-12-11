function setupCarousel(carouselId) {
    const track = document.querySelector(`${carouselId} .carousel-track`);
    const slides = Array.from(track.children);
    const nextButton = document.querySelector(`${carouselId} .carousel-btn.next`);
    const prevButton = document.querySelector(`${carouselId} .carousel-btn.prev`);

    // Clone the first and last slides for seamless looping
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    const allSlides = Array.from(track.children);
    let currentIndex = 1;

    // Dynamically calculate slide width
    function setSlideWidth() {
        const slideWidth = allSlides[1].getBoundingClientRect().width; // Reference a real slide
        allSlides.forEach((slide) => {
            slide.style.width = `${slideWidth}px`;
        });
        track.style.transform = `translateX(-${slideWidth}px)`; // Start at the first real slide
        return slideWidth;
    }

    let slideWidth = setSlideWidth();

    function moveToSlide(index) {
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    nextButton.addEventListener('click', () => {
        currentIndex++;
        moveToSlide(currentIndex);

        // Reset to the first real slide after the last clone
        if (currentIndex === allSlides.length - 1) {
            setTimeout(() => {
                track.style.transition = 'none';
                currentIndex = 1;
                track.style.transform = `translateX(-${slideWidth}px)`;
            }, 500); // Match the transition duration
        }
    });

    prevButton.addEventListener('click', () => {
        currentIndex--;
        moveToSlide(currentIndex);

        // Reset to the last real slide after the first clone
        if (currentIndex === 0) {
            setTimeout(() => {
                track.style.transition = 'none';
                currentIndex = allSlides.length - 2;
                track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            }, 500); // Match the transition duration
        }
    });

    // Dynamically adjust on window resize
    window.addEventListener('resize', () => {
        slideWidth = setSlideWidth();
        moveToSlide(currentIndex); // Reset position based on new slide width
    });

    // Initialize slides on page load
    slideWidth = setSlideWidth();
}

// Initialize the Chef Specials carousel
setupCarousel("#chefs");

// Initialize the Gallery carousel
setupCarousel("#gallery");
