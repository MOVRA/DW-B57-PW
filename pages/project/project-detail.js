// Header

document.querySelector(".menu-icon").addEventListener("click", function () {
    document.querySelector(".respons-menu").classList.toggle("respons-menu-on");
});

// Main

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

const projects = [{
    key: '1',
    src: 'https://img.freepik.com/free-vector/flat-design-colored-portfolio-template_23-2149215470.jpg',
    title: 'Gibun-WebDev-MERN-Stack',
    desc: 'This website is created with MERN techonlogies :D . You can visit the website for the full review! ',
    tech: 'React JS Node JS',
    dur: '1 Month',
    sdate: '2024-08-01',
    edate: '2024-09-01'
}];


if (!localStorage.length == 0) {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(`key${postId}`) == postId) {
            projects.unshift({
                key: localStorage.getItem(`key${postId}`),
                src: localStorage.getItem(`src${postId}`),
                title: localStorage.getItem(`title${postId}`),
                desc: localStorage.getItem(`desc${postId}`),
                tech: localStorage.getItem(`tech${postId}`),
                dur: localStorage.getItem(`duration${postId}`),
                sdate: localStorage.getItem(`sdate${postId}`),
                edate: localStorage.getItem(`edate${postId}`),
            })
        }
    }
}

function render() {

    document.querySelector("main").innerHTML = `
      <div class="detail-container">
            <a href="/"><img src="${projects[projects.length - postId].src}" alt="" class="project-img"></a>
            <div class="project-detail">
                <h2>${projects[projects.length - postId].title}</h2>
                <p class="desc">${projects[projects.length - postId].desc}</p>
                <p class="duration">Duration : ${projects[projects.length - postId].dur}</p>
                <p class="tech">Technologies : ${projects[projects.length - postId].tech}</p>
            </div>
        </div>  
        <div class="edit-container-none">
        <form action="" onsubmit="editPost(event)" method="post" enctype="multipart/form-data" class="form-none ">
            <h3>Edit project</h3>
            <label for="pname">Project name</label>
            <input type="text" name="pname" id="pname" value="${projects[projects.length - postId].title}">
            <label for="sDate">Start date</label>
            <input type="date" name="sDate" id="sDate" value="${projects[projects.length - postId].sdate}">
            <label for="eDate">End date</label>
            <input type="date" name="eDate" id="eDate" value="${projects[projects.length - postId].edate}">
            <label for="">Technologies</label>
            <div class="checkBox">
                <input type="checkbox" name="stack" id="tech" value="Node JS">
                <label for="tech">Node JS</label>
                <input type="checkbox" name="stack" id="tech" value="Next JS">
                <label for="tech">Next JS</label>
                <input type="checkbox" name="stack" id="tech" value="React JS">
                <label for="tech">React JS</label>
                <input type="checkbox" name="stack" id="tech" value="Typescript">
                <label for="tech">Typescript</label>
                <input type="checkbox" name="stack" id="tech" value="others">
                <label for="tech">Others</label>
            </div>
            <label for="desc">Description</label>
            <textarea id="message" name="desc" cols="48" rows="10" placeholder="Enter description...">${projects[projects.length - postId].desc}</textarea>
            <button type="submit" class="submitBtn">Post</button>
        </form>
    </div>
`
}

let result;

function editPost(event) {
    event.preventDefault();

    const pName = document.querySelector("#pname").value;

    const desc = document.querySelector("#message").value;

    let startDate = document.querySelector("#sDate").value;
    let endDate = document.querySelector("#eDate").value;

    let date1 = new Date(startDate);
    let date2 = new Date(endDate);

    let checkboxes =
        document.getElementsByName('stack');
    result = "";
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            result = result + "  " + checkboxes[i].value;
        }
    }

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

    localStorage.setItem(`title${postId}`, pName);
    localStorage.setItem(`desc${postId}`, desc);
    localStorage.setItem(`tech${postId}`, result);
    localStorage.setItem(`duration${postId}`, duration);
    localStorage.setItem(`sdate${postId}`, startDate);
    localStorage.setItem(`edate${postId}`, endDate);

    window.location.href = "project.html";
}


function deletePost(event) {
    event.preventDefault();

    window.location.reload();

    let keyz = projects[projects.length - postId].key

    if (!localStorage.getItem(`key${keyz}`) == "") {
        localStorage.removeItem(`key${keyz}`);
        localStorage.removeItem(`src${keyz}`);
        localStorage.removeItem(`desc${keyz}`);
        localStorage.removeItem(`duration${keyz}`);
        localStorage.removeItem(`title${keyz}`);
        localStorage.removeItem(`tech${keyz}`);
        localStorage.removeItem(`sdate${keyz}`);
        localStorage.removeItem(`edate${keyz}`);
    }

    window.location.href = "project.html";
}

// function editPost(event) {
// event.preventDefault();

document.querySelector(".edit-icon").addEventListener("click", function () {
    document.querySelector(".detail-container").classList.toggle("no-display");
    document.querySelector(".edit-container-none").classList.toggle("edit-container")

    document.querySelector("#file").files[0] = projects[projects.length - postId].src;
})
// }

render();