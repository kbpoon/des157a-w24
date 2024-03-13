(function () {
    'use strict';

    let img = document.querySelector('figure img');
    let defaultStyle = img.style.cssText;
    let isHovered = false;
    let overlay = document.querySelector('.overlay'); // Reference to the overlay element

    document.querySelectorAll('.polaroid').forEach(function (polaroid, index) {
        polaroid.addEventListener('mouseover', function () {
            isHovered = true;
            moveImageToSection(index + 1); // Adjust to match section indices
        });

        polaroid.addEventListener('mouseout', function () {
            isHovered = false;
            resetImage();
        });

        polaroid.addEventListener('click', function () {
            polaroid.classList.toggle('flipped');
            toggleOverlay(index); // show member overlays
            
            // make pola larger and center 
            if (polaroid.classList.contains('flipped')) {
                polaroid.style.transform = 'scale(1.4) rotate(0deg)';
                polaroid.style.transition = 'all 0.5s ease';
                polaroid.style.zIndex = '5';
                polaroid.style.top = '25%';
                polaroid.style.marginLeft = '-150px';
            } else {
                // resetttt
                polaroid.style.transform = '';
                polaroid.style.transition = '';
                polaroid.style.zIndex = '';
                polaroid.style.marginLeft = '';
            }
        });
    });

    function moveImageToSection(sectionIndex) {
        const translation = getTranslationForSection(sectionIndex);
        
        img.style.transition = 'transform 1.1s ease-in-out'; // Adjust the easing function
        img.style.transform = `translate(${translation.left}px, ${translation.top}px) scale(${translation.scale})`;
    }

    function resetImage() {
        if (!isHovered) {
            img.style.cssText = defaultStyle;
            moveImageToSection(0);
        }
    }

    // Initialize to default position
    moveImageToSection(0);

    // Function to manually set translation for each section
    function getTranslationForSection(sectionIndex) {
        switch (sectionIndex) {
            case 1: // Yeosang
                return { left: -800, top: -900, scale: 1.1 };
            case 2: // Hongjoong
                return { left: 45, top: -450, scale: 1.1 };
            case 3: // Seonghwa
                return { left: -600, top: -500, scale: 1.2 };
            case 4: // Yunho
                return { left: -150, top: 125, scale: 1.5 };
            case 5: // San
                return { left: -550, top: 125, scale: 1.6 };
            case 6: // Mingi
                return { left: -1100, top: 125, scale: 1.4 };
            case 7: // Wooyoung
                return { left: -2000, top: -550, scale: 1.2 };
            case 8: // Jongho
                return { left: -1300, top: -600, scale: 1.2 };
            default:
                return { left: -1100, top: -500, scale: 0.3 }; // Default case
        }
    }

    function toggleOverlay(index) {
        const overlays = document.querySelectorAll('.overlay');
        overlays.forEach(function (overlay, i) {
            if (i === index) {
                overlay.style.display = overlay.style.display === 'block' ? 'none' : 'block';
            } else {
                overlay.style.display = 'none';
            }
        });
    }

})();
