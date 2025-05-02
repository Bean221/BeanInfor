document.addEventListener('DOMContentLoaded', () => {
    // --- Particles.js ---
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 100,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6']
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.6,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#8B5CF6',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.8
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });

    // --- AOS ---
    AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80
    });

    // --- Scroll Spy ---
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.content-section');
    const header = document.getElementById('main-header');
    let lastScrollTop = 0;

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const currentHeaderHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - currentHeaderHeight - 20;

            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        });
    });

    function handleScroll() {
        let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const currentHeaderHeight = header.offsetHeight;

        if (currentScrollTop > lastScrollTop && currentScrollTop > currentHeaderHeight) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;

        let currentSectionId = '';
        const scrollSpyOffset = currentHeaderHeight + 60;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - scrollSpyOffset;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (currentScrollTop >= sectionTop && currentScrollTop < sectionBottom) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 50) {
            currentSectionId = sections[sections.length - 1].getAttribute('id');
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // --- Music Player ---
    const audio = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    const volumeControl = document.getElementById('volume-control');

    if (audio && musicToggle && volumeControl) {
        audio.volume = volumeControl.value;
        musicToggle.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().catch(e => console.error("Audio play failed:", e));
                musicToggle.querySelector('i').classList.replace('fa-play', 'fa-pause');
            } else {
                audio.pause();
                musicToggle.querySelector('i').classList.replace('fa-pause', 'fa-play');
            }
        });
        volumeControl.addEventListener('input', () => audio.volume = volumeControl.value);
    }

    // --- Footer Year ---
    document.getElementById('current-year').textContent = new Date().getFullYear();
});