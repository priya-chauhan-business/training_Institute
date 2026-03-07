const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav a");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !phone || !message) {
    formMessage.textContent = "Please fill in all fields.";
    formMessage.style.color = "#b91c1c";
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    formMessage.textContent = "Please enter a valid email address.";
    formMessage.style.color = "#b91c1c";
    return;
  }

  formMessage.textContent =
    "Thank you! Your enquiry has been submitted successfully.";
  formMessage.style.color = "#166534";

  contactForm.reset();
});
