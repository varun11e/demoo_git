document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('togglePassword');
  const rememberMeCheckbox = document.getElementById('rememberMe');

  // Password toggle functionality
  let passwordVisible = false;

  togglePasswordBtn.addEventListener('click', () => {
    passwordVisible = !passwordVisible;
    passwordInput.type = passwordVisible ? 'text' : 'password';
    togglePasswordBtn.setAttribute('aria-label', passwordVisible ? 'Hide password' : 'Show password');

    // Update eye icon
    const eyeIcon = togglePasswordBtn.querySelector('.eye-icon');
    eyeIcon.innerHTML = passwordVisible ?
      '<path d="M12 4.5c-7 0-11 8-11 8.5s4 8.5 11 8.5c7 0 11-8.5 11-8.5s-4-8.5-11-8.5z"/><path d="M12 12.5c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7z"/><line x1="12" y1="8" x2="12.01" y2="8"/>' :
      '<path d="M12 4.5c-7 0-11 8-11 8.5s4 8.5 11 8.5c7 0 11-8.5 11-8.5s-4-8.5-11-8.5z"/><path d="M12 12.5c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7z"/>';
  });

  // Form validation
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset previous errors
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(el => el.remove());

    const usernameValue = usernameInput.value.trim();
    const passwordValue = passwordInput.value;

    let isValid = true;

    // Username validation
    if (usernameValue === '') {
      showError(usernameInput, 'Please enter your username or email');
      isValid = false;
    } else if (!isValidEmail(usernameValue) && !isValidUsername(usernameValue)) {
      showError(usernameInput, 'Please enter a valid email or username');
      isValid = false;
    }

    // Password validation
    if (passwordValue === '') {
      showError(passwordInput, 'Please enter your password');
      isValid = false;
    } else if (passwordValue.length < 8) {
      showError(passwordInput, 'Password must be at least 8 characters long');
      isValid = false;
    }

    if (isValid) {
      submitLogin();
    }
  });

  // Real-time validation
  usernameInput.addEventListener('input', () => {
    usernameInput.setAttribute('aria-invalid', 'false');
    const error = usernameInput.parentElement.querySelector('.error-message');
    if (error) error.remove();
  });

  passwordInput.addEventListener('input', () => {
    passwordInput.setAttribute('aria-invalid', 'false');
    const error = passwordInput.parentElement.querySelector('.error-message');
    if (error) error.remove();
  });

  // Remember me functionality
  if (localStorage.getItem('rememberMe') === 'true') {
    rememberMeCheckbox.checked = true;
    const savedUsername = localStorage.getItem('savedUsername');
    if (savedUsername) {
      usernameInput.value = savedUsername;
    }
  }

  rememberMeCheckbox.addEventListener('change', () => {
    if (rememberMeCheckbox.checked) {
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('savedUsername');
    }
  });

  // Helper functions
  function showError(input, message) {
    input.setAttribute('aria-invalid', 'true');
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
    input.parentElement.appendChild(errorElement);
    input.focus();
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidUsername(username) {
    // Username: 3-20 characters, letters, numbers, underscores, hyphens
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    return usernameRegex.test(username);
  }

  function submitLogin() {
    const submitButton = loginForm.querySelector('.submit-button');
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    submitButton.textContent = 'Signing in...';

    // Simulate API call
    setTimeout(() => {
      // Save username if remember me is checked
      if (rememberMeCheckbox.checked) {
        localStorage.setItem('savedUsername', usernameInput.value.trim());
      }

      // Reset button state
      submitButton.classList.remove('loading');
      submitButton.disabled = false;
      submitButton.textContent = 'Sign In';

      // Show success message (in a real app, you'd redirect)
      alert('Login successful! Welcome back, ' + usernameInput.value.trim() + '!');

      // Clear form for demo
      loginForm.reset();
      passwordVisible = false;
      passwordInput.type = 'password';
      togglePasswordBtn.setAttribute('aria-label', 'Show password');
      const eyeIcon = togglePasswordBtn.querySelector('.eye-icon');
      eyeIcon.innerHTML = '<path d="M12 4.5c-7 0-11 8-11 8.5s4 8.5 11 8.5c7 0 11-8.5 11-8.5s-4-8.5-11-8.5z"/><path d="M12 12.5c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7z"/>';
    }, 1500);
  }
});