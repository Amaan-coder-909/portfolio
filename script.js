// ==========================================================================
// UNIQUE TEXT PRELOADER TIMING ENGINE
// ==========================================================================
const introWords = ["Welcome", "To", "My", "Portfolio"];
let wordIndex = 0;

function runCinematicPreloader() {
  const loaderText = document.getElementById("loader-text");
  const preloaderScreen = document.getElementById("preloader");

  if (!loaderText || !preloaderScreen) return;

  function cycleWords() {
    // Check if the sequence array has reached termination limits
    if (wordIndex >= introWords.length) {
      setTimeout(() => {
        // Run full screen reveal layout shift
        preloaderScreen.classList.add("loaded");

        // Unlocks background hero typing exactly after visual panel wipes out
        setTimeout(() => {
          if (typeof typeEffect === "function") typeEffect();
        }, 400);
      }, 300);
      return;
    }

    // 1. Snappy skew out animation trigger
    loaderText.classList.add("hidden");

    // 2. Exact synchronization pause before content replacement
    setTimeout(() => {
      loaderText.textContent = introWords[wordIndex];

      // Position element down with a slight tilt angle for directional velocity
      loaderText.style.transition = 'none';
      loaderText.style.transform = 'translateY(40px) scale(1.1) rotate(3deg)';

      // Force hardware layout update reflow
      loaderText.offsetHeight;

      // Re-apply core high-speed spring bezier curve
      loaderText.style.transition = 'opacity 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)';

      // 3. Fluid bounce presentation phase
      loaderText.classList.remove("hidden");
      loaderText.style.transform = 'translateY(0) scale(1) rotate(0deg)';

      wordIndex++;

      // Controls pacing: each dynamic token gets exactly 1.1s focus window
      setTimeout(cycleWords, 400);
    }, 220); // Sync timing offset
  }

  // Fires sequence pipeline immediately
  cycleWords();
}

// Global initialization connection layer
document.addEventListener("DOMContentLoaded", () => {
  runCinematicPreloader(); // Starts preloader execution pipeline instantly
});

// ==========================================================================
// HERO ANIMATED TYPING EFFECT ENGINE
// ==========================================================================
const phrases = [
  "Frontend Developer",
  "Creative UI Builder",
  "JavaScript Enthusiast"
];

let phraseIndex = 0;
let characterIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const erasingSpeed = 50;
const delayBetweenPhrases = 2000;

function typeEffect() {
  const typingTarget = document.getElementById("typing-text");
  if (!typingTarget) return;

  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typingTarget.textContent = currentPhrase.substring(0, characterIndex - 1);
    characterIndex--;
  } else {
    typingTarget.textContent = currentPhrase.substring(0, characterIndex + 1);
    characterIndex++;
  }

  let currentDelay = isDeleting ? erasingSpeed : typingSpeed;

  if (!isDeleting && characterIndex === currentPhrase.length) {
    currentDelay = delayBetweenPhrases;
    isDeleting = true;
  } else if (isDeleting && characterIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  setTimeout(typeEffect, currentDelay);
}

// ==========================================================================
// SKILLS PROGRESS BAR VIEWPORT ANIMATION
// ==========================================================================
function initSkillAnimations() {
  const skillCards = document.querySelectorAll('.skill-card');

  const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: "0px"
  };

  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector('.progress-bar');
        if (progressBar) {
          progressBar.style.transform = 'scaleX(1)';
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  skillCards.forEach(card => skillObserver.observe(card));
}

// ==========================================================================
// INTERACTIVE PLAYGROUND MODULE
// ==========================================================================
function initDeveloperPlayground() {
  const htmlRoot = document.documentElement;

  // 1. Dynamic Accent Shift Layout Engine
  const swatches = document.querySelectorAll('.swatch');
  swatches.forEach(swatch => {
    swatch.addEventListener('click', (e) => {
      document.querySelector('.active-swatch')?.classList.remove('active-swatch');
      e.target.classList.add('active-swatch');

      const targetAccent = e.target.getAttribute('data-accent');
      const targetHover = e.target.getAttribute('data-hover');

      const hex = targetAccent.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);

      htmlRoot.style.setProperty('--accent', targetAccent);
      htmlRoot.style.setProperty('--accent-hover', targetHover);
      htmlRoot.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`);
    });
  });

  // 2. Motion System Toggle Killswitch
  const animToggle = document.getElementById('anim-toggle');
  const stateText = document.querySelector('.btn-text-state');

  if (animToggle) {
    animToggle.addEventListener('click', () => {
      animToggle.classList.toggle('state-active');
      document.body.classList.toggle('no-animations');

      if (animToggle.classList.contains('state-active')) {
        stateText.textContent = "Motion Engine: Online";
      } else {
        stateText.textContent = "Motion Engine: Frozen";
      }
    });
  }

  // 3. Visualizer Stage Interactions
  const fxButtons = document.querySelectorAll('.fx-btn');
  const fxBox = document.getElementById('fx-box');

  fxButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const activeFxClass = e.target.getAttribute('data-fx');
      e.target.classList.toggle('fx-active');
      fxBox.classList.toggle(activeFxClass);
    });
  });
}

// ==========================================================================
// TIMELINE TRACK CONTROLLER
// ==========================================================================
function initTimelineEngine() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  const progressLine = document.querySelector('.timeline-progress-line');
  const wrapper = document.querySelector('.timeline-track-wrapper');

  if (!wrapper || timelineItems.length === 0) return;

  const nodeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('node-active');
      }
    });
  }, { root: null, threshold: 0.25 });

  timelineItems.forEach(item => nodeObserver.observe(item));

  window.addEventListener('scroll', () => {
    const wrapperRect = wrapper.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const startPoint = wrapperRect.top - windowHeight / 2;
    const trackingHeight = wrapperRect.height;

    if (startPoint < 0) {
      let currentProgress = (Math.abs(startPoint) / trackingHeight) * 100;
      if (currentProgress > 100) currentProgress = 100;
      if (progressLine) progressLine.style.height = `${currentProgress}%`;
    } else {
      if (progressLine) progressLine.style.height = '0%';
    }
  });
}

// Global initialization
document.addEventListener("DOMContentLoaded", () => {
  initSkillAnimations();
  initDeveloperPlayground();
  initTimelineEngine();
});