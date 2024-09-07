// Main 

for (let i = 0; i < document.querySelectorAll(".add-project-btn").length; i++) {
    document.querySelectorAll(".add-project-btn")[i].addEventListener("click", function () {
        console.log("Hello World!");
        document.querySelector(".post-project-container-none").classList.toggle("post-project-container");
        document.querySelector(".custom-container-project").classList.toggle("custom-container-project-none");
        // console.log(document.querySelector(".custom-container-project"));
        // window.location.href = "/";
    })
}



let reader;
let result;
let key = 2;
let projects = [
    // {
    //     key: '2',
    //     src: 'https://img.freepik.com/free-vector/gradient-interview-portfolio-template_23-2149220443.jpg',
    //     title: 'Gibun-WebDev-MEVN-Stack',
    //     desc: 'This website is created with MEVN techonlogies :D . You can visit the website for the full review! ',
    //     dur: '10 Days'
    // },
    {
        key: '1',
        src: 'https://img.freepik.com/free-vector/flat-design-colored-portfolio-template_23-2149215470.jpg',
        title: 'Gibun-WebDev-MERN-Stack',
        desc: 'This is static data it cannot be remove or edit! :D',
        tech: 'Mongo, React, Node, Express',
        dur: '1 month/s',
        sdate: '2024-08-01',
        edate: '2024-09-01'
    },

];

for (let i = 2; i <= Number(localStorage.length); i++) {
    if (!localStorage.getItem(`key${i}`) == "") {
        projects.unshift(
            {
                key: localStorage.getItem(`key${i}`),
                src: localStorage.getItem(`src${i}`),
                title: localStorage.getItem(`title${i}`),
                desc: localStorage.getItem(`desc${i}`),
                tech: localStorage.getItem(`tech${i}`),
                dur: localStorage.getItem(`duration${i}`),
                sdate: localStorage.getItem(`sdate${i}`),
                edate: localStorage.getItem(`edate${i}`),
            }
        )
        key = Number(localStorage.getItem(`key${i}`)) + 1;
    }
}

function keyCount(src, pName, desc, duration, check, sdate, edate) {

    reader = new FileReader();

    localStorage.setItem(`key${key}`, key);
    reader.addEventListener(
        "load",
        () => {
            // convert image file to base64 string
            localStorage.setItem(`src${key}`, reader.result);
        },
        false,
    );
    if (src) {
        reader.readAsDataURL(src);
    }

    localStorage.setItem(`title${key}`, pName);
    localStorage.setItem(`desc${key}`, desc);
    localStorage.setItem(`tech${key}`, check);
    localStorage.setItem(`duration${key}`, duration);
    localStorage.setItem(`sdate${key}`, sdate);
    localStorage.setItem(`edate${key}`, edate);

    projects.unshift(
        {
            key: localStorage.getItem(`key${key}`),
            src: localStorage.getItem(`src${key}`),
            title: localStorage.getItem(`title${key}`),
            desc: localStorage.getItem(`desc${key}`),
            tech: localStorage.getItem(`tech${key}`),
            dur: localStorage.getItem(`duration${key}`),
            sdate: localStorage.getItem(`sdate${key}`),
            edate: localStorage.getItem(`edate${key}`),
        }
    )
    renderBlog(projects);
    window.location.reload();
}

function renderBlog(projects) {

    let html = "";

    for (let index = 0; index < projects.length; index++) {
        html += `<div class="card bg-transparent shadow-lg card-custom-project">
                <img src="${projects[index].src}" class="card-img-top img-custom-project" alt="..."
                    style="object-fit: cover;">
                <div class="card-body gap-0 d-flex flex-column justify-content-around">
                    <h5 class="card-title text-white">${projects[index].title}</h5>
                    <p class="card-text text-white fs-5">${projects[index].desc}</p>
                    <p class="card-text text-white">Duration : ${projects[index].dur}</p>
                    <div>
                        <a href="" onclick="goTo(event, ${projects[index].key})" class="btn btn-primary w-25">Edit</a>
                        <a href="" onclick="deletePost(event, ${projects[index].key})" class="btn btn-outline-danger mx-2 w-50">Delete</a>
                    </div>
                </div>
            </div>`;
    }

    document.querySelector(".custom-container-project").innerHTML = html;

}

function postBlog(event) {
    event.preventDefault();

    let src = ""

    const fileAtt = document.querySelector("#file").files[0];

    src = fileAtt

    const pName = document.querySelector("#pname").value;

    const desc = document.querySelector("#message").value;

    let startDate = document.querySelector("#sDate").value;
    let endDate = document.querySelector("#eDate").value;

    let checkboxes =
        document.getElementsByName('stack');
    result = "";
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            result = result + "  " + checkboxes[i].value;
        }
    }

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

    keyCount(src, pName, desc, duration, result, startDate, endDate);
}

function deletePost(event, keyz) {
    event.preventDefault();

    // window.location.reload();

    if (localStorage.getItem(`key${keyz}`) != "") {
        localStorage.removeItem(`key${keyz}`);
        localStorage.removeItem(`src${keyz}`);
        localStorage.removeItem(`desc${keyz}`);
        localStorage.removeItem(`duration${keyz}`);
        localStorage.removeItem(`title${keyz}`);
        localStorage.removeItem(`tech${keyz}`);
        localStorage.removeItem(`sdate${keyz}`);
        localStorage.removeItem(`edate${keyz}`);
        window.location.reload();
        console.log(projects);
    }
}

function goTo(event, id) {
    event.preventDefault();

    const ids = id;

    window.location.href = `project-detail.html?id=${ids}`;
}

function goTo2(event, id) {
    event.preventDefault();

    const ids = id;

    window.location.href = `project-detail.html?id=${ids}`;
}

renderBlog(projects);