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
    link.href = `mailto:abgibun@gmail.com?subject=${userSubject}&body=Hi my name is ${userName}. If you are available here is my number ${userPNumber}%20%0D%0A%0D%20%0D%0A%0DMessage: ${userMessage}`;

    link.click();
}

