// Header | All page

document.querySelector(".menu-icon").addEventListener("click", function () {
    document.querySelector(".respons-menu").classList.toggle("respons-menu-on");
});

const activePage = window.location.pathname;
const navLinks = document.querySelectorAll('nav ul li a');

if (navLinks[0].href.includes(`${activePage}`)) {
    navLinks[0].classList.add('active');
}
else if (navLinks[1].href.includes(`${activePage}`)) {
    navLinks[1].classList.add('active');
}
else if (navLinks[2].href.includes(`${activePage}`)) {
    navLinks[2].classList.add('active');
}

else if (navLinks[3].href.includes(`${activePage}`)) {
    navLinks[3].classList.add('active');
}

else if (navLinks[4].href.includes(`${activePage}`)) {
    navLinks[4].classList.add('active');
}

// Footer | All page

const newDate = new Date();

const getYear = newDate.getFullYear();

console.log(getYear);

document.querySelector(".year").innerHTML = '&copy; ' + `${getYear} M GIBRAN`;

// Main | Home page

const yearBorn = 2005;

const age = getYear - 2005

document.querySelector(".age").innerHTML = age;

const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["HELLO WORLD!", "HELLO HUMAN!", "HELLO PEOPLE!"];
const typingDelay = 100;
const erasingDelay = 100;
const newTextDelay = 3000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    }
    else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    }
    else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// Main | Contact page

function sendEmail(e) {

    event.preventDefault(e);

    const userName = document.querySelector("#name").value;
    const userEmail = document.querySelector("#email").value;
    const userPNumber = document.querySelector("#pnumber").value;
    const userSubject = document.querySelector("#subject").value;
    const userMessage = document.querySelector("#message").value;

    const emailDetail = {
        name: userName,
        email: userEmail,
        userPNumber: userPNumber,
        subject: userSubject,
        message: userMessage
    };
    
    const link = document.createElement("a");
    link.href = `mailto:abgibun@gmail.com?subject=${userSubject}&body=Nama: ${userName}\nNomor HP: ${userPNumber}\nMessage: ${userMessage}`;
    
    link.click();
    
    console.log(emailDetail);

    window.alert("Hello World!");
}







