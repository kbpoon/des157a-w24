(function () {
    'use strict';
    console.log('reading js');
  
    const myForm = document.querySelector('#myForm');
    const introChat = document.querySelector('#introChat');
    const madlib = document.querySelector('#madlib');
    const B1 = document.querySelector('.B1');
    const B2 = document.querySelector('.B2');
    const B3 = document.querySelector('.B3');
    const A2 = document.querySelector('.A2');
    const A3 = document.querySelector('.A3');

   madlib.style.display = 'none';
  
    myForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const greeting1 = document.querySelector('#greeting1').value;
      const name1 = document.querySelector('#name1').value;
      const name2 = document.querySelector('#name2').value;
      const place1 = document.querySelector('#place1').value;
      const adj1 = document.querySelector('#adj1').value;
      const noun1 = document.querySelector('#noun1').value;
      const verb1 = document.querySelector('#verb1').value;
      const adverb1 = document.querySelector('#adverb1').value;
      const exclam1 = document.querySelector('#exclam1').value;
      const adj2 = document.querySelector('#adj2').value;
      const body1 = document.querySelector('#body1').value;
      const face1 = document.querySelector('#face1').value;
  
      const b1Text = `${greeting1} ${name1}`;
      const b2Text = `${exclam1}. I WOULD NEVER! I LOVE YOUR ${adj2} ${body1} TOO MUCH.`;
      const b3Text = `${face1}.`;
      const a2Text = `i saw you and ${name2} together at ${place1} yesterday. did you think you could fool me?? why would you choose them over me. they have ${adj1} ${noun1} and ${verb1} ${adverb1}!`;
      const a3Text = `WHY WOULD YOU CHOOSE THEM OVER ME?!? they have ${adj1} ${noun1} and ${verb1} ${adverb1}!`;
  
      // Update content of paragraphs
      B1.innerHTML = b1Text;
      B2.innerHTML = b2Text;
      B3.innerHTML = b3Text;
      A2.innerHTML = a2Text;
      A3.innerHTML = a3Text;
  
      // Show madlib article and hide introChat article
      introChat.style.display = 'none';
      madlib.style.display = 'block';
    });
  })();
  