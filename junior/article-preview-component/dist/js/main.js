let shareContainers = document.querySelectorAll('.share-container');
shareContainers.forEach((container) => {
  let shareBtn = document.querySelector('.share-btn');
  let sharePopup = document.querySelector('.share-popup');
  
  shareBtn.addEventListener('click', (event) => {
    sharePopup.classList.toggle('hidden');
    sharePopup.classList.toggle('vissible');

    event.currentTarget.classList.toggle('share-btn--toggle');
  });

});
//shareBtn.