document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. LIGHT / DARK MODE TOGGLE
       ===================================================== */

    const themeToggleBtn = document.getElementById("theme-toggle");

    if (themeToggleBtn) {

        const icon = themeToggleBtn.querySelector("i");

        const savedTheme =
            localStorage.getItem("theme") || "dark";

        if (savedTheme === "light") {

            document.body.classList.remove("dark-mode");

            if (icon) {
                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");
            }

        } else {

            document.body.classList.add("dark-mode");

            if (icon) {
                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");
            }
        }


        themeToggleBtn.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            const isDark =
                document.body.classList.contains("dark-mode");


            if (icon) {

                if (isDark) {

                    icon.classList.remove("fa-sun");
                    icon.classList.add("fa-moon");

                    localStorage.setItem("theme", "dark");

                } else {

                    icon.classList.remove("fa-moon");
                    icon.classList.add("fa-sun");

                    localStorage.setItem("theme", "light");
                }
            }

        });

    }


    /* =====================================================
       2. TYPEWRITER EFFECT
       ===================================================== */

    const typewriterElement =
        document.getElementById("typewriter");

    if (typewriterElement) {

        const words = [
            "Brand Identities.",
            "Social Media Banners.",
            "Vector Art.",
            "Video Content."
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;


        function typeEffect() {

            const currentWord =
                words[wordIndex];


            if (isDeleting) {

                typewriterElement.textContent =
                    currentWord.substring(
                        0,
                        charIndex - 1
                    );

                charIndex--;

            } else {

                typewriterElement.textContent =
                    currentWord.substring(
                        0,
                        charIndex + 1
                    );

                charIndex++;
            }


            let typeSpeed =
                isDeleting ? 50 : 100;


            if (
                !isDeleting &&
                charIndex === currentWord.length
            ) {

                typeSpeed = 1800;
                isDeleting = true;

            } else if (
                isDeleting &&
                charIndex === 0
            ) {

                isDeleting = false;

                wordIndex =
                    (wordIndex + 1) % words.length;

                typeSpeed = 500;
            }


            setTimeout(typeEffect, typeSpeed);
        }


        typeEffect();
    }


    /* =====================================================
       3. SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    function checkReveal() {

        const triggerBottom =
            window.innerHeight * 0.85;


        revealElements.forEach((element) => {

            const top =
                element.getBoundingClientRect().top;


            if (top < triggerBottom) {
                element.classList.add("active");
            }

        });
    }


    window.addEventListener(
        "scroll",
        checkReveal
    );

    checkReveal();


    /* =====================================================
       4. AOS
       ===================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({
            once: true,
            offset: 120
        });

    }
/* =====================================================
   5. IMAGE HOVER FULLSCREEN PREVIEW
   ===================================================== */

const modal = document.getElementById("imageModal");
const fullImage = document.getElementById("fullImage");
const closeBtn = document.querySelector(".close-btn");

const projectImages = document.querySelectorAll(
    ".portfolio-item img"
);

if (modal && fullImage && closeBtn && projectImages.length > 0) {

    let currentThumbnail = null;
    let closeTimer = null;


    /* =================================================
       OPEN FULLSCREEN
       ================================================= */

    function openPreview(image) {

        clearTimeout(closeTimer);

        currentThumbnail = image;

        fullImage.src = image.src;
        fullImage.alt = image.alt || "Design Preview";

        modal.style.display = "flex";

        requestAnimationFrame(() => {
            modal.classList.add("show");
        });

        document.body.style.overflow = "hidden";
    }


    /* =================================================
       CLOSE / MINIMIZE
       ================================================= */

    function closePreview() {

        clearTimeout(closeTimer);

        modal.classList.remove("show");

        /*
         * Wait for the minimize animation
         */

        closeTimer = setTimeout(() => {

            modal.style.display = "none";
            fullImage.src = "";

            document.body.style.overflow = "";

            currentThumbnail = null;

        }, 1500);
    }


    /* =================================================
       HOVER THUMBNAIL
       ================================================= */

    projectImages.forEach((image) => {

        image.addEventListener("mouseenter", () => {

            if (
                window.matchMedia("(hover: hover)").matches
            ) {

                openPreview(image);
            }

        });

    });


    /* =================================================
       MOUSE MOVEMENT
       
       This is the important part.
       
       We check whether the mouse is still INSIDE
       the actual fullscreen image.
       ================================================= */

    document.addEventListener("mousemove", (event) => {

        if (!modal.classList.contains("show")) {
            return;
        }

        const imageRect =
            fullImage.getBoundingClientRect();


        const mouseInsideImage =
            event.clientX >= imageRect.left &&
            event.clientX <= imageRect.right &&
            event.clientY >= imageRect.top &&
            event.clientY <= imageRect.bottom;


        /*
         * Mouse is outside fullscreen image
         */

        if (!mouseInsideImage) {

            /*
             * Small delay prevents accidental closing
             * while moving from thumbnail to fullscreen.
             */

            clearTimeout(closeTimer);

            closeTimer = setTimeout(() => {

                closePreview();

            }, 60);

        } else {

            /*
             * Mouse is inside fullscreen image.
             * Cancel closing.
             */

            clearTimeout(closeTimer);
        }

    });


    /* =================================================
       CLOSE BUTTON
       ================================================= */

    closeBtn.addEventListener("click", () => {

        closePreview();

    });


    /* =================================================
       ESC KEY
       ================================================= */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("show")
        ) {

            closePreview();
        }

    });


    /* =================================================
       MOBILE / TOUCH
       ================================================= */

    projectImages.forEach((image) => {

        image.addEventListener("click", () => {

            if (
                !window.matchMedia("(hover: hover)").matches
            ) {

                openPreview(image);
            }

        });

    });

}
});