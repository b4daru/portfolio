document.addEventListener("DOMContentLoaded", () => {
    const skillProgressBars = document.querySelectorAll('.progress-fill');
    
    const animateSkills = () => {
        skillProgressBars.forEach(bar => {
            const width = bar.dataset.width;
            bar.style.width = `${width}%`;
        });
    };
    
    // Initialize skill bar animation on page load if already in view


    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger skill bar animation
                if (entry.target.classList.contains('skills-progress')) {
                    animateSkills();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.sticky-note, .skills-sketch, .skills-progress, .polaroid, .contact-item, .sketch-form');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add drawing animation to buttons
    const buttons = document.querySelectorAll('.sketch-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'rotate(0deg) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'rotate(-1deg) scale(1)';
        });
    });
    
    // Add hover effects to polaroid cards
    const polaroids = document.querySelectorAll('.polaroid');
    polaroids.forEach((polaroid, index) => {
        const originalRotation = index % 2 === 0 ? -2 : (index % 3 === 0 ? -1 : 1);
        
        polaroid.addEventListener('mouseenter', () => {
            polaroid.style.transform = 'rotate(0deg) scale(1.05)';
            polaroid.style.zIndex = '10';
        });
        
        polaroid.addEventListener('mouseleave', () => {
            polaroid.style.transform = `rotate(${originalRotation}deg) scale(1)`;
            polaroid.style.zIndex = '1';
        });
    });
    
    // Add typewriter effect to the main title
    const title = document.querySelector('.handwritten-title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        title.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typewriter effect after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Add ink spreading effect to form inputs
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.background = 'white';
            input.style.borderColor = '#4682B4';
            input.style.boxShadow = '0 0 10px rgba(70, 130, 180, 0.2)';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.style.background = '#F8F6F0';
                input.style.borderColor = '#2C2C2C';
                input.style.boxShadow = 'none';
            }
        });
    });
    
    // Handle form submission
    const contactForm = document.querySelector('.sketch-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add submission animation
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.querySelector('span').textContent;
            
            submitButton.querySelector('span').textContent = 'Sending...';
            submitButton.style.background = '#8B4513';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitButton.querySelector('span').textContent = 'Sent! ✓';
                submitButton.style.background = '#4CAF50';
                
                setTimeout(() => {
                    submitButton.querySelector('span').textContent = originalText;
                    submitButton.style.background = '#4682B4';
                    submitButton.disabled = false;
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }
    
    // Add parallax effect to floating doodles
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const doodles = document.querySelectorAll('.doodle');
        
        doodles.forEach((doodle, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            doodle.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.02}deg)`;
        });
        
        // Parallax for coffee stains
        const coffeeStains = document.querySelectorAll('.coffee-stain');
        coffeeStains.forEach((stain, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            stain.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Add random rotation to sticky notes and forms on load
    const rotatedElements = document.querySelectorAll('.sticky-note, .contact-item, .sketch-form');
    rotatedElements.forEach((element, index) => {
        const randomRotation = (Math.random() - 0.5) * 4; // Random rotation between -2 and 2 degrees
        const currentTransform = element.style.transform || '';
        element.style.transform = currentTransform + ` rotate(${randomRotation}deg)`;
    });
    
    // Add drawing sound effect simulation (visual feedback)
    const drawingElements = document.querySelectorAll('.sketch-button, .social-link');
    drawingElements.forEach(element => {
        element.addEventListener('click', (e) => {
            // Create a temporary "ink splash" effect
            const splash = document.createElement('div');
            splash.style.position = 'absolute';
            splash.style.width = '20px';
            splash.style.height = '20px';
            splash.style.background = '#4682B4';
            splash.style.borderRadius = '50%';
            splash.style.pointerEvents = 'none';
            splash.style.left = e.clientX + 'px';
            splash.style.top = e.clientY + 'px';
            splash.style.transform = 'translate(-50%, -50%) scale(0)';
            splash.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            splash.style.opacity = '0.7';
            splash.style.zIndex = '9999';
            
            document.body.appendChild(splash);
            
            // Animate the splash
            setTimeout(() => {
                splash.style.transform = 'translate(-50%, -50%) scale(2)';
                splash.style.opacity = '0';
            }, 10);
            
            // Remove the splash after animation
            setTimeout(() => {
                document.body.removeChild(splash);
            }, 300);
        });
    });
    
    // Initialize skill bar animation on page load if already in view
    window.addEventListener("load", animateSkills);

    // Smooth scroll for CTA buttons
    const viewMyWorkButton = document.querySelector(".sketch-button.primary");
    const getInTouchButton = document.querySelector(".sketch-button.secondary");

    viewMyWorkButton.addEventListener("click", () => {
        document.querySelector("#projects-section").scrollIntoView({
            behavior: "smooth"
        });
    });

    getInTouchButton.addEventListener("click", () => {
        document.querySelector("#contact-section").scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Advanced Code Protection Measures
(function() {
    'use strict';
    
    // Disable right-click context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    document.addEventListener('keydown', function(e) {
        // F12
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+I (Developer Tools)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            return false;
        }
        // Ctrl+U (View Source)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
        }
        // Ctrl+S (Save Page)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            return false;
        }
        // Ctrl+A (Select All)
        if (e.ctrlKey && e.keyCode === 65) {
            e.preventDefault();
            return false;
        }
        // Ctrl+P (Print)
        if (e.ctrlKey && e.keyCode === 80) {
            e.preventDefault();
            return false;
        }
    });
    
    // Detect developer tools
    let devtools = {
        open: false,
        orientation: null
    };
    
    const threshold = 160;
    
    setInterval(function() {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
            if (!devtools.open) {
                devtools.open = true;
                // Redirect or show warning
                document.body.innerHTML = '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;font-size:24px;z-index:99999;">Developer tools detected. Access denied.</div>';
            }
        } else {
            devtools.open = false;
        }
    }, 500);
    
    // Disable text selection (additional layer)
    document.onselectstart = function() {
        return false;
    };
    
    document.onmousedown = function() {
        return false;
    };
    
    // Disable drag and drop
    document.ondragstart = function() {
        return false;
    };
    
    // Clear console periodically
    setInterval(function() {
        console.clear();
    }, 1000);
    
    // Add watermark
    function addWatermark() {
        const watermark = document.createElement('div');
        watermark.innerHTML = '© Badarudheen VK - Unauthorized copying prohibited';
        watermark.style.cssText = `
            position: fixed;
            bottom: 10px;
            right: 10px;
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 5px 10px;
            font-size: 12px;
            border-radius: 3px;
            z-index: 9999;
            pointer-events: none;
            font-family: Arial, sans-serif;
        `;
        document.body.appendChild(watermark);
    }
    
    // Add invisible watermarks throughout the page
    function addInvisibleWatermarks() {
        const watermarks = [
            'BADARUDHEEN-VK-PORTFOLIO',
            'ETHICAL-HACKER-DESIGNER',
            'UNAUTHORIZED-COPY-PROHIBITED'
        ];
        
        watermarks.forEach((text, index) => {
            const span = document.createElement('span');
            span.innerHTML = text;
            span.style.cssText = `
                position: absolute;
                top: ${100 + index * 200}px;
                left: ${100 + index * 150}px;
                opacity: 0.01;
                font-size: 1px;
                color: transparent;
                pointer-events: none;
                user-select: none;
            `;
            document.body.appendChild(span);
        });
    }
    
    // Initialize protection measures
    document.addEventListener('DOMContentLoaded', function() {
        addWatermark();
        addInvisibleWatermarks();
    });
    
    // Disable print screen
    document.addEventListener('keyup', function(e) {
        if (e.keyCode === 44) {
            document.body.style.display = 'none';
            setTimeout(function() {
                document.body.style.display = 'block';
            }, 100);
        }
    });
    
    // Obfuscate source code comments
    console.log('%cSTOP!', 'color: red; font-size: 50px; font-weight: bold;');
    console.log('%cThis is a browser feature intended for developers. Unauthorized access to this portfolio\'s code is prohibited.', 'color: red; font-size: 16px;');
    console.log('%c© Badarudheen VK - All rights reserved', 'color: blue; font-size: 14px;');
    
})();


