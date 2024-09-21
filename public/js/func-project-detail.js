// const urlParams = new URLSearchParams(window.location.search);
// const postId = urlParams.get('id');

// const projects = [{
//     key: '1',
//     src: 'https://img.freepik.com/free-vector/flat-design-colored-portfolio-template_23-2149215470.jpg',
//     title: 'Gibun-WebDev-MERN-Stack',
//     desc: 'This is static data it cannot be remove or edit! :D',
//     tech: 'Mongo, React, Node, Express',
//     dur: '1 month/s',
//     sdate: '2024-08-01',
//     edate: '2024-09-01'
// }];


// if (!localStorage.length == 0) {
//     for (let i = 0; i < localStorage.length; i++) {
//         if (localStorage.getItem(`key${postId}`) == postId) {
//             projects.unshift({
//                 key: localStorage.getItem(`key${postId}`),
//                 src: localStorage.getItem(`src${postId}`),
//                 title: localStorage.getItem(`title${postId}`),
//                 desc: localStorage.getItem(`desc${postId}`),
//                 tech: localStorage.getItem(`tech${postId}`),
//                 dur: localStorage.getItem(`duration${postId}`),
//                 sdate: localStorage.getItem(`sdate${postId}`),
//                 edate: localStorage.getItem(`edate${postId}`),
//             })
//         }
//     }
// }

// function render() {

//     document.querySelector("main").innerHTML = `
//       <div class="d-flex btn-ed">
//                         <a href="" class="btn btn-edit btn-primary w-50">Edit</a>
//                         <a href="" onclick="deletePost(event, ${projects[projects.length - postId].key})" class="btn btn-outline-danger mx-2 w-50">Delete</a>
//             </div>
//             <div class="bg-transparent shadow-lg card-custom-project">
//                 <img src="${projects[projects.length - postId].src}" class="card-img-top img-custom-project" alt="..."
//                     style="object-fit: cover;">
//                 <div class="card-body gap-4 d-flex flex-column justify-content-center" style="width:fit-content;">
//                     <h5 class="card-title text-white fs-4 my-2">${projects[projects.length - postId].title}</h5>
//                     <p class="card-text text-white">${projects[projects.length - postId].desc}</p>
//                     <p class="card-text text-white">${projects[projects.length - postId].tech}</p>
//                     <p class="card-text text-white fs-6">Duration : ${projects[projects.length - postId].dur}</p>        
//                 </div>
//             </div> 
//         <form action="" onsubmit="editPost(event)" method="post" enctype="multipart/form-data" class="form-none my-5">
//             <h3 class="fs-3 text-white m-2">Edit project</h3>
//             <label for="pname" class="fs-5 text-white my-4">Project name</label>
//             <input type="text" class="form-control" name="pname" id="pname" value="${projects[projects.length - postId].title}">
//             <label for="sDate" class="fs-5 text-white my-4">Start date</label>
//             <input type="date" class="form-control" name="sDate" id="sDate" value="${projects[projects.length - postId].sdate}">
//             <label for="eDate" class="fs-5 text-white my-4">End date</label>
//             <input type="date" class="form-control" name="eDate" id="eDate" value="${projects[projects.length - postId].edate}">
//             <label for="" class="fs-5 text-white my-4">Technologies</label>
//             <div class="checkBox">
//                 <input type="checkbox" name="stack" id="tech" value="Node JS">
//                 <label for="tech" class="text-white mx-3">Node JS</label>
//                 <input type="checkbox" name="stack" id="tech" value="Next JS">
//                 <label for="tech" class="text-white mx-3">Next JS</label>
//                 <input type="checkbox" name="stack" id="tech" value="React JS">
//                 <label for="tech" class="text-white mx-4">React JS</label>
//                 <input type="checkbox" name="stack" id="tech" value="Typescript">
//                 <label for="tech" class="text-white mx-3">Typescript</label>
//                 <input type="checkbox" name="stack" id="tech" value="others">
//                 <label for="tech" class="text-white mx-3">Others</label>
//             </div>
//             <label for="desc" class="fs-5 text-white my-4">Description</label>
//             <textarea id="message" class="form-control" name="desc" cols="48" rows="10" placeholder="Enter description...">${projects[projects.length - postId].desc}</textarea>
//             <button type="submit" class="btn btn-outline-primary my-4  submitBtn">Post</button>
//         </form>
// `
// }

// let result;

// function editPost(event) {
//     event.preventDefault();

//     const pName = document.querySelector("#pname").value;

//     const desc = document.querySelector("#message").value;

//     let startDate = document.querySelector("#sDate").value;
//     let endDate = document.querySelector("#eDate").value;

//     let date1 = new Date(startDate);
//     let date2 = new Date(endDate);

//     let checkboxes =
//         document.getElementsByName('stack');
//     result = "";
//     for (let i = 0; i < checkboxes.length; i++) {
//         if (checkboxes[i].checked) {
//             result = result + "  " + checkboxes[i].value;
//         }
//     }

//     let duration;

//     date1.setHours(0, 0, 0, 0);
//     date2.setHours(0, 0, 0, 0);

//     let track = Math.abs(date1 - date2);

//     let dayInMili = 1000 * 60 * 60 * 24;

//     let month;
//     let year;

//     let trackDate = Math.round(track / dayInMili);
//     duration = `${trackDate} day/s`;
//     if (trackDate >= 30 && trackDate <= 31 || trackDate >= 31) {
//         month = Math.round(trackDate / 30);
//         duration = `${month} month/s`;
//         if (month >= 12) {
//             year = Math.round(month / 12);
//             duration = `${year} year/s`;
//         }
//     }

//     localStorage.setItem(`title${postId}`, pName);
//     localStorage.setItem(`desc${postId}`, desc);
//     localStorage.setItem(`tech${postId}`, result);
//     localStorage.setItem(`duration${postId}`, duration);
//     localStorage.setItem(`sdate${postId}`, startDate);
//     localStorage.setItem(`edate${postId}`, endDate);

//     window.location.href = "/#project";
// }


// function deletePost(event) {
//     event.preventDefault();

//     let keyz = projects[projects.length - postId].key

//     if (!localStorage.getItem(`key${keyz}`) == "") {
//         localStorage.removeItem(`key${keyz}`);
//         localStorage.removeItem(`src${keyz}`);
//         localStorage.removeItem(`desc${keyz}`);
//         localStorage.removeItem(`duration${keyz}`);
//         localStorage.removeItem(`title${keyz}`);
//         localStorage.removeItem(`tech${keyz}`);
//         localStorage.removeItem(`sdate${keyz}`);
//         localStorage.removeItem(`edate${keyz}`);
//     }

//     window.location.href = "/#project";
// }

// document.querySelector(".btn-edit").addEventListener("click", (event) => {
//     event.preventDefault();
//     document.querySelector(".card-custom-project").classList.toggle("card-none");
//     document.querySelector(".form-none").classList.toggle("form-block");
// });

document.querySelector(".more-btn").addEventListener("click", () => {
    document.querySelector(".more-menu-none").classList.toggle("more-menu");
})

document.querySelector(".l-1").addEventListener("click", function () {
    document.querySelector(".form-none").classList.toggle("form-block");
    document.querySelector(".detail-block").classList.toggle("detail-block-none");
})

document.querySelector(".backBtn").addEventListener("click", function () {
    document.querySelector(".form-none").classList.toggle("form-block");
    document.querySelector(".detail-block").classList.toggle("detail-block-none");
})
