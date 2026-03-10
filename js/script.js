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
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Toggle icon between bars and times
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

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
});
