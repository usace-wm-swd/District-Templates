const burgerBtn = document.getElementById("burgerBtn")
const SEARCH_ELEM = document.querySelector("#headerSearch")
const SEARCH_BTN = document.querySelector("#searchButton")
const SEARCH_CONT = document.querySelector(".search-bar")
// Check system heartbeat - are files updated and making it to the server?
async function checkHeartbeat() {
    await fetch("/data/heartbeat.json").then(res => res.json()).then(d => {
        document.querySelectorAll(".site-notice").forEach(elem => {
            const LAST_UPDATED = new Date(d.updated)
            const NOW = new Date()

            const HOURS_SINCE = Math.floor((NOW - LAST_UPDATED) / 39e5)// 1 Hour 5 Minutes
            // If the last timestamp is > 2 hours files are no longer being pushed to the server
            if (HOURS_SINCE >= 1) {
                // Display a default message if no message was set when the file went out of date
                elem.innerHTML = d?.status ? d.status : "⚠ Data is Behind ⚠"
                elem.title = `FILES NOT UPDATING! Last Update: ${LAST_UPDATED.toString()}`
                elem.style.display = "block"
            } else if (d?.status) {
                // If a status exists at all, display that
                elem.innerHTML = d.status
                elem.title = d?.title ? d.title : `Last File Update: ${LAST_UPDATED.toString()}`
                elem.style.display = "block"
            }
        })
    })
}


// Handle user search
if (SEARCH_BTN) {
    if (window.location.pathname.includes("/search")) {
        if (SEARCH_CONT) {
            SEARCH_CONT.style.display = "none";
        }
    }
    SEARCH_BTN.addEventListener("click", (e) => {
        const input_str = SEARCH_ELEM.value;
        if (input_str.length === 0) {
            let restore_str = SEARCH_ELEM.placeholder
            SEARCH_ELEM.placeholder = "Enter a Value to Search!"
            SEARCH_ELEM.style.border = "1px solid red"
            SEARCH_ELEM.blur();
            setTimeout(() => {
                SEARCH_ELEM.placeholder = restore_str
                SEARCH_ELEM.style.border = "1px solid black"
            }, 5000)
            return
        }
        //window.open(`/search?query=${input_str}`);
        window.location.href = `/search?query=${input_str}`;
    })
}
SEARCH_ELEM.addEventListener("keydown", (e) => {
    if (event.key === "Enter") {
        SEARCH_BTN.click()
    }
});


// Mobile Burger Bar
function openNav() {
    let mobileNav = document.getElementById("mobileNav");
    mobileNav.style.width = "100%";
    mobileNav.style.height = "100%";
    let _child = document.getElementById("mobileNavContent");
    mobileNav.style.right = _child.clientWidth - _child.offsetWidth + "px";
    burgerBtn.style.display = "none";
}

function closeNav() {
    let myNav = document.getElementById("mobileNav");
    myNav.style.width = "0%";
    myNav.style.height = "0%";
    // let open = document.getElementById("burgerBtn");
    // open.style.display = "inline-block";
    burgerBtn.style.display = "unset"
}

// Run everything when the DOM is done loading
window.addEventListener("load", () => {
    checkHeartbeat()

    // Setup the page's collapses
    const COLL_LEGEND = document.getElementsByClassName("collapsible-legend");
    if (COLL_LEGEND)
        for (let i = 0; i < COLL_LEGEND.length; i++) {
            COLL_LEGEND[i].addEventListener("click", function () {
                this.classList.toggle("active");
                let content = this.nextElementSibling;
                let arrow = document.getElementById("arrow");
                if (content.style.display === "block") {
                    content.style.display = "none";
                    arrow.className = "sub-arrow-down";
                } else {
                    content.style.display = "block";
                    arrow.className = "sub-arrow-up";
                }
            });
        }

    // Setup the header subheading based on the current page title
    const HEADER_SUB = document.querySelector('[data-lake="header-sub"]')
    if (HEADER_SUB)
        HEADER_SUB.innerText = document.title
    const COLL_MOB = document.getElementsByClassName("collapsible-mobile");
    if (COLL_MOB)
        for (let col_m_idx = 0; col_m_idx < COLL_MOB.length; col_m_idx++) {
            COLL_MOB[col_m_idx].addEventListener("click", function () {
                if (this.classList.contains("active")) {
                    this.classList.remove("active");
                    this.nextElementSibling.classList.add("content-hide")
                } else {
                    this.classList.add("active")
                    this.nextElementSibling.classList.remove("content-hide")
                }
            });
        }

})

setHeaderText(document.title)
function setHeaderText(text) {
    let headerSub = document.querySelector('[data-lake="header-sub"]')
    if (headerSub) headerSub.innerText = text
}


const to_top = document.querySelector("#toTop")
const nav_down = document.querySelector("#goDownBtn")
if (to_top) {
    to_top.onclick = function () {
        // Return to top of page
        window.scrollTo(0, 0);
        this.style.display = "none";
    };

    document.onscroll = function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            to_top.style.display = "block";
            if (nav_down) nav_down.style.display = "none";
        } else to_top.style.display = "none";
    };

}


// If a header is present offset the scroll by the header height
const header_offset = document.querySelector("#headerFloat") ? -document.querySelector("#headerFloat").clientHeight : 0;
if (nav_down) {
    nav_down.onclick = function () {
        nav_down.style.display = "none";
        if (document.querySelectorAll("#page-container") < 2) {
            // Scroll some arbitrary amount if only one page container
            window.scrollBy(header_offset + 150);
        } else {
            // Get the y of the second page container
            const y = document.querySelectorAll("#page-container")[1]
                .getBoundingClientRect().top
                + window.pageYOffset
                + header_offset;
            // Scoot back up the header height
            window.scrollBy({ top: y, behavior: "smooth" })
        }
    };
}
