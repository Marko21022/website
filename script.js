// === Smooth Scroll for Anchor Links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
  document.addEventListener('DOMContentLoaded', () => {
    const blurOverlay = document.querySelector('.blur-overlay');
    const hero = document.querySelector('#hero');
  
    if (!blurOverlay || !hero) {
      console.error('❌ blur-overlay or hero section not found');
      return;
    }
  
    window.addEventListener('scroll', () => {
      const rect = hero.getBoundingClientRect();
      const distanceFromTop = rect.top;
  
      const triggerDistance = -500;
      const range = 200;
      const maxBlur = 15;
      const maxDarkness = 0.4; // 0.4 = 40% black
  
      let blurAmount = 0;
      let darknessAmount = 0;
  
      if (distanceFromTop <= triggerDistance + range) {
        const ratio = 1 - Math.max((distanceFromTop - triggerDistance) / range, 0);
        blurAmount = maxBlur * ratio;
        darknessAmount = maxDarkness * ratio;
      }
  
      blurOverlay.style.backdropFilter = `blur(${blurAmount}px)`;
      blurOverlay.style.backgroundColor = `rgba(0, 0, 0, ${darknessAmount})`;
  
      // Optional debug:
      // console.log(`Top: ${distanceFromTop}px → Blur: ${blurAmount.toFixed(1)}px, Darkness: ${darknessAmount.toFixed(2)}`);
    });
  });
  
  
  // === Reveal Elements on Scroll ===
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
      }
    });
  }, {
    threshold: 0.1,
  });
  
  document.querySelectorAll(".reveal").forEach(el => {
    observer.observe(el);
  });
  
  // === Optional: Mobile Nav Toggle (add if you add a mobile menu later) ===
  // const menuBtn = document.querySelector('.menu-btn');
  // const navLinks = document.querySelector('.nav-links');
  
  // menuBtn?.addEventListener('click', () => {
  //   navLinks.classList.toggle('open');
  // });
  const dynamicText = document.querySelector(".hero h2 span");
const words = ["Marko", "Developer", "Designer"];
// Variables to track the position and deletion status of the word
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    dynamicText.textContent = currentChar;
    dynamicText.classList.add("stop-blinking");
    if (!isDeleting && charIndex < currentWord.length) {
        // If condition is true, type the next character
        charIndex++;
        setTimeout(typeEffect, 200);
    } else if (isDeleting && charIndex > 0) {
        // If condition is true, remove the previous character
        charIndex--;
        setTimeout(typeEffect, 70);
    } else {
        // If word is deleted then switch to the next word
        isDeleting = !isDeleting;
        dynamicText.classList.remove("stop-blinking");
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        setTimeout(typeEffect, 1200);
    }
}
typeEffect();

new FinisherHeader({
  "count": 5,
  "size": {
    "min": 900,
    "max": 1500,
    "pulse": 0
  },
  "speed": {
    "x": {
      "min": 0,
      "max": 0.3
    },
    "y": {
      "min": 0,
      "max": 0
    }
  },
  "colors": {
    "background": "#0a0d3a",
    "particles": [
      "#394eb0"
    ]
  },
  "blending": "lighten",
  "opacity": {
    "center": 0.15,
    "edge": 0.05
  },
  "skew": -2.3,
  "shapes": [
    "s"
  ]
});


