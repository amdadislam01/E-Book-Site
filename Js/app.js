// Authentication state
let isLoggedIn = false;

// DOM Elements
const authModal = document.getElementById("authModal");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const authTitle = document.getElementById("authTitle");
const authSubtitle = document.getElementById("authSubtitle");
const readerModal = document.getElementById("readerModal");
const userDropdown = document.getElementById("userDropdown");

// Toggle authentication modal
function toggleAuthModal() {
  authModal.classList.toggle("active");
  if (!authModal.classList.contains("active")) {
    // Reset to login form when closing modal
    showLoginForm();
  }
}

// Show login form
function showLoginForm() {
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
  authTitle.textContent = "Welcome Back";
  authSubtitle.textContent = "Sign in to access your library";
}

// Show signup form
function showSignupForm() {
  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
  authTitle.textContent = "Create Account";
  authSubtitle.textContent = "Join our digital library community";
}

// Login user
function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // Simple validation
  if (!email || !password) {
    alert("Please fill in all fields");
    return;
  }

  // Simulate successful login
  isLoggedIn = true;
  toggleAuthModal();
  updateAuthUI();

  // In a real app, you would make an API call here
  console.log("User logged in:", email);
}

// Signup user
function signupUser() {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById(
    "signupConfirmPassword"
  ).value;
  const agreeTerms = document.getElementById("agreeTerms").checked;

  // Validation
  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill in all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  if (!agreeTerms) {
    alert("You must agree to the terms and conditions");
    return;
  }

  // Simulate successful signup
  isLoggedIn = true;
  toggleAuthModal();
  updateAuthUI();

  // In a real app, you would make an API call here
  console.log("User signed up:", { name, email });
}

// Logout user
function logoutUser() {
  isLoggedIn = false;
  updateAuthUI();
  console.log("User logged out");
}

// Update UI based on authentication state
function updateAuthUI() {
  const signInBtn = document.querySelector(
    'header button[onclick="toggleAuthModal()"]'
  );

  if (isLoggedIn) {
    signInBtn.innerHTML = `
                    <div class="flex items-center" onclick="toggleUserDropdown()">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" class="w-8 h-8 rounded-full mr-2">
                        <span>My Account</span>
                    </div>
                `;
    signInBtn.onclick = toggleUserDropdown;
  } else {
    signInBtn.innerHTML = "Sign In";
    signInBtn.onclick = toggleAuthModal;
    userDropdown.classList.add("hidden");
  }
}

// Toggle user dropdown
function toggleUserDropdown() {
  userDropdown.classList.toggle("hidden");
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
  if (
    !event.target.closest("#userDropdown") &&
    !event.target.closest('header button[onclick="toggleUserDropdown()"]')
  ) {
    userDropdown.classList.add("hidden");
  }
});

// Open book reader
function openReader(title, author) {
  document.getElementById("readerBookTitle").textContent = title;
  document.getElementById("readerBookAuthor").textContent = author;
  readerModal.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent scrolling
}

// Close book reader
function closeReader() {
  readerModal.classList.remove("active");
  document.body.style.overflow = ""; // Re-enable scrolling
}

// Close modals when clicking outside content
window.addEventListener("click", function (event) {
  if (event.target === authModal) {
    toggleAuthModal();
  }
  if (event.target === readerModal) {
    closeReader();
  }
});

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  updateAuthUI();

  // Add click event to all book cards
  document.querySelectorAll(".book-card").forEach((card) => {
    card.addEventListener("click", function () {
      const title = this.querySelector("h3").textContent;
      const author = this.querySelector("p").textContent;
      openReader(title, author);
    });
  });
});
