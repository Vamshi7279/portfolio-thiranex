// scripts.js — Accessible theme toggle & form validation

document.addEventListener('DOMContentLoaded', function() {
  // --- Theme Toggle Persistence ---
  const themeToggle = document.getElementById('theme-toggle');
  
  // Set theme on load based on localStorage or OS preferences
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  
  if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
    document.documentElement.classList.add('light-theme');
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', 'Switch to dark theme');
    }
  } else {
    document.documentElement.classList.remove('light-theme');
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', 'Switch to light theme');
    }
  }

  // Toggle theme click event listener
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const isLight = document.documentElement.classList.toggle('light-theme');
      
      if (isLight) {
        localStorage.setItem('theme', 'light');
        themeToggle.setAttribute('aria-label', 'Switch to dark theme');
      } else {
        localStorage.setItem('theme', 'dark');
        themeToggle.setAttribute('aria-label', 'Switch to light theme');
      }
    });
  }

  // --- Accessible Contact Form Validation ---
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  // Guard: only execute form logic on contact page where form exists
  if (form && status) {
    function showStatus(message, isError) {
      status.classList.remove('visually-hidden');
      status.textContent = message;
      
      if (isError) {
        status.style.color = 'var(--required)';
        status.style.borderColor = 'var(--required)';
        status.style.backgroundColor = 'rgba(248, 81, 73, 0.1)';
      } else {
        status.style.color = 'var(--accent)';
        status.style.borderColor = 'var(--accent)';
        status.style.backgroundColor = 'rgba(56, 139, 253, 0.1)';
      }
    }

    function clearFieldErrors(form) {
      Array.from(form.elements).forEach(el => {
        el.removeAttribute('aria-invalid');
      });
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      clearFieldErrors(form);

      if (!form.checkValidity()) {
        // Find first invalid control
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) {
          firstInvalid.setAttribute('aria-invalid', 'true');
          firstInvalid.focus();
        }
        showStatus('Please fix the highlighted fields and try again.', true);
        return;
      }

      // Simulate successful submission
      showStatus('Message sent successfully! Thank you for reaching out.', false);
      form.reset();
    });

    // Remove aria-invalid property once users edit fields to be valid
    form.addEventListener('input', function(e) {
      const t = e.target;
      if (t.checkValidity()) {
        t.removeAttribute('aria-invalid');
      }
    });
  }
});
