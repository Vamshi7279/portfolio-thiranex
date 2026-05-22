// scripts.js — Accessible form validation and ARIA updates
document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  function showStatus(message, isError){
    status.classList.remove('visually-hidden');
    status.textContent = message;
    if(isError){
      status.style.color = 'crimson';
    } else {
      status.style.color = '';
    }
  }

  function clearFieldErrors(form){
    Array.from(form.elements).forEach(el=>{
      el.removeAttribute('aria-invalid');
      const described = el.getAttribute('aria-describedby') || '';
      // no-op; can extend to attach error ids
    });
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    clearFieldErrors(form);

    if(!form.checkValidity()){
      // find first invalid control
      const firstInvalid = form.querySelector(':invalid');
      if(firstInvalid){
        firstInvalid.setAttribute('aria-invalid','true');
        firstInvalid.focus();
      }
      showStatus('Please fix the highlighted fields and try again.', true);
      return;
    }

    // Simulate successful submission
    showStatus('Message sent — thanks! I will reply as soon as possible.', false);
    form.reset();
  });

  // Enhance inputs: update aria-invalid on input
  form.addEventListener('input', function(e){
    const t = e.target;
    if(t.checkValidity()){
      t.removeAttribute('aria-invalid');
    }
  });
});
