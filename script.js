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
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Success! Your message has been sent.");
                    contactForm.reset();
                } else {
                    alert("Error: " + data.message);
                }
            } catch (error) {
                alert("Something went wrong. Please try again.");
            } finally {
                btn.innerText = originalText;
                btn.disabled = false;
            }
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

    // ===================================================
    // 3D ACHIEVEMENTS CARD DECK SYSTEM
    // ===================================================
    const achievements = [
        {
            id: 1,
            rank: 'A',
            suit: '♠',
            suitColor: 'black',
            company: 'Octazen Technologies',
            companyIcon: 'fas fa-building',
            badge: 'Internship Offer',
            title: 'Software & AI Intern Offer',
            date: 'Sep 2026 – Present',
            location: 'Onsite, Kolhapur',
            image: 'achiments/Screenshot 2026-10-16 114228.png',
            desc: 'Official appointment letter welcoming Varad Gotkhindikar as Software & AI Intern at Octazen Technologies LLP, focusing on Flutter mobile app and scalable Node.js backend architecture.'
        },
        {
            id: 2,
            rank: 'K',
            suit: '♥',
            suitColor: 'red',
            company: 'Amazon',
            companyIcon: 'fab fa-amazon',
            badge: 'Selection Shortlist',
            title: 'Amazon ML Summer School 2026',
            date: 'June 2026',
            location: 'Selection Test',
            image: 'achiments/Screenshot 2026-10-16 111625.png',
            desc: 'Shortlisted for the competitive Amazon ML Summer School 2026 Selection Test covering Mathematics, Machine Learning algorithms, Data Structures, and SQL problem solving.'
        },
        {
            id: 3,
            rank: 'Q',
            suit: '♦',
            suitColor: 'red',
            company: 'Google',
            companyIcon: 'fab fa-google',
            badge: 'National Qualifier',
            title: 'Google The Big Code 2026',
            date: 'March 2026',
            location: 'HackerEarth',
            image: 'achiments/Screenshot 2026-10-16 114108.png',
            desc: 'Official confirmation and application acceptance for Qualifier Round of Google The Big Code 2026, competing in advanced programming and algorithmic challenges.'
        },
        {
            id: 4,
            rank: 'J',
            suit: '♣',
            suitColor: 'black',
            company: 'Google Cloud',
            companyIcon: 'fas fa-cloud',
            badge: 'Standard Milestone',
            title: 'The Arcade Prize Counter Milestone',
            date: '2026',
            location: 'Google Cloud Boost',
            image: 'achiments/Screenshot 2026-10-16 112246.png',
            desc: 'Reached Standard Milestone in Google Cloud The Arcade, demonstrating hands-on expertise in cloud architecture, GCP services, and skill badges.'
        },
        {
            id: 5,
            rank: '10',
            suit: '♠',
            suitColor: 'black',
            company: 'Amazon Jobs',
            companyIcon: 'fab fa-amazon',
            badge: 'SDE Opportunity',
            title: 'Amazon SDE Assessment Invitation',
            date: '2026',
            location: 'Online Assessment',
            image: 'achiments/Screenshot 2026-10-16 112039.png',
            desc: 'Received official invitation for Amazon Software Development Engineer (SDE) Online Assessment, progressing through technical engineering evaluations.'
        },
        {
            id: 6,
            rank: '9',
            suit: '♥',
            suitColor: 'red',
            company: 'Infosys Springboard',
            companyIcon: 'fas fa-laptop-code',
            badge: 'Selection Letter',
            title: 'Virtual Internship 6.0 Selection',
            date: 'Nov 2025 – Jan 2026',
            location: 'Remote',
            image: 'achiments/image.png',
            desc: 'Congratulations letter for selection in Infosys Springboard Virtual Internship 6.0, developing production RAG applications with high-accuracy semantic search.'
        },
        {
            id: 7,
            rank: '8',
            suit: '♦',
            suitColor: 'red',
            company: 'Microsoft & SAP CSR',
            companyIcon: 'fas fa-award',
            badge: 'AICTE Internship',
            title: 'Empower AI - TechSaksham',
            date: 'Dec 2024',
            location: 'Edunet Foundation',
            image: 'achiments/Screenshot 2026-10-16 113903.png',
            desc: 'Selected for AICTE Internship on Empower AI: Transformative Learning with TechSaksham, a joint CSR initiative of Microsoft & SAP delivered by Edunet Foundation.'
        },
        {
            id: 8,
            rank: '7',
            suit: '♣',
            suitColor: 'black',
            company: 'VaultofCodes',
            companyIcon: 'fas fa-code',
            badge: 'National Portal',
            title: 'Programming Internship Shortlist',
            date: '2026',
            location: 'National Internship Portal',
            image: 'achiments/Screenshot 2026-10-16 113757.png',
            desc: 'Shortlisted for Python/Java Programming Internship through the National Internship Portal at VaultofCodes among top student candidates.'
        }
    ];

    let currentDeck = [...achievements];
    let activeDeckIndex = 0;
    let isFanned = false;

    const cardsDeckStack = document.getElementById('cards-deck-stack');
    const deckCountNum = document.getElementById('deck-count-num');
    const cardInnerFlipper = document.getElementById('card-inner-flipper');
    const cardFrontDesign = document.getElementById('card-front-design');
    const drawCardBtn = document.getElementById('draw-card-btn');
    const shuffleDeckBtn = document.getElementById('shuffle-deck-btn');
    const fanToggleBtn = document.getElementById('fan-toggle-btn');
    const fanBtnText = document.getElementById('fan-btn-text');
    const flipCardBtn = document.getElementById('flip-card-btn');
    const viewCertBtn = document.getElementById('view-cert-btn');
    const prevCardBtn = document.getElementById('prev-card-btn');
    const nextCardBtn = document.getElementById('next-card-btn');

    // Lightbox Elements
    const lightboxModal = document.getElementById('achievement-lightbox');
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxSubtitle = document.getElementById('lightbox-subtitle');
    const lightboxBadge = document.getElementById('lightbox-badge');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxDesc = document.getElementById('lightbox-desc');

    if (cardsDeckStack && cardInnerFlipper) {
        // Render cards in the deck
        function renderDeck() {
            cardsDeckStack.innerHTML = '';
            if (deckCountNum) deckCountNum.innerText = currentDeck.length;

            const total = currentDeck.length;
            const stackAngles = [-10, -7, -4, -1, 2, 5, 8, 11];

            currentDeck.forEach((card, i) => {
                const cardEl = document.createElement('div');
                cardEl.className = `deck-card ${i === activeDeckIndex ? 'active-in-deck' : ''}`;
                cardEl.setAttribute('data-index', i);
                cardEl.setAttribute('title', `Click to draw: ${card.title}`);

                // Stack or Fan Transform Calculation
                if (!isFanned) {
                    const rot = stackAngles[i % stackAngles.length];
                    const yOffset = -i * 3;
                    const xOffset = ((i % 2 === 0) ? -1 : 1) * 2;
                    cardEl.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${rot}deg)`;
                    cardEl.style.zIndex = i + 1;
                } else {
                    const centerIndex = (total - 1) / 2;
                    const offsetFromCenter = i - centerIndex;
                    const rot = offsetFromCenter * 7;
                    const xOffset = offsetFromCenter * 32;
                    const yOffset = Math.abs(offsetFromCenter) * 7;
                    cardEl.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${rot}deg)`;
                    cardEl.style.zIndex = i + 1;
                }

                // Card Back Graphic with Corner Pips
                const suitClass = card.suitColor === 'red' ? 'suit-red' : 'suit-black';
                cardEl.innerHTML = `
                    <div class="card-back-frame">
                        <div class="card-corner top-left ${suitClass}">
                            <span class="rank">${card.rank}</span>
                            <span class="suit">${card.suit}</span>
                        </div>
                        <div class="card-corner top-right ${suitClass}">
                            <span class="rank">${card.rank}</span>
                            <span class="suit">${card.suit}</span>
                        </div>
                        <div class="card-corner bottom-left ${suitClass}">
                            <span class="rank">${card.rank}</span>
                            <span class="suit">${card.suit}</span>
                        </div>
                        <div class="card-corner bottom-right ${suitClass}">
                            <span class="rank">${card.rank}</span>
                            <span class="suit">${card.suit}</span>
                        </div>
                        <div class="card-back-pattern">
                            <div class="card-center-emblem">
                                <i class="fas fa-shield-halved emblem-icon"></i>
                                <div class="emblem-brand">VARAD</div>
                                <div class="emblem-sub">AI &bull; ML</div>
                            </div>
                        </div>
                    </div>
                `;

                // Click to pick this card
                cardEl.addEventListener('click', () => {
                    pickCard(i);
                });

                cardsDeckStack.appendChild(cardEl);
            });
        }

        // Display card in showcase stage with smooth 3D flip
        function updateShowcase(index, withFlip = true) {
            if (index < 0 || index >= currentDeck.length) return;
            activeDeckIndex = index;
            const card = currentDeck[activeDeckIndex];

            const suitClass = card.suitColor === 'red' ? 'suit-red' : 'suit-black';

            // Populate Card Front
            cardFrontDesign.innerHTML = `
                <div class="card-corner top-left ${suitClass}">
                    <span class="rank">${card.rank}</span>
                    <span class="suit">${card.suit}</span>
                </div>
                <div class="card-corner bottom-right ${suitClass}">
                    <span class="rank">${card.rank}</span>
                    <span class="suit">${card.suit}</span>
                </div>
                
                <div class="card-front-header">
                    <div class="card-company-pill">
                        <i class="${card.companyIcon}"></i>
                        <span>${card.company}</span>
                    </div>
                    <span class="card-badge-pill">${card.badge}</span>
                </div>

                <div class="card-media-box" id="showcase-img-box" title="Click to view full certificate">
                    <img src="${encodeURI(card.image)}" alt="${card.title}" loading="lazy">
                    <div class="card-media-hover-overlay">
                        <i class="fas fa-search-plus"></i>
                        <span>Enlarge Certificate</span>
                    </div>
                </div>

                <div class="card-info-box">
                    <h3 class="card-info-title">${card.title}</h3>
                    <div class="card-info-meta">
                        <span class="card-date"><i class="far fa-calendar-alt"></i> ${card.date}</span>
                        <span class="card-loc"><i class="fas fa-map-pin"></i> ${card.location}</span>
                    </div>
                    <p class="card-info-desc">${card.desc}</p>
                </div>
            `;

            // Setup click on the card image to open lightbox
            const imgBox = cardFrontDesign.querySelector('#showcase-img-box');
            if (imgBox) {
                imgBox.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openLightbox(card);
                });
            }

            // Deal animation & smooth 3D flip
            if (withFlip) {
                cardInnerFlipper.classList.remove('dealing', 'is-flipped');
                void cardInnerFlipper.offsetWidth; // Trigger reflow
                cardInnerFlipper.classList.add('dealing');

                setTimeout(() => {
                    cardInnerFlipper.classList.remove('dealing');
                    cardInnerFlipper.classList.add('is-flipped');
                }, 750);
            } else {
                cardInnerFlipper.classList.add('is-flipped');
            }

            // Update active state in deck
            document.querySelectorAll('.deck-card').forEach((el, idx) => {
                el.classList.toggle('active-in-deck', idx === activeDeckIndex);
            });
        }

        // Pick specific card from deck
        function pickCard(index) {
            updateShowcase(index, true);
        }

        // Draw next card
        function drawCard() {
            const nextIdx = (activeDeckIndex + 1) % currentDeck.length;
            pickCard(nextIdx);
        }

        // Draw previous card
        function prevCard() {
            const prevIdx = (activeDeckIndex - 1 + currentDeck.length) % currentDeck.length;
            pickCard(prevIdx);
        }

        // Toggle card flip (inspect back / front)
        function toggleFlip() {
            cardInnerFlipper.classList.toggle('is-flipped');
        }

        // Shuffle deck
        function shuffleDeck() {
            const cards = cardsDeckStack.querySelectorAll('.deck-card');
            cards.forEach((card, idx) => {
                card.classList.add(idx % 2 === 0 ? 'shuffling-left' : 'shuffling-right');
            });

            setTimeout(() => {
                // Fisher-Yates Shuffle
                for (let i = currentDeck.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [currentDeck[i], currentDeck[j]] = [currentDeck[j], currentDeck[i]];
                }
                activeDeckIndex = 0;
                renderDeck();
                updateShowcase(0, true);
            }, 500);
        }

        // Spread/Stack Fan Toggle
        function toggleFan() {
            isFanned = !isFanned;
            if (fanBtnText) {
                fanBtnText.innerText = isFanned ? 'Stack Deck' : 'Spread Fan';
            }
            renderDeck();
        }

        // Lightbox Functions
        function openLightbox(card) {
            if (!lightboxModal) return;
            lightboxImg.src = encodeURI(card.image);
            lightboxTitle.innerText = card.title;
            lightboxSubtitle.innerText = `${card.company} • ${card.date} • ${card.location}`;
            lightboxBadge.innerText = card.badge;
            lightboxDesc.innerText = card.desc;
            lightboxModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            if (!lightboxModal) return;
            lightboxModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Event Listeners for Controls
        if (drawCardBtn) drawCardBtn.addEventListener('click', drawCard);
        if (shuffleDeckBtn) shuffleDeckBtn.addEventListener('click', shuffleDeck);
        if (fanToggleBtn) fanToggleBtn.addEventListener('click', toggleFan);
        if (flipCardBtn) flipCardBtn.addEventListener('click', toggleFlip);
        if (prevCardBtn) prevCardBtn.addEventListener('click', prevCard);
        if (nextCardBtn) nextCardBtn.addEventListener('click', drawCard);

        if (viewCertBtn) {
            viewCertBtn.addEventListener('click', () => {
                openLightbox(currentDeck[activeDeckIndex]);
            });
        }

        // Clicking the card body flips it (unless clicking image or links)
        cardInnerFlipper.addEventListener('click', (e) => {
            if (e.target.closest('#showcase-img-box') || e.target.closest('button') || e.target.closest('a')) {
                return;
            }
            toggleFlip();
        });

        // Lightbox Close Events
        if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
        if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight' && !lightboxModal.classList.contains('active')) drawCard();
            if (e.key === 'ArrowLeft' && !lightboxModal.classList.contains('active')) prevCard();
        });

        // Initial Initialization
        renderDeck();
        updateShowcase(0, false);
    }
});
