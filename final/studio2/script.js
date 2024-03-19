(function () {
    'use strict';

    let img = document.querySelector('figure img');
    let defaultStyle = img.style.cssText;
    let isHovered = false;
    let overlay = document.querySelector('.overlay'); // Reference to the overlay element
    

        document.addEventListener('DOMContentLoaded', function() { 
            const introAudio = new Audio('finalmedia/ateezintro.mp3');
            introAudio.play();
            introAudio.volume = 0.5;

            // Function to close overlay and reset polaroid position
            function closeOverlay(event) {
                const overlay = event.target.closest('.overlay');
                if (overlay) {
                    overlay.style.display = 'none';
                    const polaroid = overlay.parentElement.querySelector('.polaroid');
                    if (polaroid) {
                        setTimeout(function() {
                            polaroid.style.cssText = defaultStyle; // Reset style to default after a short delay
                        }, 300); // Adjust timing to match transition duration
                    }
                    // Pause the audio when overlay closes
                    const audio = overlay.querySelector('audio');
                    if (audio) {
                        audio.pause();
                    }
                }
            }
        
            // Add event listeners to all close buttons
            const closeButtons = document.querySelectorAll('.close');
            closeButtons.forEach(function(button) {
                button.addEventListener('click', closeOverlay);
            });
        
            // Play audio when overlay opens
            const overlays = document.querySelectorAll('.overlay');
            overlays.forEach(function(overlay) {
                const polaroid = overlay.parentElement.querySelector('.polaroid');
                const audio = overlay.querySelector('audio');
                if (audio && polaroid) {
                    polaroid.addEventListener('click', function() {
                        audio.currentTime = 0; // Reset audio to start
                        audio.play();
                    });
                }
            });
        
            // Reset all polaroids to default position
            document.querySelectorAll('.polaroid').forEach(function(polaroid) {
                polaroid.style.cssText = defaultStyle; // Reset style to default
            });
        });
        
        
        document.querySelectorAll('.polaroid').forEach(function(polaroid, index) {
            polaroid.addEventListener('mouseover', function () {
                isHovered = true;
                moveImageToSection(index + 1); // Adjust to match section indices
            });
    
            polaroid.addEventListener('mouseout', function () {
                isHovered = false;
                resetImage();
            });
            
            polaroid.addEventListener('click', function() {
                const gifSrc = polaroid.dataset.gif; // Get the GIF filename from the data-gif attribute
                const imgSrc = polaroid.querySelector('.imgBx img').src; // Get the original image source
        
                // Toggle between the original image and the GIF
                if (polaroid.classList.contains('flipped')) {
                    polaroid.querySelector('.imgBx img').src = imgSrc; // Revert to the original image
                } else {
                    polaroid.querySelector('.imgBx img').src = gifSrc; // Display the GIF
                }
        
                polaroid.classList.toggle('flipped');
                toggleOverlay(index); // show member overlays
        
                // make polaroid larger and centered
                if (polaroid.classList.contains('flipped')) {
                    polaroid.style.transform = 'scale(1.4) rotate(0deg)';
                    polaroid.style.transition = 'all 0.5s ease';
                    polaroid.style.zIndex = '5';
                    polaroid.style.top = '25%';
                    polaroid.style.marginLeft = '-150px';
                } else {
                    // reset
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
