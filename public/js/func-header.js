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