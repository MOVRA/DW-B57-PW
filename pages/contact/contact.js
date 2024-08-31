// Header 

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

// Main 

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
    link.href = `mailto:abgibun@gmail.com?subject=${userSubject}&body=Hi my name is ${userName}. ${userSubject}. If you are available here is my number ${userPNumber}%20%0D%0A%0D%20%0D%0A%0DPoint: ${userMessage}`;

    link.click();
}

// Footer 

const newDate = new Date();

const getYear = newDate.getFullYear();

document.querySelector(".year").innerHTML = '&copy; ' + `${getYear} M GIBRAN` 