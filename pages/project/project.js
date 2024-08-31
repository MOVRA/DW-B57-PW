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

let projectCard = document.querySelectorAll(".project-container");

let key = 3;
let projects = [
    {
        key: '2',
        src: 'https://img.freepik.com/free-vector/gradient-interview-portfolio-template_23-2149220443.jpg',
        title: 'Gibun-WebDev-MEVN-Stack',
        desc: 'This website is created with MEVN techonlogies :D . You can visit the website for the full review! ',
        dur: '10 Days'
    },
    {
        key: '1',
        src: 'https://img.freepik.com/free-vector/flat-design-colored-portfolio-template_23-2149215470.jpg',
        title: 'Gibun-WebDev-MERN-Stack',
        desc: 'This website is created with MERN techonlogies :D . You can visit the website for the full review! ',
        dur: '1 Month'
    },

];

if (!localStorage.src1 == "") {
    for (let i = 1; i <= Number(localStorage.getItem(`key${key}`)); i++) {
        projects.unshift(
            {
                key: localStorage.getItem(`key${i}`),
                src: localStorage.getItem(`src${i}`),
                title: localStorage.getItem(`title${i}`),
                desc: localStorage.getItem(`desc${i}`),
                dur: localStorage.getItem(`duration${i}`)
            }
        )
        key++;
    }
}

function keyCount(src, pName, desc, duration) {

    localStorage.setItem(`key${key}`, key);
    localStorage.setItem(`src${key}`, src);
    localStorage.setItem(`title${key}`, pName);
    localStorage.setItem(`desc${key}`, desc);
    localStorage.setItem(`duration${key}`, duration);

    projects.unshift(
        {
            key: localStorage.getItem(`key${key}`),
            src: localStorage.getItem(`src${key}`),
            title: localStorage.getItem(`title${key}`),
            desc: localStorage.getItem(`desc${key}`),
            dur: localStorage.getItem(`duration${key}`)
        }
    )

    key++;

    renderBlog(projects);
}

function renderBlog(projects) {

    if (document.querySelectorAll(".form-none-respons").length >= 1) {
        document.querySelector(".form-none-respons").classList.add(".form-blog");
        window.alert("Post berhasil! Silahkan tekan kembali tombol tambahkan untuk melihat postingan");
    }

    else {
        document.querySelector(".form-none").classList.remove("form-blog");
    }

    let html = "";

    for (let index = 0; index < projects.length; index++) {
        html += `<div class="project-container">
                    <div class="project-cover">
                        <img src="${projects[index].src}" alt="" class="project-img">
                    </div>
                    <div class="project-detail">
                        <h2>${projects[index].title}</h2>
                        <p class="desc">${projects[index].desc}</p>
                        <p class="duration">Duration : ${projects[index].dur}</p>
                    </div>
                    <div class="options">
                        <div class="option">
                            <a href=""> <ion-icon name="create-outline" class="edit-icon"></ion-icon></a>
                            <a href=""> <ion-icon name="trash-outline" class="delete-icon" onclick="deletePost(event, ${projects[index].key})"></ion-icon></a>
                        </div>
                        <a href="project-detail.html">See more <ion-icon name="arrow-forward-outline" class="arrow-icon"></ion-icon></a>
                    </div>
                    <input type="hidden" name="key" value="${projects[index].key}" class="hidden-key">
                </div>`;
    }

    document.querySelector(".project-display").innerHTML = html;
}

function postBlog(event) {
    event.preventDefault();

    let src = ""

    const fileAtt = document.querySelector("#file").files;

    const blogImg = URL.createObjectURL(fileAtt[0]);

    src = blogImg

    const pName = document.querySelector("#pname").value;

    const desc = document.querySelector("#message").value;

    startDate = document.querySelector("#sDate").value;
    endDate = document.querySelector("#eDate").value;

    let date1 = new Date(startDate);
    let date2 = new Date(endDate);

    let duration;

    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);

    let track = Math.abs(date1 - date2);

    let dayInMili = 1000 * 60 * 60 * 24;

    let month;
    let year;

    let trackDate = Math.round(track / dayInMili);
    duration = `${trackDate} day/s`;
    if (trackDate >= 30 && trackDate <= 31 || trackDate >= 31) {
        month = Math.round(trackDate / 30);
        duration = `${month} month/s`;
        if (month >= 12) {
            year = Math.round(month / 12);
            duration = `${year} year/s`;
        }
    }

    keyCount(src, pName, desc, duration);
}

renderBlog(projects);

document.querySelector(".addBtn").addEventListener("click", function () {
    document.querySelector(".addBtn").classList.toggle("addBtn-active");
    document.querySelector(".form-none").classList.toggle("form-blog");
    document.querySelector(".project-display").classList.toggle("project-display-col");
    for (let i = 0; i < projects.length; i++) {
        document.querySelectorAll(".project-container")[i].classList.toggle("project-container-col");
        document.querySelectorAll(".project-img")[i].classList.toggle("project-container-img-col");
        document.querySelectorAll(".project-detail")[i].classList.toggle("project-detail-none");
        document.querySelectorAll(".options")[i].classList.toggle("options-none");
    }
});

document.querySelector(".add-icon-respons").addEventListener("click", function () {
    document.querySelector(".form-none").classList.toggle("form-none-respons");
    document.querySelector(".form-none").classList.toggle("form-blog");
    document.querySelector(".project-display").classList.toggle("project-display-col");
})

function deletePost(event, keyz) {
    event.preventDefault();

    let id = keyz;

    for (let i = projects.length - 1; i >= 0; i--) {
        if (projects[i].key == id) {
            document.querySelectorAll(".project-container")[i].remove();
            event.preventDefault();
            projects.splice(i, 1);
        }
    }

    if (projects.length == 0) {
        document.querySelector("main").classList.add("main-if");
    }
}

renderBlog(projects);

// Footer

const newDate = new Date();

const getYear = newDate.getFullYear();

document.querySelector(".year").innerHTML = '&copy; ' + `${getYear} M GIBRAN`;