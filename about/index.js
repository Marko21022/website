const slider = document.querySelector('.card-slider');
const cardWidth = 230; // 200px card + 30px gap

document.querySelector('.scroll-btn.left').addEventListener('click', () => {
  slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
});

document.querySelector('.scroll-btn.right').addEventListener('click', () => {
  slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
});
