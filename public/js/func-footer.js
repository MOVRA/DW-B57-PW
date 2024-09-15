const newDate = new Date();

const getYears = newDate.getFullYear();

document.querySelector(".year").innerHTML = '&copy; ' + `${getYears} M Gibran`;
