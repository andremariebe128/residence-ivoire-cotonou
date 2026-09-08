/* RÉSIDENCE IVOIRE — interactions (site vitrine, sans backend) */

/* ==========================================================
   INTERRUPTEUR ÉVÉNEMENTS
   Passez EVENTS_ACTIVE à true dès qu'un événement est à l'affiche :
   le bouton "Événements" apparaîtra automatiquement dans le menu
   (desktop + mobile) sur toutes les pages. Repassez à false pour
   le masquer à nouveau une fois l'événement terminé.
   ========================================================== */
var EVENTS_ACTIVE = true;

(function () {
  'use strict';

  if (EVENTS_ACTIVE) {
    document.querySelectorAll('.js-events-link').forEach(function (el) { el.classList.add('is-visible'); });
  }

  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Menu mobile ---------- */
  var burger = document.getElementById('burger');
  var mobileMenu = document.getElementById('mobile-menu');
  var closeBtn = document.getElementById('mobile-menu-close');

  function openMenu() {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (burger && mobileMenu) {
    burger.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }

  /* ---------- Révélation au scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.05 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---------- Formulaire de contact (WhatsApp, sans backend) ---------- */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }

      var name = contactForm.querySelector('#ct-name').value.trim();
      var phone = contactForm.querySelector('#ct-phone').value.trim();
      var dates = contactForm.querySelector('#ct-dates') ? contactForm.querySelector('#ct-dates').value.trim() : '';
      var guests = contactForm.querySelector('#ct-guests') ? contactForm.querySelector('#ct-guests').value : '';
      var message = contactForm.querySelector('#ct-message').value.trim();

      var btn = contactForm.querySelector('.submit-btn');
      var original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span>';

      setTimeout(function () {
        contactForm.querySelector('.form-fields').style.display = 'none';
        contactForm.querySelector('.success-panel').classList.add('show');

        var waMsg = encodeURIComponent(
          'Bonjour Résidence Ivoire,\n' +
          'Nom : ' + name + '\n' +
          'Téléphone : ' + phone + '\n' +
          (dates ? 'Dates de séjour : ' + dates + '\n' : '') +
          (guests ? 'Nombre de personnes : ' + guests + '\n' : '') +
          'Message : ' + message
        );
        var waBtn = contactForm.querySelector('.whatsapp-btn');
        if (waBtn) waBtn.href = 'https://wa.me/2290162265555?text=' + waMsg;

        var mailSubject = encodeURIComponent('Demande de réservation — ' + name);
        var mailBody = encodeURIComponent(
          'Nom : ' + name + '\n' +
          'Téléphone : ' + phone + '\n' +
          (dates ? 'Dates de séjour : ' + dates + '\n' : '') +
          (guests ? 'Nombre de personnes : ' + guests + '\n' : '') +
          'Message : ' + message
        );
        var mailBtn = contactForm.querySelector('.email-btn');
        if (mailBtn) mailBtn.href = 'mailto:residenceivoire19@gmail.com?subject=' + mailSubject + '&body=' + mailBody;

        btn.disabled = false;
        btn.innerHTML = original;
      }, 500);
    });
  }
})();
