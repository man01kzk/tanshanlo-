(function(){
  // Helpers
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  // Mobile menu
  const burger = $('#burgerBtn');
  const mainNav = $('#mainNav');
  burger && burger.addEventListener('click', ()=>{
    mainNav.classList.toggle('show');
  });

  // Reveal on scroll (IntersectionObserver)
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.15});
  $$('.reveal').forEach(el => observer.observe(el));

  // Modal (WhatsApp / Telegram)
  const quickModal = $('#quickModal');
  const modalClose = $('#modalClose');
  const heroCall = $('#heroCall');
  const mainCallBtn = $('#mainCallBtn');
  const modalWA = $('#modalWA');
  const modalTG = $('#modalTG');
  const waNumber = '77XXXXXXXXX'; // replace with real number
  const tgLink = 'https://t.me/your_telegram'; // replace

  const openModal = ()=>{
    quickModal.setAttribute('aria-hidden','false');
    modalWA.href = `https://wa.me/${waNumber}`;
    modalTG.href = tgLink;
    modalWA.setAttribute('target','_blank');
    modalTG.setAttribute('target','_blank');
  };
  const closeModal = ()=> quickModal.setAttribute('aria-hidden','true');

  heroCall && heroCall.addEventListener('click', openModal);
  mainCallBtn && mainCallBtn.addEventListener('click', openModal);
  modalClose && modalClose.addEventListener('click', closeModal);
  quickModal && quickModal.addEventListener('click', (e)=>{ if(e.target===quickModal) closeModal(); });

  // Mirror modal buttons in top header
  $('#modalWA').addEventListener('click', ()=>{});

  // Simple reviews autoplay (carousel)
  const slider = $('#reviewsSlider');
  if(slider){
    let idx = 0;
    const items = Array.from(slider.querySelectorAll('.review'));
    setInterval(()=>{
      items.forEach((it,i)=>{ it.style.transform = `translateX(-${idx*100}%)`; it.style.transition = 'transform .6s'; });
      idx = (idx + 1) % items.length;
    }, 4000);
  }

  // Contact form handling (AJAX)
  const form = $('#contactForm');
  const formMsg = $('#formMsg');
  const successToast = $('#successToast');

  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();

      // Basic validation
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      if(!name || !phone){
        formMsg.textContent = 'Пожалуйста, заполните имя и телефон.';
        return;
      }

      // If reCAPTCHA exists, grecaptcha will execute (invisible)
      if(window.grecaptcha){
        grecaptcha.execute();
        // onSubmit callback below will handle sending
      } else {
        submitForm();
      }
    });
  }

  // This function will be called from server-side reCAPTCHA callback if configured
  window.onReCaptchaSuccess = function(token){
    // token can be sent to server for verification
    submitForm(token);
  }

  function submitForm(recaptchaToken){
    const data = new FormData(form);
    if(recaptchaToken) data.append('g-recaptcha-response', recaptchaToken);

    fetch(form.action, {method:'POST', body:data})
      .then(r=>r.json())
      .then(res=>{
        if(res && res.success){
          form.reset();
          showSuccess();
        } else {
          formMsg.textContent = (res && res.message) ? res.message : 'Ошибка отправки. Попробуйте позже.';
        }
      }).catch(err=>{
        formMsg.textContent = 'Ошибка сети. Попробуйте позже.';
      });
  }

  function showSuccess(){
    successToast.classList.add('show');
    setTimeout(()=> successToast.classList.remove('show'), 4000);
  }

})();
