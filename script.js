/* =========================================================
   CLASSIC GLOBAL — PREMIUM ANIMATION SCRIPT
   ========================================================= */


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (icon) {
            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-xmark");
        }

    });


    document.querySelectorAll("#navbar a").forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            if (icon) {
                icon.classList.add("fa-bars");
                icon.classList.remove("fa-xmark");
            }

        });

    });

}


/* ================= HERO BACKGROUND SLIDER ================= */

const home = document.querySelector(".home");

const heroImages = [

    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=85&w=2200&auto=format&fit=crop",

    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=85&w=2200&auto=format&fit=crop",

    "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=85&w=2200&auto=format&fit=crop",

    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=85&w=2200&auto=format&fit=crop"

];

let heroIndex = 0;


if (home) {

    home.style.backgroundImage =
        `url("${heroImages[0]}")`;


    setInterval(() => {

        home.style.opacity = "0.55";


        setTimeout(() => {

            heroIndex =
                (heroIndex + 1) % heroImages.length;


            home.style.backgroundImage =
                `url("${heroImages[heroIndex]}")`;


            home.style.opacity = "1";

        }, 450);

    }, 6000);

}


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(
    ".service-box, .skill-box, .package-box, .contact-box, .contact-form, .section-title"
);


revealElements.forEach(element => {

    element.classList.add("reveal");

});


const revealObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ================= PACKAGE STAGGER ================= */

document.querySelectorAll(".package-box").forEach(
    (card, index) => {

        card.style.transitionDelay =
            `${index * 90}ms`;

    }
);


/* ================= HEADER SCROLL EFFECT ================= */

const header = document.querySelector("header");


window.addEventListener("scroll", () => {

    if (!header) return;


    if (window.scrollY > 60) {

        header.style.background =
            "rgba(2,13,10,.94)";

        header.style.borderColor =
            "rgba(22,230,161,.20)";

        header.style.boxShadow =
            "0 15px 50px rgba(0,0,0,.35)";

    }

    else {

        header.style.background =
            "rgba(3,18,14,.72)";

        header.style.borderColor =
            "rgba(88,236,193,.13)";

        header.style.boxShadow =
            "0 15px 50px rgba(0,0,0,.22)";

    }

});


/* ================= CONTACT FORM ================= */

const form =
    document.getElementById("contactForm");


if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();


        const formData = {

            name: form.name.value,

            phone: form.phone.value,

            email: form.email.value,

            message: form.message.value

        };


        const submitBtn =
            form.querySelector("button");


        const originalText =
            submitBtn
                ? submitBtn.innerHTML
                : "";


        if (submitBtn) {

            submitBtn.innerHTML =
                "Sending...";

            submitBtn.disabled = true;

        }


        try {

            const res = await fetch(
                "/api/sendMail",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );


            const data =
                await res.json();


            if (data.success) {

                alert(
                    "Message Sent Successfully ✅"
                );

                form.reset();

            }

            else {

                alert(
                    "Error sending message ❌"
                );

            }

        }

        catch (error) {

            console.error(
                "Contact Form Error:",
                error
            );

            alert(
                "Server error ❌"
            );

        }


        finally {

            if (submitBtn) {

                submitBtn.innerHTML =
                    originalText;

                submitBtn.disabled = false;

            }

        }

    });

}


/* ================= ACTIVE NAVIGATION ================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll("#navbar a");


window.addEventListener("scroll", () => {

    let current = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 160;


        if (window.scrollY >= sectionTop) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        const href =
            link.getAttribute("href");


        if (href === `#${current}`) {

            link.classList.add("active");

        }

    });

});


/* ================= BUTTON RIPPLE EFFECT ================= */

document.querySelectorAll(".btn").forEach(button => {


    button.addEventListener("click", function (e) {


        const ripple =
            document.createElement("span");


        const rect =
            this.getBoundingClientRect();


        const size =
            Math.max(
                rect.width,
                rect.height
            );


        ripple.style.width =
            `${size}px`;


        ripple.style.height =
            `${size}px`;


        ripple.style.position =
            "absolute";


        ripple.style.borderRadius =
            "50%";


        ripple.style.background =
            "rgba(255,255,255,.22)";


        ripple.style.left =
            `${e.clientX - rect.left - size / 2}px`;


        ripple.style.top =
            `${e.clientY - rect.top - size / 2}px`;


        ripple.style.transform =
            "scale(0)";


        ripple.style.pointerEvents =
            "none";


        ripple.style.animation =
            "rippleEffect .65s ease-out";


        this.appendChild(ripple);


        setTimeout(() => {

            ripple.remove();

        }, 650);

    });

});


/* ================= RIPPLE ANIMATION CSS ================= */

const rippleStyle =
    document.createElement("style");


rippleStyle.textContent = `

@keyframes rippleEffect {

    to {

        transform: scale(2.5);

        opacity: 0;

    }

}

.btn {

    isolation: isolate;

}

.btn > span {

    z-index: 2;

}

`;


document.head.appendChild(rippleStyle);


/* ================= HERO IMAGE PRELOAD ================= */

heroImages.forEach(src => {

    const image =
        new Image();

    image.src = src;

});


/* ================= MOUSE PARALLAX ================= */

if (home && window.innerWidth > 900) {

    const heroContent =
        document.querySelector(".home-content");


    document.addEventListener("mousemove", (e) => {

        if (!heroContent) return;


        const x =
            (window.innerWidth / 2 - e.clientX) / 70;


        const y =
            (window.innerHeight / 2 - e.clientY) / 70;


        heroContent.style.transform =
            `translate(${x}px, ${y}px)`;

    });


    document.addEventListener("mouseleave", () => {

        if (!heroContent) return;


        heroContent.style.transform =
            "translate(0,0)";

    });

}


/* ================= ESCAPE KEY MOBILE MENU ================= */

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        if (navbar) {

            navbar.classList.remove("active");

        }

    }

});


/* ================= PAGE LOAD ================= */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


/* ================= CONSOLE ================= */

console.log(
    "Classic Global Premium Website Loaded 🚀"
);