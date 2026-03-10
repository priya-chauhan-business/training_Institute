const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const tabPanels = document.querySelectorAll(".tab-panel");
const tabJumpButtons = document.querySelectorAll(".tab-jump");

function activateTab(tabId) {
  tabPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === tabId);
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.tabTarget === tabId);
  });

  if (navMenu) {
    navMenu.classList.remove("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const targetTab = link.dataset.tabTarget;
    activateTab(targetTab);
  });
});

tabJumpButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetTab = button.dataset.tabTarget;
    activateTab(targetTab);
  });
});

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

/* HOME SLIDER */
const homeSlides = document.querySelectorAll(".home-slide");
const sliderDots = document.querySelectorAll(".slider-dot");
const nextSlideButton = document.querySelector(".home-next-slide");
const prevSlideButton = document.querySelector(".home-prev-slide");

let currentHomeSlide = 0;

function showHomeSlide(index) {
  if (!homeSlides.length) return;

  if (index < 0) {
    currentHomeSlide = homeSlides.length - 1;
  } else if (index >= homeSlides.length) {
    currentHomeSlide = 0;
  } else {
    currentHomeSlide = index;
  }

  homeSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === currentHomeSlide);
  });

  sliderDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === currentHomeSlide);
  });
}

if (nextSlideButton) {
  nextSlideButton.addEventListener("click", () => {
    showHomeSlide(currentHomeSlide + 1);
  });
}

if (prevSlideButton) {
  prevSlideButton.addEventListener("click", () => {
    showHomeSlide(currentHomeSlide - 1);
  });
}

sliderDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const targetIndex = Number(dot.dataset.homeTarget);
    showHomeSlide(targetIndex);
  });
});

showHomeSlide(0);

/* FORM VALIDATION */
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setupForm(formId, messageId, successMessage) {
  const form = document.getElementById(formId);
  const messageBox = document.getElementById(messageId);

  if (!form || !messageBox) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const requiredFields = form.querySelectorAll(
      "input[required], textarea[required], select[required]"
    );

    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
      }
    });

    const emailField = form.querySelector('input[type="email"]');
    if (emailField && !validateEmail(emailField.value.trim())) {
      messageBox.textContent = "Please enter a valid email address.";
      messageBox.style.color = "#b91c1c";
      return;
    }

    if (!isValid) {
      messageBox.textContent = "Please fill in all required fields.";
      messageBox.style.color = "#b91c1c";
      return;
    }

    messageBox.textContent = successMessage;
    messageBox.style.color = "#166534";
    form.reset();
  });
}

setupForm(
  "admissionsForm",
  "admissionsFormMessage",
  "Thank you! Your admissions enquiry has been submitted successfully."
);

setupForm(
  "contactForm",
  "contactFormMessage",
  "Thank you! Your message has been sent successfully."
);
