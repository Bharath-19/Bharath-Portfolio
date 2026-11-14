
/* =========================================
   BHARATH PORTFOLIO — INTERACTIONS
========================================= */

// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       1. MOBILE NAVIGATION
    ===================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navigationItems = document.querySelectorAll(".nav-links a");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("open");

            menuToggle.textContent = isOpen ? "✕" : "☰";

            menuToggle.setAttribute("aria-expanded", isOpen);

        });

        // Close menu after clicking a navigation link
        navigationItems.forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");

            });

        });

    }


    /* =====================================
       2. SCROLL REVEAL ANIMATIONS
    ===================================== */

    const revealElements = document.querySelectorAll(
        ".section, .experience-card, .project-card, .skill-card, .stat"
    );

    // Add animation class
    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =====================================
       3. ANIMATED STATISTICS
    ===================================== */

    const statistics = document.querySelectorAll(".stat h2");

    function animateNumber(element) {

        const originalText = element.textContent.trim();

        const numericValue = parseFloat(
            originalText.replace(/[^0-9.]/g, "")
        );

        if (!Number.isFinite(numericValue)) return;

        const suffix = originalText.replace(/[0-9.]/g, "");

        const duration = 1400;
        const startTime = performance.now();

        function updateNumber(currentTime) {

            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            const easedProgress = 1 - Math.pow(1 - progress, 3);

            const currentValue = numericValue * easedProgress;

            const formattedValue = Number.isInteger(numericValue)
                ? Math.floor(currentValue)
                : currentValue.toFixed(2);

            element.textContent = formattedValue + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = originalText;
            }

        }

        requestAnimationFrame(updateNumber);

    }

    if ("IntersectionObserver" in window) {

        const statsObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    animateNumber(entry.target);

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.6
        });

        statistics.forEach(stat => {
            statsObserver.observe(stat);
        });

    }


    /* =====================================
       4. ACTIVE NAVIGATION HIGHLIGHT
    ===================================== */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.getAttribute("id");

                    navigationItems.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${currentId}`
                        );

                    });

                }

            });

        }, {
            rootMargin: "-30% 0px -60% 0px"
        });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    /* =====================================
       5. CURRENT COPYRIGHT YEAR
    ===================================== */

    const footerText = document.querySelector(".footer p");

    if (footerText) {

        footerText.textContent =
            `© ${new Date().getFullYear()} Bharath. Designed and built with care.`;

    }


    /* =====================================
       6. PAGE LOADED
    ===================================== */

    document.body.classList.add("page-loaded");

});
