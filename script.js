const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const tabButtons = document.querySelectorAll(".tab-btn");
const tabJumpButtons = document.querySelectorAll(".tab-jump");
const tabPanels = document.querySelectorAll(".tab-panel");

function activateTab(tabId) {
  tabPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === tabId);
  });

  tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.tabTarget === tabId);
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.tabTarget === tabId);
  });

  const tabWrapper = document.querySelector(".tab-wrapper");
  if (tabWrapper) {
    tabWrapper.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (navMenu) {
    navMenu.classList.remove("active");
  }
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    activateTab(link.dataset.tabTarget);
  });
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activateTab(button.dataset.tabTarget);
  });
});

tabJumpButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activateTab(button.dataset.tabTarget);
  });
});

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setupForm(formId, messageId, successText) {
  const form = document.getElementById(formId);
  const messageBox = document.getElementById(messageId);

  if (!form || !messageBox) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const inputs = form.querySelectorAll(
      "input[required], textarea[required], select[required]"
    );

    let isValid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
      }
    });

    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && !validateEmail(emailInput.value.trim())) {
      isValid = false;
      messageBox.textContent = "Please enter a valid email address.";
      messageBox.style.color = "#b91c1c";
      return;
    }

    if (!isValid) {
      messageBox.textContent = "Please fill in all required fields.";
      messageBox.style.color = "#b91c1c";
      return;
    }

    messageBox.textContent = successText;
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
