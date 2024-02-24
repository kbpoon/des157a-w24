(function () {
    'use strict';

    let img = document.querySelector('figure img');
    let defaultStyle = img.style.cssText;
    let isHovered = false;

    document.querySelectorAll('.polaroid').forEach(function (polaroid, index) {
        polaroid.addEventListener('mouseover', function () {
            isHovered = true;
            moveImageToSection(index + 1); // Adjust to match section indices
        });

        polaroid.addEventListener('mouseout', function () {
            isHovered = false;
            resetImage();
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
            case 1: //yeosang
                return { left: -800, top: -900, scale: 1.1 };
            case 2: //hongjoong
                return { left: 45, top: -450, scale: 1.1 };
            case 3: //seonghwa
                return { left: -600, top: -500, scale: 1.2 };
            case 4: //yunho
                return { left: -150, top: 125, scale: 1.5 };
            case 5: //sannie
                return { left: -550, top: 125, scale: 1.6 };
            case 6: //mingi
                return { left: -1100, top: 125, scale: 1.4 };
            case 7: //wooyoung
                return { left: -2000, top: -550, scale: 1.2 };
            case 8: //jongho
                return { left: -1300, top: -600, scale: 1.2 };
            default:
                return { left: -1100, top: -500, scale: 0.3 }; // Default case
        }
    }

})();
