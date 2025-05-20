document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Sticky navbar on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Project tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;
            
            // Here you would typically send the data to a server
            console.log({ name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Typewriter Effect
    const typewriter = document.querySelector('.typewriter');
    let typewriterAnimationId;
    
    function startTypewriterAnimation() {
        if (typewriter) {
            clearTimeout(typewriterAnimationId);
            
            const text = typewriter.getAttribute('data-text');
            let i = 0;
            const speed = 150;
            
            function typeWriter() {
                if (i < text.length) {
                    if (i === 6) {
                        typewriter.innerHTML = text.substring(0, 6) + '&nbsp;';
                        i++;
                        typewriterAnimationId = setTimeout(typeWriter, speed);
                        return;
                    }
                    
                    typewriter.innerHTML = text.substring(0, i+1);
                    i++;
                    typewriterAnimationId = setTimeout(typeWriter, speed);
                } else {
                    typewriter.innerHTML = text;
                }
            }
            
            typewriter.innerHTML = '';
            typeWriter();
        }
    }

    // Run initially
    startTypewriterAnimation();

    // Set up Intersection Observer to retrigger when hero section comes into view
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startTypewriterAnimation();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(heroSection);
    }

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-content, .project-card, .contact-info, .contact-form, .timeline-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    document.querySelectorAll('.about-content, .project-card, .contact-info, .contact-form, .timeline-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});