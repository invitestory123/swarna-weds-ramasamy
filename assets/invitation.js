/* =============================================================================
   SWARNA & RAMASAMY — ROYAL WEDDING INVITATION JAVASCRIPT
   Features:
   - Page 1: Cinematic Intro with Music Autoplay & Rose Petal burst
   - Page 2: Live Real-time Countdown to Nov 13, 2026 09:00 IST
   - Page 3: Interactive Scratch-to-Reveal Save the Date Card
   - Page 4: Interactive Story Read & Narrative
   - Page 5: Photo Collage Lightbox
   - Page 6: Wedding Timeline Interactive Details
   - Page 7: Google Calendar & Apple/iOS (.ics) Calendar Generators
   - Page 8: "Arrival is Expected By" Wishes & Golden Confetti
   - Page 9: End Slide Replay & Social Share
   - Global: Background Audio Controller for "Kaathale Kaathale" (96 Movie)
   ============================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.WEDDING_DATA || {};

  // ---------------------------------------------------------------------------
  // 1. FLOATING AMBIENT PETALS
  // ---------------------------------------------------------------------------
  const ambientDecor = document.getElementById('ambientDecor');
  if (ambientDecor) {
    const petalCount = 20;
    for (let i = 0; i < petalCount; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.animationDuration = `${7 + Math.random() * 8}s`;
      petal.style.animationDelay = `${Math.random() * 6}s`;
      petal.style.transform = `scale(${0.6 + Math.random() * 0.7})`;
      ambientDecor.appendChild(petal);
    }
  }

  // ---------------------------------------------------------------------------
  // 2. AUDIO PLAYER (96 MOVIE - KAATHALE KAATHALE)
  // ---------------------------------------------------------------------------
  const bgAudio = document.getElementById('bgAudio');
  const musicToggle = document.getElementById('musicToggle');
  let isPlaying = false;

  function playMusic() {
    if (!bgAudio) return;
    bgAudio.play().then(() => {
      isPlaying = true;
      if (musicToggle) musicToggle.classList.add('is-playing');
    }).catch(err => {
      console.log('Audio autoplay prevented:', err);
    });
  }

  function pauseMusic() {
    if (!bgAudio) return;
    bgAudio.pause();
    isPlaying = false;
    if (musicToggle) musicToggle.classList.remove('is-playing');
  }

  function toggleMusic() {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }

  if (musicToggle) {
    musicToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMusic();
    });
  }

  // Page 1 Open Button: Triggers Music + smooth scroll to Countdown
  const openInviteBtn = document.getElementById('openInviteBtn');
  if (openInviteBtn) {
    openInviteBtn.addEventListener('click', () => {
      playMusic();
      triggerConfetti(window.innerWidth / 2, window.innerHeight / 2);
      const page2 = document.getElementById('page2');
      if (page2) {
        page2.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // First user interaction auto-play fallback
  const startAudioOnFirstClick = () => {
    if (!isPlaying && bgAudio) {
      playMusic();
    }
    document.removeEventListener('pointerdown', startAudioOnFirstClick);
  };
  document.addEventListener('pointerdown', startAudioOnFirstClick);

  // ---------------------------------------------------------------------------
  // 3. LIVE COUNTDOWN TO NOV 13 2026 09:00:00 IST
  // ---------------------------------------------------------------------------
  const targetDate = new Date(data.countdown?.targetISO || '2026-11-13T09:00:00+05:30').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      const cdEl = document.getElementById('countdownGrid');
      if (cdEl) cdEl.innerHTML = '<div style="grid-column: span 4; font-size: 1.5rem; color: #f7df96;">The Wedding Celebration Has Begun! ✨</div>';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const dEl = document.getElementById('countDays');
    const hEl = document.getElementById('countHours');
    const mEl = document.getElementById('countMinutes');
    const sEl = document.getElementById('countSeconds');

    if (dEl) dEl.textContent = String(days).padStart(2, '0');
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
    if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ---------------------------------------------------------------------------
  // 4. INTERACTIVE SCRATCH-TO-REVEAL SAVE THE DATE (PAGE 3)
  // ---------------------------------------------------------------------------
  const scratchCanvas = document.getElementById('scratchCanvas');
  if (scratchCanvas) {
    const ctx = scratchCanvas.getContext('2d');
    const width = scratchCanvas.width = 300;
    const height = scratchCanvas.height = 70;

    // Draw shimmering gold coating
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#d4af37');
    grad.addColorStop(0.3, '#f9e8a2');
    grad.addColorStop(0.7, '#c59b27');
    grad.addColorStop(1, '#e5be47');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Add gold glitter text on canvas
    ctx.font = 'bold 15px Montserrat, sans-serif';
    ctx.fillStyle = '#182414';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ SCRATCH OR TAP TO REVEAL ✨', width / 2, height / 2);

    let isScratching = false;

    function scratch(e) {
      if (!isScratching && e.type !== 'click') return;
      const rect = scratchCanvas.getBoundingClientRect();
      const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 24, 0, Math.PI * 2);
      ctx.fill();
    }

    scratchCanvas.addEventListener('mousedown', (e) => { isScratching = true; scratch(e); });
    scratchCanvas.addEventListener('mousemove', scratch);
    window.addEventListener('mouseup', () => { isScratching = false; });

    scratchCanvas.addEventListener('touchstart', (e) => { isScratching = true; scratch(e); }, { passive: true });
    scratchCanvas.addEventListener('touchmove', scratch, { passive: true });
    window.addEventListener('touchend', () => { isScratching = false; });

    scratchCanvas.addEventListener('click', () => {
      // Auto-clear on click
      ctx.clearRect(0, 0, width, height);
      triggerConfetti(scratchCanvas.getBoundingClientRect().left + 150, scratchCanvas.getBoundingClientRect().top + 35);
    });
  }

  // ---------------------------------------------------------------------------
  // 5. PICTURE COLLAGE & LIGHTBOX MODAL (PAGE 5)
  // ---------------------------------------------------------------------------
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const collageItems = document.querySelectorAll('.collage-item');

  collageItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && lightboxImg && lightboxModal) {
        lightboxImg.src = img.src;
        lightboxModal.classList.add('active');
      }
    });
  });

  if (lightboxClose && lightboxModal) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 6. ADD TO CALENDAR (GOOGLE & APPLE/IOS .ICS)
  // ---------------------------------------------------------------------------
  const btnGoogleCal = document.getElementById('btnGoogleCal');
  const btnIosCal = document.getElementById('btnIosCal');

  // Wedding Muhurtham: Nov 13 2026 09:00:00 IST -> 03:30:00 UTC
  // Wedding End: Nov 13 2026 10:00:00 IST -> 04:30:00 UTC
  const eventTitle = encodeURIComponent('Swarna Varshini & Ramasamy Wedding');
  const eventLocation = encodeURIComponent('Vasantham Thirumana Maaliggai, 110, Grand Southern Trunk Rd, Sunnambu Colony, Chromepet, Tambaram, Tamil Nadu 600044');
  const eventDetails = encodeURIComponent('Wedding Muhurtham of Swarna Varshini D & Ramasamy SM (9:00 AM - 10:00 AM).\nReception on Nov 12 from 6:30 PM.\nPen Alaipu on Nov 13 from 6:00 PM.\nVenue: Vasantham Thirumana Maaliggai, Chromepet.\nGoogle Maps: https://maps.app.goo.gl/6yETi9xzxAgyGJ6y7');

  if (btnGoogleCal) {
    btnGoogleCal.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=20261113T033000Z/20261113T043000Z&details=${eventDetails}&location=${eventLocation}`;
  }

  if (btnIosCal) {
    btnIosCal.addEventListener('click', (e) => {
      e.preventDefault();
      const icsData = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Swarna & Ramasamy Wedding//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        // Event 1: Reception
        'BEGIN:VEVENT',
        'UID:reception-swarna-ramasamy-2026@invitestory.in',
        'DTSTAMP:20261003T100000Z',
        'DTSTART:20261112T130000Z', // 6:30 PM IST = 13:00 UTC
        'DTEND:20261112T170000Z',   // 10:30 PM IST
        'SUMMARY:Swarna & Ramasamy Wedding Reception',
        'LOCATION:Vasantham Thirumana Maaliggai, Chromepet, Tambaram, Tamil Nadu',
        'DESCRIPTION:Wedding Reception of Swarna Varshini D & Ramasamy SM. Join us for a joyous evening of music and feast.',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        // Event 2: Muhurtham
        'BEGIN:VEVENT',
        'UID:muhurtham-swarna-ramasamy-2026@invitestory.in',
        'DTSTAMP:20261003T100000Z',
        'DTSTART:20261113T033000Z', // 9:00 AM IST = 03:30 UTC
        'DTEND:20261113T043000Z',   // 10:00 AM IST
        'SUMMARY:Swarna & Ramasamy Sacred Wedding Muhurtham',
        'LOCATION:Vasantham Thirumana Maaliggai, Chromepet, Tambaram, Tamil Nadu',
        'DESCRIPTION:Auspicious Muhurtham of Swarna Varshini D & Ramasamy SM. We look forward to your presence and blessings.',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        // Event 3: Pen Alaipu
        'BEGIN:VEVENT',
        'UID:penalaipu-swarna-ramasamy-2026@invitestory.in',
        'DTSTAMP:20261003T100000Z',
        'DTSTART:20261113T123000Z', // 6:00 PM IST = 12:30 UTC
        'DTEND:20261113T163000Z',   // 10:00 PM IST
        'SUMMARY:Swarna & Ramasamy - Pen Alaipu Celebration',
        'LOCATION:Vasantham Thirumana Maaliggai, Chromepet, Tambaram, Tamil Nadu',
        'DESCRIPTION:Traditional Pen Alaipu bridal welcoming ceremony and celebrations.',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'swarna-ramasamy-wedding.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    });
  }

  // ---------------------------------------------------------------------------
  // 7. INTERACTIVE BLESSINGS & WISHES WALL (PAGE 8)
  // ---------------------------------------------------------------------------
  const wishesForm = document.getElementById('wishesForm');
  const wishesWall = document.getElementById('wishesWall');

  if (wishesForm && wishesWall) {
    wishesForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('wishName');
      const msgInput = document.getElementById('wishMessage');

      const name = nameInput.value.trim() || 'Well Wisher';
      const msg = msgInput.value.trim();

      if (!msg) return;

      const bubble = document.createElement('div');
      bubble.className = 'wish-bubble';
      bubble.innerHTML = `<strong>${escapeHtml(name)}:</strong> "${escapeHtml(msg)}"`;
      wishesWall.prepend(bubble);

      triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.7);

      nameInput.value = '';
      msgInput.value = '';
    });
  }

  function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function(m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
  }

  // ---------------------------------------------------------------------------
  // 8. GOLDEN CONFETTI GENERATOR
  // ---------------------------------------------------------------------------
  function triggerConfetti(originX, originY) {
    const colors = ['#d4af37', '#f7df96', '#fff', '#e5be47', '#ff847c'];
    for (let i = 0; i < 40; i++) {
      const conf = document.createElement('div');
      conf.style.position = 'fixed';
      conf.style.left = `${originX || window.innerWidth / 2}px`;
      conf.style.top = `${originY || window.innerHeight / 2}px`;
      conf.style.width = `${6 + Math.random() * 8}px`;
      conf.style.height = `${8 + Math.random() * 10}px`;
      conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      conf.style.zIndex = '9999';
      conf.style.pointerEvents = 'none';
      conf.style.borderRadius = '2px';
      document.body.appendChild(conf);

      const angle = Math.random() * Math.PI * 2;
      const velocity = 8 + Math.random() * 16;
      let vx = Math.cos(angle) * velocity;
      let vy = Math.sin(angle) * velocity - 6;
      let rot = Math.random() * 360;
      let rotSpeed = (Math.random() - 0.5) * 20;
      let opacity = 1;

      let posX = originX || window.innerWidth / 2;
      let posY = originY || window.innerHeight / 2;

      const anim = setInterval(() => {
        posX += vx;
        posY += vy;
        vy += 0.5; // gravity
        rot += rotSpeed;
        opacity -= 0.02;

        conf.style.left = `${posX}px`;
        conf.style.top = `${posY}px`;
        conf.style.transform = `rotate(${rot}deg)`;
        conf.style.opacity = opacity;

        if (opacity <= 0) {
          clearInterval(anim);
          conf.remove();
        }
      }, 20);
    }
  }

  // ---------------------------------------------------------------------------
  // 9. PAGE NAVIGATION SYNC (TOP INDICATOR & BOTTOM DOCK)
  // ---------------------------------------------------------------------------
  const sections = document.querySelectorAll('.page-section');
  const pageIndicator = document.getElementById('pageIndicator');
  const dockDots = document.querySelectorAll('.dock-dot');

  const pageNames = [
    'Page 1: Welcome',
    'Page 2: Countdown',
    'Page 3: Save The Date',
    'Page 4: Our Story',
    'Page 5: Memories',
    'Page 6: Timeline',
    'Page 7: Venue & Calendar',
    'Page 8: Friends Circle',
    'Page 9: Forever'
  ];

  window.addEventListener('scroll', () => {
    let currentIdx = 0;
    const scrollPos = window.scrollY + window.innerHeight * 0.4;

    sections.forEach((sec, idx) => {
      if (sec.offsetTop <= scrollPos) {
        currentIdx = idx;
      }
    });

    if (pageIndicator) {
      pageIndicator.textContent = pageNames[currentIdx] || `Page ${currentIdx + 1} of 9`;
    }

    dockDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIdx);
    });
  });

  dockDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      if (sections[idx]) {
        sections[idx].scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Replay Button on Page 9
  const replayBtn = document.getElementById('replayBtn');
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Share Button on Page 9
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({
          title: 'Swarna & Ramasamy Wedding Invitation',
          text: 'With joyful hearts, we invite you to celebrate the wedding of Swarna Varshini & Ramasamy on Nov 13, 2026!',
          url: window.location.href
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
          alert('Invitation link copied to clipboard! Share with your friends and family.');
        });
      }
    });
  }
});
