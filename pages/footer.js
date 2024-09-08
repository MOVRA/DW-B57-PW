// Footer | All page

const newDate = new Date();

const getYears = newDate.getFullYear();

// console.log(getYears);

document.querySelector(".year").innerHTML = '&copy; ' + `${getYears} M Gibran`;
