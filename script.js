  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));

  // Tuner readout cycling
  const tunerText = document.getElementById('tunerText');
  const channels = [
    'SOCIAL MEDIA · 91.2',
    'SEARCH (SEO) · 94.6',
    'WEBSITE DESIGN · 97.3',
    'GRAPHIC & MOTION · 100.1',
    'PPC ADVERTISING · 102.8',
    'EMAIL MARKETING · 104.0',
    'CONTENT MARKETING · 106.5',
    'INFLUENCER MKTG · 108.9'
  ];
  let chIndex = 0;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (tunerText && !prefersReduced) {
    setInterval(() => {
      tunerText.style.opacity = 0;
      setTimeout(() => {
        chIndex = (chIndex + 1) % channels.length;
        tunerText.textContent = channels[chIndex];
        tunerText.style.opacity = 1;
      }, 350);
    }, 3200);
  }

  // GSAP-powered motion
  const gsapReady = typeof gsap !== 'undefined';

  if (gsapReady && !prefersReduced) {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .fromTo('.hero .eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .6 })
      .fromTo('.hero h1', { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: .8 }, '-=0.4')
      .fromTo('.hero__lead', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .6 }, '-=0.45')
      .fromTo('.hero__actions .btn', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .5, stagger: .12 }, '-=0.35')
      .fromTo('.tuner', { opacity: 0, y: 28, scale: .96 }, { opacity: 1, y: 0, scale: 1, duration: .9 }, '-=0.6');

    // Section intros: fade up on scroll
    gsap.utils.toArray(
      '.services__intro, .process__intro, .industries__intro, .pricing__intro, .insights__intro, .cta__content, .cta__form'
    ).forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: .8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });

    // Grids: staggered children on scroll
    gsap.utils.toArray(
      '.stats__grid, .services__grid, .process__steps, .industries__grid, .pricing__grid, .insights__grid'
    ).forEach(grid => {
      gsap.fromTo(grid.children, { opacity: 0, y: 36 }, {
        opacity: 1, y: 0, duration: .7, ease: 'power3.out', stagger: .08,
        scrollTrigger: { trigger: grid, start: 'top 85%' }
      });
    });

    // Hero visual: gentle parallax on scroll
    gsap.to('.hero__visual', {
      yPercent: 12, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });

    // Service card icons: playful hover bounce
    document.querySelectorAll('.service-card').forEach(card => {
      const icon = card.querySelector('.service-card__icon');
      if (!icon) return;
      card.addEventListener('mouseenter', () => gsap.to(icon, { rotate: 8, scale: 1.12, duration: .35, ease: 'back.out(2)' }));
      card.addEventListener('mouseleave', () => gsap.to(icon, { rotate: 0, scale: 1, duration: .35, ease: 'power2.out' }));
    });

    // Buttons: subtle scale on hover
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => gsap.to(btn, { scale: 1.04, duration: .25, ease: 'power2.out' }));
      btn.addEventListener('mouseleave', () => gsap.to(btn, { scale: 1, duration: .25, ease: 'power2.out' }));
    });

    // Featured pricing card: slow breathing glow
    const featured = document.querySelector('.price-card--featured');
    if (featured) {
      gsap.to(featured, {
        boxShadow: '0 0 0 1px rgba(47,111,255,.45), 0 28px 64px rgba(47,111,255,.32)',
        duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut'
      });
    }
  }

  // Stat count-up
  document.querySelectorAll('.stat__num[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';

    if (!gsapReady || prefersReduced) {
      el.textContent = target + suffix;
      return;
    }

    gsap.fromTo(el, { textContent: 0 }, {
      textContent: target,
      duration: 1.4,
      ease: 'power1.out',
      snap: { textContent: 1 },
      scrollTrigger: { trigger: el, start: 'top 90%' },
      onUpdate() {
        el.textContent = Math.round(this.targets()[0].textContent) + suffix;
      }
    });
  });

  // Contact form placeholder
  const form = document.querySelector('.cta__form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('This form is a placeholder. Connect it to your email service or a form provider (e.g. Formspree) to start receiving messages.');
    });
  }
