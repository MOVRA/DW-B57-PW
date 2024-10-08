const activePage = window.location.pathname;
const navLinks = document.querySelectorAll('nav li a');

if (navLinks[0].href.includes(`${activePage}`)) {
    navLinks[0].classList.add('active');
}
else if (navLinks[1].href.includes(`${activePage}`)) {
    navLinks[1].classList.add('active');
}
else if (navLinks[2].href.includes(`${activePage}`)) {
    navLinks[2].classList.add('active');
}

if (window.location.pathname != "/") {
    for (let i = 0; i < document.querySelectorAll(".add-project-btn").length; i++) {
        document.querySelectorAll(".add-project-btn")[i].setAttribute("href", "/#project");
    }
}

for (let i = 0; i < document.querySelectorAll(".add-project-btn").length; i++) {
    document.querySelectorAll(".add-project-btn")[i].addEventListener("click", function () {
        document.querySelector(".post-project-container-none").classList.toggle("post-project-container");
        document.querySelector(".custom-container-project").classList.toggle("custom-container-project-none");
    });
}