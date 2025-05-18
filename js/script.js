/**
 * script.js - ملف الجافاسكريبت الرئيسي لموقع شركة مباني الأحلام (فرع المصاعد)
 * يحتوي على جميع الوظائف التفاعلية للموقع
 */

// تنفيذ الكود بعد تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    
    // ============== القائمة المتنقلة (للجوال) ==============
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }

    // ============== سلايدر الصفحة الرئيسية ==============
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;

    if (slides.length > 0) {
        // إنشاء نقاط التوجيه
        slides.forEach((_, index) => {
            dotsContainer.insertAdjacentHTML('beforeend', 
                `<div class="dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></div>`
            );
        });

        const dots = document.querySelectorAll('.dot');

        // عرض الشريحة المحددة
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }

        // الأزرار والأحداث
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            });
        }

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                showSlide(parseInt(dot.dataset.slide));
            });
        });

        // التلقائي (كل 5 ثواني)
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // ============== القوائم المنسدلة ==============
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            menu.classList.toggle('show');
            
            // إغلاق القوائم الأخرى
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.querySelector('.dropdown-menu').classList.remove('show');
                }
            });
        });
    });

    // إغلاق القوائم عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });

    // ============== الأسئلة الشائعة (FAQ) ==============
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // تبديل حالة الإجابة
            answer.classList.toggle('active');
            icon.classList.toggle('fa-chevron-up');
            icon.classList.toggle('fa-chevron-down');
            
            // إغلاق الإجابات الأخرى
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    otherQuestion.nextElementSibling.classList.remove('active');
                    otherQuestion.querySelector('i').classList.remove('fa-chevron-up');
                    otherQuestion.querySelector('i').classList.add('fa-chevron-down');
                }
            });
        });
    });

    // ============== معارض الصور ==============
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                // يمكنك إضافة lightbox هنا لاحقاً
                console.log('فتح صورة:', this.querySelector('img').src);
            });
        });
    }

    // ============== تأثير التمرير (Scroll Effects) ==============
    window.addEventListener('scroll', function() {
        // تأثير ظهور العناصر عند التمرير
        const scrollElements = document.querySelectorAll('.scroll-animate');
        
        scrollElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });

        // تأثير تغيير الهيدر عند التمرير
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ============== نماذج الاتصال ==============
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // هنا يمكنك إضافة كود إرسال النموذج (AJAX مثلاً)
            alert('تم استلام رسالتك وسنتواصل معك قريباً!');
            this.reset();
        });
    }
});

// ============== وظائف مساعدة ==============
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}