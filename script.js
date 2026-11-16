document.addEventListener('DOMContentLoaded', () => {
    // 1. التحكم في شاشة الترحيب
    const splash = document.getElementById('splash-screen');
    if (splash) {
        setTimeout(() => {
            splash.classList.add('fade-out');
        }, 1400);
    }

    // 2. زر مشاركة المنيو
    const shareBtn = document.getElementById('share-btn');
    const toastMsg = document.getElementById('toast-msg');

    if (shareBtn && toastMsg) {
        shareBtn.addEventListener('click', async () => {
            const shareData = {
                title: 'منيو مطعم رشوش',
                text: 'تصفح منيو مطعم رشوش للشاورما على الفحم والبرقر المشوي:',
                url: window.location.href
            };

            if (navigator.share) {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    // تجاهل إذا ألغى المستخدم
                }
            } else {
                navigator.clipboard.writeText(window.location.href);
                toastMsg.classList.add('show');
                setTimeout(() => {
                    toastMsg.classList.remove('show');
                }, 2500);
            }
        });
    }

    // 3. زر العودة للأعلى
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. تحديث الزر النشط وتوسيطه تلقائياً أثناء التمرير في شريط الأقسام
    const sections = document.querySelectorAll('.menu-section');
    const navLinks = document.querySelectorAll('.nav-btn');

    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 130;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                    link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            });
        });
    }
});