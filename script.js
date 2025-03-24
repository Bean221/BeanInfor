document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles.js with mouse interaction
    particlesJS('particles-js', {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: '#83a598' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 1, direction: 'none', random: true, straight: false, out_mode: 'out' }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });

    // Section animation
    const sections = document.querySelectorAll('.animate-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.add(index % 2 === 0 ? 'from-left' : 'from-right');
                if (entry.target.id === 'skills') animateSkills();
                if (entry.target.id === 'timeline') animateTimeline();
                if (entry.target.id === 'about') animateProfile();
            }
        });
    }, { threshold: 0.3 });

    sections.forEach((section) => observer.observe(section));

    // Smooth scroll for navigation
    document.querySelectorAll('nav a').forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 60,
                behavior: 'smooth'
            });
        });
    });

    // Music player control
    const audio = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    const volumeControl = document.getElementById('volume-control');

    // Auto play music when page loads
    audio.play().catch((error) => {
        console.log("Autoplay prevented by browser: ", error);
        // If autoplay is blocked, user needs to interact first
    });

    // Update toggle button icon based on audio state
    function updateMusicToggle() {
        const icon = musicToggle.querySelector('i');
        if (audio.paused) {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        } else {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
        }
    }
    updateMusicToggle();

    // Toggle play/pause on button click
    musicToggle.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        updateMusicToggle();
    });

    // Update volume
    volumeControl.addEventListener('input', () => {
        audio.volume = volumeControl.value;
    });
    audio.volume = volumeControl.value;

    // Animate skills progress bars
    function animateSkills() {
        document.querySelectorAll('.progress').forEach((progress) => {
            const percent = progress.getAttribute('data-percent');
            progress.style.width = `${percent}%`;
            setTimeout(() => progress.classList.add('filled'), 1500);
        });
    }

    // Animate timeline
    function animateTimeline() {
        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
                item.style.transform = `rotate(${index % 2 === 0 ? -2 : 2}deg)`;
            }, index * 200);
        });
    }

    // Animate profile image
    function animateProfile() {
        document.querySelector('.profile-image').classList.add('visible');
    }

    // Timeline modal
    document.querySelectorAll('.timeline-item').forEach((item) => {
        item.addEventListener('click', () => {
            const year = item.getAttribute('data-year');
            const desc = item.getAttribute('data-desc');
            showModal(year, desc);
        });
    });

    function showModal(year, desc) {
        const modal = document.getElementById('timeline-modal');
        document.getElementById('timeline-modal-year').textContent = year;
        document.getElementById('timeline-modal-desc').textContent = desc;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';

        const closeButton = modal.querySelector('.close-button');
        const closeModal = () => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        };
        closeButton.onclick = closeModal;
        modal.onclick = (e) => {
            if (e.target === modal) closeModal();
        };
    }
});