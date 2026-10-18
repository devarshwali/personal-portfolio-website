// ==========================================================
// Devarsh Wali | Personal Portfolio
// Interactions: Hire Me alert, More about me toggle,
// mobile menu, contact form validation, footer year.
// ==========================================================

// ---------- 1. "Hire Me" button shows an alert ----------
const hireBtn = document.getElementById("hire-btn");
hireBtn.addEventListener("click", () => {
  alert("Thanks for stopping by! Email me at devarshwali@gmail.com and I will reply soon.");
});

// ---------- 2. "More about me" show/hide toggle ----------
const moreBtn = document.getElementById("more-btn");
const moreAbout = document.getElementById("more-about");
moreBtn.addEventListener("click", () => {
  const isHidden = moreAbout.hasAttribute("hidden");
  if (isHidden) {
    moreAbout.removeAttribute("hidden");
    moreBtn.textContent = "Show less";
  } else {
    moreAbout.setAttribute("hidden", "");
    moreBtn.textContent = "More about me";
  }
  moreBtn.setAttribute("aria-expanded", String(isHidden));
});

// ---------- 3. Mobile menu toggle ----------
const menuBtn = document.getElementById("menu-btn");
const siteNav = document.getElementById("site-nav");

function setMenu(open) {
  siteNav.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
}

menuBtn.addEventListener("click", () => {
  setMenu(!siteNav.classList.contains("open"));
});

// Close the menu after a link is tapped
siteNav.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    setMenu(false);
  }
});

// ---------- 4. Contact form validation ----------
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const topicInput = document.getElementById("topic");
const messageInput = document.getElementById("message");
const statusText = document.getElementById("form-status");

// Show or clear an error under one field
function setError(input, message) {
  const errorEl = document.getElementById(input.id + "-error");
  errorEl.textContent = message;
  input.parentElement.classList.toggle("invalid", message !== "");
  input.setAttribute("aria-invalid", message !== "" ? "true" : "false");
}

function validateForm() {
  let valid = true;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (nameInput.value.trim() === "") {
    setError(nameInput, "Please enter your name.");
    valid = false;
  } else {
    setError(nameInput, "");
  }

  if (emailInput.value.trim() === "") {
    setError(emailInput, "Please enter your email.");
    valid = false;
  } else if (!emailPattern.test(emailInput.value.trim())) {
    setError(emailInput, "Please enter a valid email, like name@example.com.");
    valid = false;
  } else {
    setError(emailInput, "");
  }

  if (messageInput.value.trim().length < 10) {
    setError(messageInput, "Please write at least 10 characters.");
    valid = false;
  } else {
    setError(messageInput, "");
  }

  return valid;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  statusText.textContent = "";

  if (!validateForm()) {
    return;
  }

  // The site has no server, so the message opens in the visitor's email app.
  const subject = encodeURIComponent(topicInput.value + " from " + nameInput.value.trim());
  const body = encodeURIComponent(
    messageInput.value.trim() + "\n\nFrom: " + nameInput.value.trim() + " (" + emailInput.value.trim() + ")"
  );
  statusText.textContent = "Thanks, " + nameInput.value.trim() + "! Your email app should open with the message ready to send.";
  window.location.href = "mailto:devarshwali@gmail.com?subject=" + subject + "&body=" + body;
  form.reset();
});

// Clear an error as soon as the visitor starts fixing it
[nameInput, emailInput, messageInput].forEach((input) => {
  input.addEventListener("input", () => {
    if (input.parentElement.classList.contains("invalid")) {
      setError(input, "");
    }
  });
});

// ---------- 5. Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
