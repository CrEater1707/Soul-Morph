(function(){
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const modalClose = document.getElementById('modal-close');
    const thumbs = document.querySelectorAll('.thumb');
    const backstoriesBtn = document.getElementById('backstories-btn');

    function openModal(src, title){
      modalImg.src = src;
      modalImg.alt = title || src;
      modalCaption.textContent = title || '';
      modal.classList.add('show');
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden'; // prevent background scroll
      modalClose.focus();
    }

    function closeModal(){
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden','true');
      modalImg.src = '';
      modalCaption.textContent = '';
      document.body.style.overflow = '';
    }

    thumbs.forEach(el=>{
      el.addEventListener('click', ()=>{
        const src = el.dataset.img;
        // prefer explicit data-title, otherwise use inner text or filename
        const title = el.dataset.title || el.textContent.trim() || src;
        openModal(src, title);
      });
      // make thumbs keyboard accessible
      el.tabIndex = 0;
      el.addEventListener('keydown', (e)=>{
        if(e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          el.click();
        }
      });
    });

    // close when clicking on backdrop (but not when clicking inside modal-inner)
    modal.addEventListener('click', (e)=>{
      if(e.target === modal) closeModal();
    });
    modalClose.addEventListener('click', closeModal);

    // close on Escape
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
      }
    });

    // Backstories redirect module: uses data-href or href as fallback
    if(backstoriesBtn){
      backstoriesBtn.addEventListener('click', (e)=>{
        const target = backstoriesBtn.dataset.href || backstoriesBtn.getAttribute('href') || 'backstories.html';
        // prevent default to use controlled redirect (so you can run animations, analytics, etc.)
        e.preventDefault();
        // small delay could be added here for animation; currently immediate redirect
        window.location.href = target;
      });
    }
  })();
