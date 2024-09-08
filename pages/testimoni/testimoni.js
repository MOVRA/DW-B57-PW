function getTestiData(url) {
    return new Promise((resolve, reject) => {
        const ajax = new XMLHttpRequest();

        ajax.open("GET", url);

        ajax.addEventListener("load", () => {
            resolve(JSON.parse(ajax.responseText));
        })

        ajax.addEventListener("error", () => {
            reject(console.error(err));
        })

        ajax.send();
    })
}

async function getTesti() {
    const testimoniData = await getTestiData("https://api.npoint.io/18a92ef2894254320033");

    let domz = "";

    for (let i = 0; i < testimoniData.length; i++) {
        domz += ` <div class="card custom-card">
                <img src="${testimoniData[i].image}" class="card-img-top custom-img" alt="..." style="">
                <div class="card-body d-flex flex-column justify-content-between">
                    <p class="card-text text-white">${testimoniData[i].quote}</p>
                    <p class="card-text text-white">-${testimoniData[i].author}</p>
                    <p class="card-text text-white d-flex align-items-center gap-1"><ion-icon name="star-outline"></ion-icon>${testimoniData[i].rating}</p>
                </div>
            </div>`;
    }
    document.querySelector(".container-cards").innerHTML = domz;
}

for (let i = 0; i < document.querySelectorAll(".btn-rate").length; i++) {
    document.querySelectorAll(".btn-rate")[i].addEventListener("click", () => {
        let p = document.querySelectorAll(".btn-rate")[i].innerText;
        getRating(p, event);
    });
}

async function getRating(p, event) {
    event.preventDefault();

    const testimonials = await getTestiData(
        `https://api.npoint.io/18a92ef2894254320033`
    );

    let domz = "";

    for (let i = 0; i < testimonials.length; i++) {
        if (testimonials[i].rating == p) {
            domz += ` <div class="card custom-card">
                <img src="${testimonials[i].image}" class="card-img-top custom-img" alt="..." style="">
                <div class="card-body d-flex flex-column justify-content-between">
                    <p class="card-text text-white">${testimonials[i].quote}</p>
                    <p class="card-text text-white">-${testimonials[i].author}</p>
                    <p class="card-text text-white d-flex align-items-center gap-1"><ion-icon name="star-outline"></ion-icon>${testimonials[i].rating}</p>
                </div>
            </div>`;
        }
        else if (p == "All") {
            domz += ` <div class="card custom-card">
                <img src="${testimonials[i].image}" class="card-img-top custom-img" alt="..." style="">
                <div class="card-body d-flex flex-column justify-content-between">
                    <p class="card-text text-white">${testimonials[i].quote}</p>
                    <p class="card-text text-white">-${testimonials[i].author}</p>
                    <p class="card-text text-white d-flex align-items-center gap-1"><ion-icon name="star-outline"></ion-icon>${testimonials[i].rating}</p>
                </div>
            </div>`;
        }
    }


    document.querySelector(".container-cards").innerHTML = domz;
}

getTesti();