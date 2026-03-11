document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            
            // Toggle icon between bars and times
            const icon = hamburger.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close mobile menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Unobserve after revealing to animate only once
                // observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Testimonial Slider Logic
    const track = document.getElementById('testimonialTrack');
    const cards = Array.from(document.querySelectorAll('.testimonial-card'));
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    let currentIndex = 0;

    if (track && cards.length > 0) {
        // Create dots
        cards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => updateSlider(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = Array.from(document.querySelectorAll('.dot'));
        
        function updateSlider(index) {
            currentIndex = index;
            
            // Move track
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update actives
            cards.forEach(c => {
                c.classList.remove('active');
                c.setAttribute('aria-hidden', 'true');
            });
            dots.forEach(d => d.classList.remove('active'));
            
            cards[currentIndex].classList.add('active');
            cards[currentIndex].setAttribute('aria-hidden', 'false');
            dots[currentIndex].classList.add('active');
        }
        
        prevBtn.addEventListener('click', () => {
            let index = currentIndex - 1;
            if (index < 0) index = cards.length - 1; // loop
            updateSlider(index);
        });

        nextBtn.addEventListener('click', () => {
            let index = currentIndex + 1;
            if (index >= cards.length) index = 0; // loop
            updateSlider(index);
        });

        // Optional Autoplay
        setInterval(() => {
            let index = currentIndex + 1;
            if (index >= cards.length) index = 0;
            updateSlider(index);
        }, 5000);
    }

    // WhatsApp Booking Form Logic
    const waBookingForm = document.getElementById('waBookingForm');
    
    if (waBookingForm) {
        waBookingForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent traditional form submission
            
            // Gather form data
            const userName = document.getElementById('userName').value.trim();
            const busType = document.getElementById('busType').value;
            const tripDate = document.getElementById('tripDate').value;
            const destination = document.getElementById('destination').value.trim();
            const tripDetails = document.getElementById('tripDetails').value.trim();
            
            // Format WhatsApp Message
            let waMessage = `*New Booking Request - Ai Transindo*\n\n`;
            waMessage += `*Name:* ${userName}\n`;
            waMessage += `*Selected Fleet:* ${busType}\n`;
            waMessage += `*Trip Date:* ${tripDate}\n`;
            waMessage += `*Destination:* ${destination}\n`;
            
            if (tripDetails) {
                waMessage += `*Additional Details:* ${tripDetails}\n`;
            }
            
            waMessage += `\nPlease assist me with this booking.`;
            
            // Encode the message for URL
            const encodedMessage = encodeURIComponent(waMessage);
            
            // target phone number: +62 856-1133-931 -> 628561133931
            const phoneNumber = "628561133931";
            
            // Create WhatsApp URL
            const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            // Open in new tab
            window.open(waUrl, '_blank');
        });
    }

    // Client-Side Chatbot Logic (Indonesian)
    const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
    const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
    const chatbotWidget = document.getElementById('chatbot-widget');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSendBtn = document.getElementById('chatbot-send-btn');

    // Pre-defined rules and responses in Indonesian
    const chatbotRules = {
        greetings: {
            keywords: ["halo", "hai", "hi", "selamat", "pagi", "siang", "sore", "malam", "ping", "test"],
            response: "Halo! Selamat datang di Ai Transindo. Ada yang bisa saya bantu hari ini? Anda bisa menanyakan tentang 'harga', 'armada', 'fasilitas', atau 'cara pesan'."
        },
        fleet: {
            keywords: ["armada", "bus", "mobil", "minivan", "hiace", "elf", "tipe", "kendaraan", "jenis"],
            response: "Kami menyediakan beberapa tipe armada premium: <br>- <strong>Minivan</strong> (14-19 kursi)<br>- <strong>Medium Bus</strong> (25-33 kursi)<br>- <strong>Big Bus</strong> (45-59 kursi)<br>- <strong>Sleeper Bus</strong> (20-24 suites mewah)."
        },
        pricing: {
            keywords: ["harga", "biaya", "tarif", "sewa", "price", "pricelist", "berapa", "bayar"],
            response: "Harga sewa kami bervariasi tergantung tipe bus, durasi, dan tujuan. <br>- Minivan: Mulai Rp 1.0M/Hari<br>- Medium Bus: Mulai Rp 1.5M/Hari<br>- Big Bus: Mulai Rp 2.5M/Hari<br>- Sleeper Bus: Mulai Rp 3.5M/Hari. <br>Silakan hubungi WhatsApp kami untuk penawaran pas."
        },
        facilities: {
            keywords: ["fasilitas", "ac", "toilet", "wifi", "karaoke", "tv", "audio", "nyaman"],
            response: "Semua armada kami dilengkapi Full AC, reclining seats, dan audio/video. Big Bus memiliki fasilitas toilet, dan Sleeper Bus kami memiliki kasur privat (suites), Personal TV, dan pantry."
        },
        booking: {
            keywords: ["pesan", "booking", "reservasi", "order", "cara", "hubungi", "kontak", "wa", "whatsapp"],
            response: "Untuk pemesanan, Anda bisa mengisi formulir 'Booking' di website kami, atau langsung menghubungi tim kami via WhatsApp di nomor <strong>+62 856-1133-931</strong>."
        },
        location: {
            keywords: ["lokasi", "alamat", "kantor", "dimana", "daerah", "posisi"],
            response: "Kantor pusat kami berlokasi di 123 Tour Street, Jakarta, Indonesia. Namun, kami melayani penjemputan untuk berbagai rute perjalanan."
        }
    };

    const fallbackResponse = "Maaf, saya kurang mengerti pertanyaan Anda terkait itu. Silakan hubungi tim customer service kami via WhatsApp di +62 856-1133-931 untuk bantuan lebih lanjut.";

    function toggleChatbot() {
        if (!chatbotWidget) return;
        
        const isActive = chatbotWidget.classList.contains('active');
        
        if (isActive) {
            chatbotWidget.classList.remove('active');
            chatbotWidget.setAttribute('aria-hidden', 'true');
            chatbotToggleBtn.classList.remove('hidden');
        } else {
            chatbotWidget.classList.add('active');
            chatbotWidget.setAttribute('aria-hidden', 'false');
            chatbotToggleBtn.classList.add('hidden');
            setTimeout(() => chatbotInput.focus(), 300); // Auto-focus input
        }
    }

    if (chatbotToggleBtn && chatbotCloseBtn) {
        chatbotToggleBtn.addEventListener('click', toggleChatbot);
        chatbotCloseBtn.addEventListener('click', toggleChatbot);
    }

    function addMessageToChat(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.innerHTML = message;
        chatbotMessages.appendChild(messageDiv);
        
        // Auto scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot-message bot-typing';
        typingDiv.id = 'bot-typing-indicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function hideTypingIndicator() {
        const indicator = document.getElementById('bot-typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    function getBotResponse(userMessage) {
        const lowercaseMsg = userMessage.toLowerCase();
        
        // Scan through rules to find matching keyword
        for (const intent in chatbotRules) {
            const rule = chatbotRules[intent];
            const hasKeywordMatch = rule.keywords.some(keyword => lowercaseMsg.includes(keyword));
            
            if (hasKeywordMatch) {
                return rule.response;
            }
        }
        
        return fallbackResponse;
    }

    function handleChatbotSubmit() {
        const userMessage = chatbotInput.value.trim();
        if (!userMessage) return;

        // 1. Show user message
        addMessageToChat(userMessage, true);
        chatbotInput.value = ''; // clear input

        // 2. Show bot typing animation
        showTypingIndicator();

        // 3. Process logic and delay response slightly for realistic feel
        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            hideTypingIndicator();
            addMessageToChat(botResponse, false);
        }, 800 + Math.random() * 500); // 800ms - 1300ms delay
    }

    if (chatbotSendBtn && chatbotInput) {
        chatbotSendBtn.addEventListener('click', handleChatbotSubmit);
        
        // Allow pressing Enter to send
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleChatbotSubmit();
            }
        });
    }

});
