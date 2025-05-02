document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize Particles.js (Có thể đổi màu hạt ở đây) ---
    particlesJS('particles-js', {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } }, // Giảm số lượng
            color: { value: '#475569' }, // Màu hạt (Slate-600) - hợp theme mới
            shape: { type: 'circle' },
            opacity: { value: 0.3, random: true, anim: { enable: false } }, // Giảm opacity, tắt anim
            size: { value: 2, random: true }, // Kích thước nhỏ hơn
            line_linked: { enable: true, distance: 150, color: '#334155', opacity: 0.15, width: 1 }, // Màu đường nối (Slate-700)
            move: { enable: true, speed: 1, direction: 'none', random: true, straight: false, out_mode: 'out' } // Chậm hơn
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: false }, resize: true }, // Tắt push on click
            modes: { grab: { distance: 140, line_linked: { opacity: 0.3 } } }
        },
        retina_detect: true
    });

    // --- Initialize AOS (Cấu hình chung) ---
    AOS.init({
        duration: 700,       // Thời gian animation ngắn hơn
        easing: 'ease-out-cubic', // Easing mượt hơn
        once: true,          // Chỉ chạy 1 lần
        offset: 80,          // Kích hoạt sớm hơn chút
        disable: 'mobile'    // Có thể tắt AOS trên mobile nếu muốn
    });

    // --- Smooth Scroll & Scroll Spy (Giữ nguyên logic, kiểm tra lại offset) ---
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.content-section'); // Đảm bảo selector đúng
    const header = document.getElementById('main-header');
    const headerHeight = header.offsetHeight; // Lấy chiều cao header ban đầu
    let lastScrollTop = 0;

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (!targetSection) return; // Bỏ qua nếu không tìm thấy section

            // Tính toán vị trí cuộn chính xác hơn
            const currentHeaderHeight = document.getElementById('main-header').offsetHeight;
            const targetPosition = targetSection.offsetTop - currentHeaderHeight - 20; // Thêm offset nhỏ

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Optional: Đóng menu nếu là mobile (cần thêm logic nếu có menu burger)
        });
    });

    function handleScroll() {
        let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const currentHeaderHeight = header.offsetHeight; // Lấy chiều cao hiện tại

        // Header hide/show (Logic giữ nguyên)
        if (currentScrollTop > lastScrollTop && currentScrollTop > currentHeaderHeight) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;

        // Scroll Spy (Cập nhật offset)
        let currentSectionId = '';
        const scrollSpyOffset = currentHeaderHeight + 60; // Offset lớn hơn để active sớm hơn

        sections.forEach(section => {
            const sectionTop = section.offsetTop - scrollSpyOffset;
            const sectionBottom = sectionTop + section.offsetHeight;

            // Logic active section chính xác hơn (kể cả section cuối cùng)
             if (currentScrollTop >= sectionTop && currentScrollTop < sectionBottom) {
                 currentSectionId = section.getAttribute('id');
             }
        });

         // Nếu cuộn xuống cuối trang mà section cuối chưa active hết chiều cao
         if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 50) { // Gần cuối trang
            const lastSection = sections[sections.length - 1];
            if (lastSection) {
                currentSectionId = lastSection.getAttribute('id');
            }
        }


        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Gọi lần đầu để set active link ban đầu

    // --- Skill Bar Animation (Đã loại bỏ thanh progress nên không cần nữa) ---
    // const skillSection = document.getElementById('skills');
    // const progressBars = document.querySelectorAll('.progress'); // Selector này không còn
    // if (skillSection) { // Kiểm tra skillSection tồn tại
    //     const skillObserver = new IntersectionObserver(entries => {
    //         if (entries[0].isIntersecting) {
    //             // Logic animation nếu dùng lại progress bar
    //             console.log("Skills section is visible - trigger animations if needed");
    //             skillObserver.unobserve(skillSection);
    //         }
    //     }, { threshold: 0.2 });
    //     skillObserver.observe(skillSection);
    // }

    // --- Music Player (Giữ nguyên logic) ---
    const audio = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    const volumeControl = document.getElementById('volume-control');

    if (audio && musicToggle && volumeControl) { // Kiểm tra các element tồn tại
        audio.volume = volumeControl.value;

        musicToggle.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().catch(e => console.error("Audio play failed:", e)); // Thêm catch lỗi
                musicToggle.querySelector('i').classList.replace('fa-play', 'fa-pause');
            } else {
                audio.pause();
                musicToggle.querySelector('i').classList.replace('fa-pause', 'fa-play');
            }
        });
        volumeControl.addEventListener('input', () => audio.volume = volumeControl.value);
    } else {
        // Ẩn music player nếu thiếu element
        const musicPlayerElement = document.getElementById('music-player');
        if(musicPlayerElement) musicPlayerElement.style.display = 'none';
    }

    // --- Timeline Modal (Giữ nguyên logic) ---
    const modal = document.getElementById('timeline-modal');
    const modalYear = document.getElementById('timeline-modal-year');
    const modalDesc = document.getElementById('timeline-modal-desc');
    const closeButton = modal ? modal.querySelector('.close-button') : null;
    const timelineItems = document.querySelectorAll('.timeline-item'); // Lấy item thay vì content

    if (modal && modalYear && modalDesc && closeButton) { // Check if modal elements exist
        timelineItems.forEach(item => {
            const content = item.querySelector('.timeline-content');
            const year = item.getAttribute('data-year');
            const desc = item.getAttribute('data-desc');

            if (content && year && desc) {
                content.addEventListener('click', () => {
                    modalYear.textContent = year;
                    modalDesc.textContent = desc;
                    modal.classList.add('show');
                    document.body.style.overflow = 'hidden'; // Prevent background scroll
                });
            }
        });

        const closeModal = () => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto'; // Restore scroll
        };

        closeButton.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) { // Click outside modal content
                closeModal();
            }
        });
        // Close modal with Escape key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });

    }

    // --- Footer Year (Giữ nguyên) ---
    const currentYearElement = document.getElementById('current-year');
    if(currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
    }

});