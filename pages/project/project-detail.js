// Header

document.querySelector(".menu-icon").addEventListener("click", function () {
    document.querySelector(".respons-menu").classList.toggle("respons-menu-on");
});

// Footer

const newDate = new Date();

const getYear = newDate.getFullYear();

document.querySelector(".year").innerHTML = '&copy; ' + `${getYear} M GIBRAN`;