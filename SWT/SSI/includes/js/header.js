
// Setup the header subheading based on the current page title
document.querySelector('[data-lake="header-sub"]').innerText = document.title
// Handle the mobile collapse menus
let coll_mob = document.getElementsByClassName("collapsible-mobile");
for (let col_m_idx = 0; col_m_idx < coll_mob.length; col_m_idx++) {
    coll_mob[col_m_idx].addEventListener("click", function () {
        if (this.classList.contains("active")) {
            this.classList.remove("active");
            this.nextElementSibling.classList.add("content-hide")
        } else {
            this.classList.add("active")
            this.nextElementSibling.classList.remove("content-hide")
        }
    });
}

// Mobile Burger Bar
function openNav() {
    let mobileNav = document.getElementById("mobileNav");
    mobileNav.style.width = "100%";
    mobileNav.style.height = "100%";
    let _child = document.getElementById("mobileNavContent");
    mobileNav.style.right = _child.clientWidth - _child.offsetWidth + "px";
    document.getElementById("burgerBtn").style.display = "none";
}

function closeNav() {
    let myNav = document.getElementById("mobileNav");
    myNav.style.width = "0%";
    myNav.style.height = "0%";
}