document.addEventListener('DOMContentLoaded', () => {
    // Initializing Typed.js
    const typed = new Typed('#typed-text', {
        strings: [
            'Building the future with <span class="gradient-text">Agentic AI</span>',
            'Crafting intelligent <span class="gradient-text">RAG Systems</span>',
            'Architecting with <span class="gradient-text">LLMs & ML</span>',
            'Innovating in <span class="gradient-text">Data Science</span>'
        ],
        typeSpeed: 60,
        backSpeed: 30,
        loop: true,
        contentType: 'html'
    });

    
    // Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Magnetic Button Effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    // Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Thank you, Varad will get back to you soon!');
                btn.innerText = originalText;
                btn.disabled = false;
                contactForm.reset();
            }, 1500);
        });
    }

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 3D Tilt Effect for Glass Cards
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Mouse track for glow
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // 3D Tilt calc
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `rotateX(0deg) rotateY(0deg)`;
        });
    });

    // Pro Animated Background (Particle System)
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let width, height;

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                    this.reset();
                }
            }

            draw() {
                ctx.fillStyle = `rgba(0, 136, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const count = Math.floor((width * height) / 10000);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const animateParticles = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Draw connections
            ctx.strokeStyle = 'rgba(0, 136, 255, 0.05)';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animateParticles);
        };

        initParticles();
        animateParticles();
    }

    // Hero Section Mesh Animation
    const heroCanvas = document.getElementById('hero-mesh-canvas');
    if (heroCanvas) {
        const hctx = heroCanvas.getContext('2d');
        let hParticles = [];
        let hWidth, hHeight;
        let mouse = { x: null, y: null };

        const hResize = () => {
            hWidth = heroCanvas.width = heroCanvas.parentElement.offsetWidth;
            hHeight = heroCanvas.height = heroCanvas.parentElement.offsetHeight;
            hInit();
        };

        window.addEventListener('resize', hResize);
        window.addEventListener('mousemove', (e) => {
            const rect = heroCanvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        class HeroParticle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * hWidth;
                this.y = Math.random() * hHeight;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.color = Math.random() > 0.5 ? '#00fbff' : '#0088ff';
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > hWidth) this.speedX *= -1;
                if (this.y < 0 || this.y > hHeight) this.speedY *= -1;

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        const force = (150 - dist) / 1000;
                        this.x -= dx * force;
                        this.y -= dy * force;
                    }
                }
            }

            draw() {
                hctx.fillStyle = this.color;
                hctx.beginPath();
                hctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                hctx.fill();
            }
        }

        function hInit() {
            hParticles = [];
            const count = Math.floor((hWidth * hHeight) / 12000);
            for (let i = 0; i < count; i++) {
                hParticles.push(new HeroParticle());
            }
        }

        function hAnimate() {
            hctx.clearRect(0, 0, hWidth, hHeight);

            for (let i = 0; i < hParticles.length; i++) {
                hParticles[i].update();
                hParticles[i].draw();

                for (let j = i + 1; j < hParticles.length; j++) {
                    const dx = hParticles[i].x - hParticles[j].x;
                    const dy = hParticles[i].y - hParticles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 180) {
                        hctx.strokeStyle = `rgba(0, 251, 255, ${0.4 - dist / 500})`;
                        hctx.lineWidth = 1;
                        hctx.beginPath();
                        hctx.moveTo(hParticles[i].x, hParticles[i].y);
                        hctx.lineTo(hParticles[j].x, hParticles[j].y);
                        hctx.stroke();
                    }
                }
            }
            requestAnimationFrame(hAnimate);
        }

        hResize();
        hAnimate();
    }

    // Scroll-Synced Skills Track
    const skillsBarInner = document.querySelector('.skills-bar-inner');
    const skillItems = document.querySelectorAll('.skill-item');
    const skillsSection = document.querySelector('#skills');

    const handleSkillsScroll = () => {
        if (!skillsSection || !skillsBarInner) return;

        const rect = skillsSection.getBoundingClientRect();
        const sectionHeight = rect.height;
        const viewHeight = window.innerHeight;

        let progress = (viewHeight * 0.8 - rect.top) / (sectionHeight + viewHeight * 0.6);
        progress = Math.max(0, Math.min(1, progress));

        skillsBarInner.style.height = `${progress * 100}%`;

        skillItems.forEach((item) => {
            const itemRect = item.getBoundingClientRect();
            if (itemRect.top < viewHeight * 0.8) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    };

    // Scroll Reveal for Experience Timeline
    const experienceItems = document.querySelectorAll('.experience-item');

    const handleExperienceScroll = () => {
        experienceItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleSkillsScroll();
        handleExperienceScroll();
    });

    handleSkillsScroll();
    handleExperienceScroll();
});
