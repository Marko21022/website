const tiltCards = document.querySelectorAll('.card.tilt');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cardWidth = rect.width;
    const cardHeight = rect.height;
    const centerX = rect.left + cardWidth / 2;
    const centerY = rect.top + cardHeight / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const maxRotate = 8; // a bit more intense tilt

    // Inverted rotation (flip signs)
    const rotateX = (mouseY / (cardHeight / 2)) * maxRotate; 
    const rotateY = (-mouseX / (cardWidth / 2)) * maxRotate;

    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
});
new FinisherHeader({
  "count": 12,
  "size": {
    "min": 1300,
    "max": 1500,
    "pulse": 0
  },
  "speed": {
    "x": {
      "min": 0.6,
      "max": 2
    },
    "y": {
      "min": 0.6,
      "max": 6
    }
  },
  "colors": {
    "background": "#13002a",
    "particles": [
      "#060077",
      "#1b2c6b",
      "#330367",
      "#303eaa"
    ]
  },
  "blending": "lighten",
  "opacity": {
    "center": 0.6,
    "edge": 0
  },
  "skew": -2,
  "shapes": [
    "c"
  ]
});
const modal = document.getElementById('profileModal');
  const closeBtn = modal.querySelector('.close-btn');
  const modalPfp = modal.querySelector('.profile-pfp');
  const modalName = modal.querySelector('.profile-name');
  const modalRole = modal.querySelector('.profile-role');
  const modalInfo = modal.querySelector('.profile-info');

  const teamData = {
    'Jane Doe': {
      role: 'Creative Director',
      pfp: 'https://marko21022.com/f1.png',
      info: 'Jane leads our creative team with passion and precision.',
    },
    'John Smith': {
      role: 'Developer',
      pfp: 'https://marko21022.com/f1.png',
      info: 'John writes clean, efficient code and loves open source.',
    }
  };

  document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('click', () => {
      const name = member.querySelector('h3').textContent;
      const data = teamData[name];
      if (!data) return;

      modalPfp.src = data.pfp;
      modalName.textContent = name;
      modalRole.textContent = data.role;
      modalInfo.textContent = data.info;

      modal.classList.remove('hidden');
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });