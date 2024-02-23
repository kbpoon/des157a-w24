(function () {
    'use strict';

    // Adding Scrolling Captions
    const captions = [
        '',            // Empty string for the first element
        '1. yeosangs',
        '2. hongjoong',
        '3. seonghwa',
        '4. yunho',
        '5. san',
        '6. mingi',
        '7. wooyoung',
        '8. jongho'
    ];

    let figCaption = document.querySelector('figcaption');
    let img = document.querySelector('figure img');
    let defaultStyle = img.style.cssText;

    figCaption.innerHTML = captions[1];

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    window.addEventListener('load', function () {
        const posts = document.querySelectorAll('section');
        let postTops = [];
        let pageTop;
        let counter = 1;
        let prevCounter = 1;
        let doneResizing;
        let exitDirection;
        let enterDirection;

        resetPagePosition();

        window.addEventListener('scroll', function () {
            pageTop = window.pageYOffset + 300;

            // Check scroll direction
            if (pageTop > postTops[counter]) {
                counter++;
                console.log(`scrolling down ${counter}`);
            } else if (counter > 1 && pageTop < postTops[counter - 1]) {
                counter--;
                console.log(`scrolling up ${counter}`);
            }

            if (counter != prevCounter) {
                img.className = 'sect' + counter;
                if (counter > prevCounter) {
                    exitDirection = 'animate exitup';
                    enterDirection = 'animate enterup';
                } else {
                    exitDirection = 'animate exitdown';
                    enterDirection = 'animate enterdown';
                }

                // Animation is completed
                figCaption.className = exitDirection;
                figCaption.addEventListener('animationend', function () {
                    let newCaption = document.querySelector('figcaption').cloneNode(true);
                    figCaption.remove();
                    newCaption.className = enterDirection;
                    newCaption.innerHTML = captions[counter];
                    document.querySelector('figure').appendChild(newCaption);
                    figCaption = document.querySelector('figcaption');
                });

                prevCounter = counter;
            }
        }); // end window scroll function

        window.addEventListener('resize', function () {
            clearTimeout(doneResizing);

            // Start a timer that calls the resetPagePosition function in 500ms
            doneResizing = setTimeout(function () {
                resetPagePosition();
            }, 500);
        });

        // Handle mouseover and mouseout events on polaroids
        document.querySelectorAll('.polaroid').forEach(function (polaroid, index) {
            polaroid.addEventListener('mouseover', function () {
                moveImageToSection(index + 1);
            });

            polaroid.addEventListener('mouseout', function () {
                resetImage();
            });
        });

        function resetPagePosition() {
            // Clear out the postTop values
            postTops = [];

            // Push the new top values for each post in the Posts Array
            posts.forEach(function (post) {
                postTops.push(Math.floor(post.getBoundingClientRect().top) + window.pageYOffset);
            });

            // Hold the position of the document
            const pagePosition = window.scrollY + 300;
            counter = 0;

            // Increment counter based on the pagePosition 
            postTops.forEach(function (post) {
                if (pagePosition > post) {
                    counter++;
                }
            });

            // Ensure counter does not go beyond the length of captions
            counter = Math.min(counter, captions.length - 1);
        }

        function moveImageToSection(sectionIndex) {
            const targetSection = document.querySelector('.sect' + sectionIndex);

            if (targetSection) {
                const rect = targetSection.getBoundingClientRect();
                const left = rect.left + window.pageXOffset;
                const top = rect.top + window.pageYOffset;
                const scale = 1.2;

                img.style.transition = 'transform 0.5s';
                img.style.transform = `translate(${left}px, ${top}px) scale(${scale})`;

                // Optionally, you can update the caption accordingly
                figCaption.innerHTML = captions[sectionIndex];
            }
        }

        function resetImage() {
            img.style.cssText = defaultStyle;
            figCaption.innerHTML = captions[counter];
        }

    }); // end window load function

})(); // END IIFE
